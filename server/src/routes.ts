import { Request, Response, Router } from "express";
import { Thing, SerialisedEvent } from "./types/types";
import {
  createThing,
  getThings,
  updateThing,
  deleteThing,
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventCountByThingUuid,
  deleteEventsByThingUuid,
} from "./database";
import { GoogleGenAI } from "@google/genai";
import { add, format } from "date-fns";

type DbThing = Omit<Thing, "visible"> & {
  visible: number;
};

const router = Router();

export const routes = () => {
  // CREATE THING
  router.post("/thing", (req: Request<{}, {}, Thing, {}>, res: any) => {
    const { uuid, name, colour, visible } = req.body;
    createThing.run(uuid, name, colour, visible ? 1 : 0);
    res.status(200).send("");
  });

  // GET THINGS
  router.get("/things", (req: Request, res: Response<Thing[]>) => {
    const thingsRaw = getThings.all() as DbThing[];

    const thingsHydrated = thingsRaw.map((thing) => ({
      ...thing,
      visible: thing.visible === 1,
    }));
    res.json(thingsHydrated);
  });

  // UPDATE THING
  router.put(
    "/thing/:uuid",
    (req: Request<{ uuid: string }, {}, Thing, {}>, res: any) => {
      const { uuid } = req.params;
      const { name, colour, visible } = req.body;

      const result = updateThing.run(name, colour, visible ? 1 : 0, uuid);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Thing not found" });
      }

      res.status(200).send("");
    },
  );

  // DELETE THING
  router.delete(
    "/thing/:uuid",
    (req: Request<{ uuid: string }, {}, {}, {}>, res: any) => {
      const { uuid } = req.params;

      // Check if thing has associated events
      const eventCount = getEventCountByThingUuid.get(uuid) as {
        count: number;
      };

      if (eventCount.count > 0) {
        // Delete associated events first
        deleteEventsByThingUuid.run(uuid);
      }

      // Now delete the thing
      const result = deleteThing.run(uuid);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Thing not found" });
      }

      res.status(204).send();
    },
  );

  // CREATE EVENT
  router.post(
    "/event",
    (req: Request<{}, {}, SerialisedEvent, {}>, res: any) => {
      const { uuid, name, date, thingUuid } = req.body;
      createEvent.run(uuid, name, date, thingUuid);
      res.status(200).send("");
    },
  );

  // GET EVENTS
  router.get("/events", (req: Request, res: Response<SerialisedEvent[]>) => {
    const events = getEvents.all() as SerialisedEvent[];
    res.json(events);
  });

  // UPDATE EVENT
  router.put(
    "/event/:uuid",
    (req: Request<{ uuid: string }, {}, SerialisedEvent, {}>, res: any) => {
      const { uuid } = req.params;
      const { name, date, thingUuid } = req.body;

      const result = updateEvent.run(name, date, thingUuid, uuid);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.status(200).send("");
    },
  );

  // DELETE EVENT
  router.delete(
    "/event/:uuid",
    (req: Request<{ uuid: string }, {}, {}, {}>, res: any) => {
      const { uuid } = req.params;

      const result = deleteEvent.run(uuid);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.status(204).send();
    },
  );

  // SUGGEST
  router.get(
    "/suggest",
    async (req: Request<{}, {}, {}, { what: string }>, res: any) => {
      try {
        const { what } = req.query;

        if (!what) {
          return res.status(400).json({ error: "What is required" });
        }

        const apiKey = process.env.GOOGLE_GEN_AI_API_KEY;

        if (!apiKey) {
          return res.status(500).json({ error: "API key is not configured" });
        }

        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          config: {
            systemInstruction: `You are an API endpoint for a client interface which is used for making new calendar events, sourced from the internet. A user will say a thing, and your job is to find when that thing is, and return the date. If the thing is ambiguous, return multiple suggestions, each with a title and date. The date should be in YYYY-MM-DD format. Return only the json, nothing else. Don't return any events before ${format(add(new Date(), { days: 1 }), "yyyy-MM-dd")}. The response structure should be: "{ suggestions: [{ title: string, date: string }] }". If there are no suggestions, return an empty array.`,
          },
          contents: what,
        });

        if (!response.text) {
          return res.json({
            error: "LLM response empty",
          });
        }

        console.log("LLM Response: ", response.text);

        try {
          const strippedText = response.text
            .replace("```json", "")
            .replace("```", "");
          const suggestionsData = JSON.parse(strippedText);
          return res.json({
            ...suggestionsData,
          });
        } catch (e) {
          console.error(e);
          return res.json({
            error: "LLM response text was not valid JSON",
          });
        }
      } catch (error) {
        console.error("Error calling LLM API:", error);
        return res.status(500).json({ error: "Failed to process request" });
      }
    },
  );

  return router;
};
