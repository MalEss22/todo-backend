import request from 'supertest';

import app from '../server';
jest.useFakeTimers();

describe("POST /auth/signup", () => {
  describe("given a username and password", () => {

    test("should respond with a 201 status code", async () => {
      const response = await request(app).post("/auth/signup").send({
        username: "username",
        password: "password"
      })
      expect(response.statusCode).toBe(201)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/auth/signup").send({
        username: "username",
        password: "password"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has token", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.body.token).toBeDefined()
    })
  })

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {username: "username"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/auth/signup").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})