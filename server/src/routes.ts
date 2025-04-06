import { Request, Response, Router } from "express";
import { Thing, SerialisedEvent } from "./types/types";
import { createEvent, createThing, getEvents, getThings } from "./database";

type DbThing = Omit<Thing, "visible"> & {
  visible: number;
};

const router = Router();

export const routes = () => {
  router.post("/thing", (req: Request<{}, {}, Thing, {}>, res: any) => {
    const { uuid, name, colour, visible } = req.body;
    createThing.run(uuid, name, colour, visible ? 1 : 0);
    res.status(200).send("");
  });

  router.get("/things", (req: Request, res: Response<Thing[]>) => {
    const thingsRaw = getThings.all() as DbThing[];

    const thingsHydrated = thingsRaw.map((thing) => ({
      ...thing,
      visible: thing.visible === 1,
    }));
    res.json(thingsHydrated);
  });

  router.post(
    "/event",
    (req: Request<{}, {}, SerialisedEvent, {}>, res: any) => {
      const { uuid, name, date, thingUuid } = req.body;
      createEvent.run(uuid, name, date, thingUuid);
      res.status(200).send("");
    },
  );

  router.get("/events", (req: Request, res: Response<SerialisedEvent[]>) => {
    const events = getEvents.all() as SerialisedEvent[];
    res.json(events);
  });

  return router;
};
