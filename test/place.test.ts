import request from "supertest";
import app from "../src/app";
import { Express } from "express-serve-static-core";

let server: Express;

beforeAll(async () => {
  server = app;
});

describe("GET /", () => {
  it("responds with a json message", (done) => {
    request(server)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toMatchObject({
          message: "Cek NIK ente bang",
        });

        done();
      });
  });
});
