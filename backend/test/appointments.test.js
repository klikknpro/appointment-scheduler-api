const app = require("../app");
const mockServer = require("supertest");
// const { MongoMemoryServer } = require("mongodb-memory-server");
// const mongoose = require("mongoose");
const Appointment = require("../model/appointment");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

describe("POST request to /api/appointments", () => {
  let connection;
  let mongoServer;
  let client;

  beforeAll(async () => {
    const result = await startDb();
    [connection, mongoServer] = result;
    client = mockServer.agent(app);
  });

  afterAll(async () => {
    await stopDb(connection, mongoServer);
  });

  afterEach(async () => {
    await deleteAll(Appointment);
  });

  describe("a proper request arrives with start time and comment", () => {
    test("should return 200, and the new item with _id property", async () => {
      // given

      // when
      const response = await client.post("/api/appointments").send({
        start: "2022-08-05T15:05",
        comment: "I might be late",
      });

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("_id");
    });

    // describe("new appointment collides with an existing one", () => {});
  });

  describe("improper request", () => {
    describe("start time is in the past", () => {
      test("should return 400, and a meaningful message", async () => {
        // given

        // when
        const response = await client.post("/api/appointments").send({
          start: "2022-05-28T10:05",
          comment: "I might be late",
        });

        // then
        expect(response.status).toBe(400);
        expect(response.text).toBe("Start time is already past");
      });
    });

    describe("start time is missing from request", () => {
      test("should return 400, and a meaningful message", async () => {
        // given

        // when
        const response = await client.post("/api/appointments").send({
          start: "",
          comment: "I might be late",
        });

        // then
        expect(response.status).toBe(400);
        expect(response.text).toBe("Start time is missing or invalid");
      });
    });
  });
});
