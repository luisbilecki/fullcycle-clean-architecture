import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "Luis",
        address: {
          street: "Street name",
          city: "city",
          number: 123,
          zip: "12345",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Luis");
    expect(response.body.address.street).toBe("Street name");
    expect(response.body.address.city).toBe("city");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("12345");
  });
});
