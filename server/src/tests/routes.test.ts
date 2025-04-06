import request from "supertest";
import express from "express";
import { routes } from "../routes";
import { expect, jest, describe, it } from "@jest/globals";
import { createEvent, createThing, getEvents, getThings } from "../database";
import { Thing, SerialisedEvent } from "../types/types";

const app = express();
app.use(express.json());
app.use(routes());

jest.mock("../database", () => ({
  createThing: { run: jest.fn() },
  getThings: { all: jest.fn(() => []) },
  createEvent: { run: jest.fn() },
  getEvents: { all: jest.fn(() => []) },
}));

describe("routes", () => {
  describe("POST /thing", () => {
    it("should create a thing and return status 200", async () => {
      const thing: Thing = {
        uuid: "1",
        name: "TestThing",
        colour: "blue_400",
        visible: true,
      };
      const response = await request(app).post("/thing").send(thing);

      expect(response.status).toBe(200);
      expect(createThing.run).toHaveBeenCalledWith(
        "1",
        "TestThing",
        "blue_400",
        1,
      );
    });
  });

  describe("GET /things", () => {
    it("should return things list with hydrated visibility", async () => {
      const dbThings = [
        { uuid: "1", name: "Thing1", colour: "red", visible: 1 },
        { uuid: "2", name: "Thing2", colour: "green", visible: 0 },
      ];
      (
        getThings as unknown as jest.MockedFunction<any>
      ).all.mockReturnValueOnce(dbThings);

      const response = await request(app).get("/things");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { uuid: "1", name: "Thing1", colour: "red", visible: true },
        { uuid: "2", name: "Thing2", colour: "green", visible: false },
      ]);
    });
  });

  describe("POST /event", () => {
    it("should create an event and return status 200", async () => {
      const event: SerialisedEvent = {
        uuid: "1",
        name: "TestEvent",
        date: "2025-01-01",
        thingUuid: "2",
      };
      const response = await request(app).post("/event").send(event);

      expect(response.status).toBe(200);
      expect(createEvent.run).toHaveBeenCalledWith(
        "1",
        "TestEvent",
        "2025-01-01",
        "2",
      );
    });
  });

  describe("GET /events", () => {
    it("should return events list", async () => {
      const dbEvents = [
        { uuid: "1", name: "Event1", date: "2025-01-01", thingUuid: "2" },
        { uuid: "2", name: "Event2", date: "2025-01-02", thingUuid: "3" },
      ];
      (
        getEvents as unknown as jest.MockedFunction<any>
      ).all.mockReturnValueOnce(dbEvents);

      const response = await request(app).get("/events");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(dbEvents);
    });
  });
});
