import request, { Response } from "supertest";
import express from "express";
import { router } from "./vegetables.router";
import {
  createVegetable,
  getAll,
  getByVegetableName,
  removeVegetable,
  updateVegetable,
} from "./vegetables.service";
import { Vegetables } from "./vegetables.model";

// Criando um mock para o serviço de banco de dados
jest.mock("./vegetables.service");

// Inicializando o aplicativo express para testar as rotas
const app = express();
app.use(express.json());
app.use("/vegetables", router);

describe("Vegetables CRUD Test", () => {
  const mockVegetables: Vegetables = {
    _id: "64c57835ee30d3308d846996",
    name: "Potato",
    color: "red",
    price: 10
  };

  beforeEach(() => {
    // Limpar os mocks antes de cada teste
    (getAll as jest.Mock).mockClear();
    (getByVegetableName as jest.Mock).mockClear();
    (createVegetable as jest.Mock).mockClear();
    (updateVegetable as jest.Mock).mockClear();
    (removeVegetable as jest.Mock).mockClear();
  });

  // Teste para a rota GET /vegetables
  it("should get all vegetables", async () => {
    (getAll as jest.Mock).mockResolvedValueOnce([mockVegetables]);

    const response = await request(app).get("/vegetables");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockVegetables]);
  });

  // Teste para a rota GET /vegetables/:id
  it("should get all vegetables", async () => {
    (getAll as jest.Mock).mockResolvedValueOnce([mockVegetables]);

    const response: Response = await request(app).get("/vegetables");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockVegetables]);
  });

  // Teste para a rota POST /vegetables
  it("should create a new vegetable", async () => {
    const newVegetable: Vegetables = {
        name: "Potato",
        color: "red",
        price: 10
    };

    (createVegetable as jest.Mock).mockResolvedValueOnce({
      insertedId: "mock-inserted-id",
    });

    const response = await request(app).post("/vegetables").send(newVegetable);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ insertedId: "mock-inserted-id" });
  });

  // Teste para a rota PUT /vegetables/:id
  it("should update an existing vegetable", async () => {
    const updatedVegetable: Vegetables = {
        name: "Potato",
        color: "red",
        price: 10
    };

    (updateVegetable as jest.Mock).mockResolvedValueOnce({
      matchedCount: 1,
    });

    const response = await request(app).put(`/vegetables/${mockVegetables._id}`).send(updatedVegetable);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ matchedCount: 1 });
  });

  // Teste para a rota DELETE /vegetables/:id
  it("should delete an vegetable", async () => {
    (removeVegetable as jest.Mock).mockResolvedValueOnce({
      deletedCount: 1,
    });

    const response = await request(app).delete(`/vegetables/${mockVegetables._id}`);

    expect(response.status).toBe(204);
  });
});
