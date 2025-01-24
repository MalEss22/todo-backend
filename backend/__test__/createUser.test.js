import request from 'supertest';
import {faker} from '@faker-js/faker'
import app from '../server';
import deleteTestUser from '../src/utils/deleteTestUser.js';

describe("POST /auth/signup", () => {
    const testUser = {
        username: faker.internet.username(),
        password: faker.internet.password(8),//8 character password
    };
  describe("given a username and password", () => {

    test("should respond with a 201 status code and should respond with a token that specifies json in the content type header", async () => {
      const response = await request(app).post("/auth/signup").send(testUser);
      expect(response.statusCode).toBe(201);
      expect(response.body.token).toBeDefined();
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));

    })
   
    test("response has token", async () => {
      const response = await request(app).post("/auth/login").send(testUser)
      expect(response.body.token).toBeDefined()
    });
  });

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 401", async () => {
      const bodyData = [
        {username: testUser.username},
        {password: testUser.password},
        {},
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/auth/signup").send(body);
        expect(response.statusCode).toBe(401);
      }
    });
  });
//Delete the test user from db
afterAll(async () => {
    await deleteTestUser(testUser.username);
});
})