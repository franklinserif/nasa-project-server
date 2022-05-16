/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');

describe('Test GET / launches', () => {
  test('It should response with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Test POST / launches', () => {
  test('It should response with 201 created', async () => {
    const response = await (
      await request(app).post('/launches')
    )
      .send({
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2028',
      })
      .expect('Content-Type', /json/)
      .expect(201);
  });

  test('It should catch missing required properties', () => {});

  test('It should catch invalid dates', () => {});
});
