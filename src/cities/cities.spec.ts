import request from "supertest";
import mongoose from "mongoose";
import app from "../index";

const testDbUrl = "mongodb://localhost:27017/test_cities"; // Replace with your test database URL

beforeAll(async () => {
  try {
    await mongoose.connect(testDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } as any);
  } catch (error) {
    console.error("Error connecting to test database:", error);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});



describe("POST /cities", () => {
  it("should create a new city", async () => {
    const response = await request(app)
      .post("/cities")
      .send({ name: "New City", mapUrl: "map-url", airport: "airport-code", population: 100000 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "New City");
  });
});

describe("PUT /cities/:id", () => {
  it("should update an existing city", async () => {
    const createResponse = await request(app).post("/cities").send({
      name: "CityToUpdate",
      mapUrl: "map-url",
      airport: "airport-code",
      population: 50000,
    });

    const cityIdToUpdate = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/cities/${cityIdToUpdate}`)
      .send({ name: "Updated City" });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty("name", "Updated City");
  });
});

describe("GET /cities", () => {
  it("should get all cities", async () => {
    const response = await request(app).get("/cities");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET /cities/:id", () => {
  it("should get a city by ID", async () => {
    const createResponse = await request(app)
      .post("/cities")
      .send({ name: "CityToFetch", mapUrl: "map-url", airport: "airport-code", population: 25000 });

    const cityIdToFetch = createResponse.body.id;

    const fetchResponse = await request(app).get(`/cities/${cityIdToFetch}`);

    expect(fetchResponse.status).toBe(200);
    expect(fetchResponse.body).toHaveProperty("name", "CityToFetch");
  });
});

describe("DELETE /cities/:id", () => {
  it("should delete a city", async () => {
    const createResponse = await request(app).post("/cities").send({
      name: "CityToDelete",
      mapUrl: "map-url",
      airport: "airport-code",
      population: 10000,
    });

    const cityIdToDelete = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/cities/${cityIdToDelete}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty("message", "city deleted");
  });
});
