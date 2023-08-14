import request from "supertest";
import express from "express";
import { router } from "./cities.router";
import { create, getAll, update, getById, deleteById } from "./cities.service";

jest.mock("./cities.service");

const app = express();
app.use(express.json());
app.use("/cities", router);

describe("Cities CRUD Test", () => {
  const mockCity = {
    id: "mock-id",
    name: "Mock City",
    mapUrl: "mock-map-url",
    airport: "mock-airport",
    population: 100000,
  };

  beforeEach(() => {
    (getAll as jest.Mock).mockClear();
    (create as jest.Mock).mockClear();
    (update as jest.Mock).mockClear();
    (getById as jest.Mock).mockClear();
    (deleteById as jest.Mock).mockClear();
  });

  it("should create a new city", async () => {
    (create as jest.Mock).mockResolvedValueOnce({ ...mockCity, id: "mock-id" });

    const response = await request(app).post("/cities").send({ name: "Mock City" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ...mockCity, id: "mock-id" });
  });
});
