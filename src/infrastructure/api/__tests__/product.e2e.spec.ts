import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    await assertProductCreated({
      name: "Car",
      price: 10000,
    });
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: null,
      price: -10,
    });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const products = [
      {
        name: "Product A",
        price: 10,
      },
      {
        name: "Product B",
        price: 15,
      },
    ];
    products.forEach(assertProductCreated);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const firstProduct = listResponse.body.products[0];
    const secondProduct = listResponse.body.products[1];
    expect(firstProduct.name).toBe(products[0].name);
    expect(firstProduct.price).toBe(products[0].price);
    expect(secondProduct.name).toBe(products[1].name);
    expect(secondProduct.price).toBe(products[1].price);
  });
});

const assertProductCreated = async (data: any) => {
  const response = await request(app).post("/product").send(data);

  expect(response.status).toBe(200);
  expect(response.body.id).toBeDefined();
  expect(response.body.name).toBe(data.name);
  expect(response.body.price).toBe(data.price);
};
