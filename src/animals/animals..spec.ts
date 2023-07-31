import request, { Response } from 'supertest';
import express from 'express';
import { router } from './animals.router';
import { create, getAll, getById, update, remove } from './animals.service';
import { Animals } from './animals.model';

// Criando um mock para o serviço de banco de dados
jest.mock('./animals.service');

// Inicializando o aplicativo express para testar as rotas
const app = express();
app.use(express.json());
app.use('/animals', router);

describe('Animals CRUD Test', () => {
  const mockAnimal: Animals = {
    _id: '64c57835ee30d3308d846996',
    name: 'Lion',
    specie: 'Mammals',
    height: 120,
    weight: 250,
  };

  beforeEach(() => {
    // Limpar os mocks antes de cada teste
    (getAll as jest.Mock).mockClear();
    (getById as jest.Mock).mockClear();
    (create as jest.Mock).mockClear();
    (update as jest.Mock).mockClear();
    (remove as jest.Mock).mockClear();
  });

  // Teste para a rota GET /animals
  it('should get all animals', async () => {
    (getAll as jest.Mock).mockResolvedValueOnce([mockAnimal]);

    const response = await request(app).get('/animals');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockAnimal]);
  });

  // Teste para a rota GET /animals/:id
  it('should get all animals', async () => {
    (getAll as jest.Mock).mockResolvedValueOnce([mockAnimal]);

    const response: Response  = await request(app).get('/animals'); 

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockAnimal]);
  });

  // Teste para a rota POST /animals
  it('should create a new animal', async () => {
    const newAnimal: Animals = {
      name: 'Elephant',
      specie: 'Mammals',
      height: 400,
      weight: 6000,
    };

    (create as jest.Mock).mockResolvedValueOnce({
      insertedId: 'mock-inserted-id',
    });

    const response = await request(app)
      .post('/animals')
      .send(newAnimal);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ insertedId: 'mock-inserted-id' });
  });

  // Teste para a rota PUT /animals/:id
  it('should update an existing animal', async () => {
    const updatedAnimal: Animals = {
      name: 'Tiger',
      specie: 'Mammals',
      height: 100,
      weight: 200,
    };

    (update as jest.Mock).mockResolvedValueOnce({
      matchedCount: 1,
    });

    const response = await request(app)
      .put(`/animals/${mockAnimal._id}`)
      .send(updatedAnimal);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ matchedCount: 1 });
  });

  // Teste para a rota DELETE /animals/:id
  it('should delete an animal', async () => {
    (remove as jest.Mock).mockResolvedValueOnce({
      deletedCount: 1,
    });

    const response = await request(app).delete(
      `/animals/${mockAnimal._id}`,
    );

    expect(response.status).toBe(204);
  });
});
