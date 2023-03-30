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
    assertCustomerCreated({
      name: "Luis",
      address: {
        street: "Street name",
        city: "city",
        number: 123,
        zip: "12345",
      },
    });
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "Luis",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customer", async () => {
    const customers = [
      {
        name: "Luis",
        address: {
          street: "Street name",
          city: "city",
          number: 123,
          zip: "12345",
        },
      },
      {
        name: "Jane",
        address: {
          street: "Street name",
          city: "City 2",
          number: 456,
          zip: "12345",
        },
      },
    ];
    customers.forEach((customer) => assertCustomerCreated(customer));

    const listResponse = await request(app).get("/customer").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    const firstCustomer = listResponse.body.customers[0];
    const secondCustomer = listResponse.body.customers[1];
    expect(firstCustomer.name).toBe(customers[0].name);
    expect(firstCustomer.address.street).toBe(customers[0].address.street);
    expect(secondCustomer.name).toBe(customers[1].name);
    expect(secondCustomer.address.street).toBe(customers[1].address.street);
  });
});

const assertCustomerCreated = async (data: any) => {
  const response = await request(app).post("/customer").send(data);

  expect(response.status).toBe(200);
  expect(response.body.name).toBe(data.name);
  expect(response.body.address.street).toBe(data.address.street);
  expect(response.body.address.city).toBe(data.address.city);
  expect(response.body.address.number).toBe(data.address.number);
  expect(response.body.address.zip).toBe(data.address.zip);
};
