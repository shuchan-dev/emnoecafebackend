import supertest from "supertest";
import { ProductTest, UserTest } from "./test.utils";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/products", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await ProductTest.delateAll();
    await UserTest.delate();
  });

  it("should create new Product", async () => {
    const response = await supertest(web)
      .post("/api/products")
      .set("X-API-TOKEN", "test")
      .send({
        product_name: "Sate",
        product_desc: "Enak Tau",
        product_category: "Makanan",
        product_price: "15000",
        product_quantity: "90",
      });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.product_name).toBe("Sate");
    expect(response.body.data.username_seller).toBe("test");
  });

  it("should must be reject the product", async () => {
    const response = await supertest(web)
      .post("/api/products")
      .set("X-API-TOKEN", "test")
      .send({
        product_name: "S",
        product_desc: "Enak Tau",
        product_category: "Makanan",
        product_price: "",
        product_quantity: "",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it("should login first before creating a product", async () => {
    const response = await supertest(web)
      .post("/api/products")
      .set("X-API-TOKEN", "salah")
      .send({
        product_name: "Sate",
        product_desc: "Enak Tau",
        product_category: "Makanan",
        product_price: "15000",
        product_quantity: "90",
      });

    logger.debug(response.body);

    expect(response.status).toBe(401);
  });
});

describe("GET /api/products/:productId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ProductTest.create();
  });
  afterEach(async () => {
    await ProductTest.delateAll();
    await UserTest.delate();
  });
  it("should be able getProduct", async () => {
    const product = await ProductTest.get();
    const response = await supertest(web)
      .get(`/api/products/${product.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.username_seller).toBe("test");
  });
  it("should reject unatoroze", async () => {
    const product = await ProductTest.get();
    const response = await supertest(web)
      .get(`/api/products/${product.id}`)
      .set("X-API-TOKEN", "salah");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should be able getProduct reject", async () => {
    const product = await ProductTest.get();
    const response = await supertest(web)
      .get(`/api/products/${product.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET ALL DATA /api/products", () => {
  it("should be able get All Data", async () => {
    const response = await supertest(web).get("/api/products");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });
  it("should reject No Data", async () => {
    const response = await supertest(web).get(`/api/products`);

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
