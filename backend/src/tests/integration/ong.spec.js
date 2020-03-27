const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('shoul be able to create a new ONG', async () => {
    const response = await request(app).post('/ongs').send({
        name: "TESTE ONG",
        email: "contato@teste.com",
        whatsapp: "38999996666",
        city: "Monte Hey",
        uf: "LA"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});