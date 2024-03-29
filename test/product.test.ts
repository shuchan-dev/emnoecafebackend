import supertest from "supertest";
import { ProductTest, UserTest } from "./test.utils";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

// describe("POST /api/products/user/create", () => {
//   beforeEach(async () => {
//     await UserTest.create();
//   });
//   afterEach(async () => {
//     await ProductTest.delateAll();
//     await UserTest.delate();
//   });

//   it("should create new Product", async () => {
//     const response = await supertest(web)
//       .post("/api/products/user/create")
//       .set("X-API-TOKEN", "test")
//       .send({
//         product_name: "Sate",
//         product_desc: "Enak Tau",
//         product_category: "Makanan",
//         product_price: "15000",
//         product_quantity: "90",
//       });

//     logger.debug(response.body);

//     expect(response.status).toBe(200);
//     expect(response.body.data.id).toBeDefined();
//     expect(response.body.data.product_name).toBe("Sate");
//     expect(response.body.data.username_seller).toBe("test");
//   });

//   it("should must be reject the product", async () => {
//     const response = await supertest(web)
//       .post("/api/products/user/create")
//       .set("X-API-TOKEN", "test")
//       .send({
//         product_name: "S",
//         product_desc: "Enak Tau",
//         product_category: "Makanan",
//         product_price: "",
//         product_quantity: "",
//       });

//     logger.debug(response.body);

//     expect(response.status).toBe(400);
//     expect(response.body.errors).toBeDefined();
//   });
//   it("should login first before creating a product", async () => {
//     const response = await supertest(web)
//       .post("/api/products/user/create")
//       .set("X-API-TOKEN", "salah")
//       .send({
//         product_name: "Sate",
//         product_desc: "Enak Tau",
//         product_category: "Makanan",
//         product_price: "15000",
//         product_quantity: "90",
//       });

//     logger.debug(response.body);

//     expect(response.status).toBe(401);
//   });
// });

// describe("GET /api/products/user/:productId", () => {
//   beforeEach(async () => {
//     await UserTest.create();
//     await ProductTest.create();
//   });
//   afterEach(async () => {
//     await ProductTest.delateAll();
//     await UserTest.delate();
//   });
//   it("should be able getProduct", async () => {
//     const product = await ProductTest.get();
//     const response = await supertest(web)
//       .get(`/api/products/user/${product.id}`)
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.id).toBeDefined();
//     expect(response.body.data.username_seller).toBe("test");
//   });
//   it("should reject unatoroze", async () => {
//     const product = await ProductTest.get();
//     const response = await supertest(web)
//       .get(`/api/products/user/${product.id}`)
//       .set("X-API-TOKEN", "salah");

//     logger.debug(response.body);
//     expect(response.status).toBe(401);
//     expect(response.body.errors).toBeDefined();
//   });

//   it("should be able getProduct reject", async () => {
//     const product = await ProductTest.get();
//     const response = await supertest(web)
//       .get(`/api/products/user/${product.id + 1}`)
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(404);
//     expect(response.body.errors).toBeDefined();
//   });
// });

// describe("GET ALL DATA /api/products", () => {
//   it("should be able get All Data", async () => {
//     const response = await supertest(web).get("/api/products");

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data).toBeDefined();
//   });
// });

// describe("GET BY USER /api/products/user", () => {
//   beforeEach(async () => {
//     await UserTest.create();
//     await ProductTest.create();
//   });
//   afterEach(async () => {
//     await ProductTest.delateAll();
//     await UserTest.delate();
//   });
//   it("should be able get All Data", async () => {
//     const response = await supertest(web)
//       .get("/api/products/user")
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//   });
// });

// describe("GET /api/products/:id", () => {
//   beforeEach(async () => {
//     await UserTest.create();
//     await ProductTest.create();
//   });
//   afterEach(async () => {
//     await ProductTest.delateAll();
//     await UserTest.delate();
//   });
//   it("should be able getProduct", async () => {
//     const product = await ProductTest.get();
//     const response = await supertest(web).get(`/api/products/${product.id}`);

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.id).toBeDefined();
//     expect(response.body.data.username_seller).toBe("test");
//   });

//   it("should be able getProduct reject", async () => {
//     const product = await ProductTest.get();
//     const response = await supertest(web).get(
//       `/api/products/${product.id + 1}`
//     );
//     logger.debug(response.body);
//     expect(response.status).toBe(404);
//     expect(response.body.errors).toBeDefined();
//   });
// });

describe("PUT /api/products/user/:productId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ProductTest.create();
  });
  afterEach(async () => {
    await ProductTest.delateAll();
    await UserTest.delate();
  });
  it("should be able to update product", async () => {
    const product = await ProductTest.get();
    const response = await supertest(web)
      .put(`/api/products/user/${product.id}`)
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
    expect(response.body.data.id).toBe(product.id);
  });

  it("should reject to update product", async () => {
    const product = await ProductTest.get();
    const response = await supertest(web)
      .put(`/api/products/user/${product.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        product_name: "",
        product_desc: " ",
        product_category: "n",
        product_price: "1",
        product_quantity: "90",
      });
    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

// describe("DELETE /api/products/user/:productId", () => {
//   beforeEach(async () => {
//     await UserTest.create();
//     await ProductTest.create();
//   });
//   afterEach(async () => {
//     await ProductTest.delateAll();
//     await UserTest.delate();
//   });

//   it("should be able to remove product", async () => {
//     const product = await ProductTest.get();
//     const response = await supertest(web)
//       .delete(`/api/products/user/${product.id}`)
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data).toBe("Success Deleted Products");
//   });
//   it("should reject remove product if product is not found", async () => {
//     const product = await ProductTest.get();
//     const response = await supertest(web)
//       .delete(`/api/products/user/${product.id + 1}`)
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(404);
//     expect(response.body.errors).toBeDefined();
//   });
// });

// describe("GET /api/products/search", () => {
//   beforeEach(async () => {
//     await UserTest.create();
//     await ProductTest.create();
//   });
//   afterEach(async () => {
//     await ProductTest.delateAll();
//     await UserTest.delate();
//   });
//   it("should be able to search product", async () => {
//     const response = await supertest(web)
//       .get("/api/products/search")
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.length).toBe(1);
//   });
//   it("should be able to search product using product_name", async () => {
//     const response = await supertest(web)
//       .get("/api/products/search")
//       .query({
//         product_name: "es",
//       })
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.length).toBe(1);
//   });

//   it("should be able to search product using product_desc", async () => {
//     const response = await supertest(web)
//       .get("/api/products/search")
//       .query({
//         product_desc: "sot",
//       })
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.length).toBe(1);
//   });
//   it("should be able to search product using product_category", async () => {
//     const response = await supertest(web)
//       .get("/api/products/search")
//       .query({
//         product_category: "makan",
//       })
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.length).toBe(1);
//   });
//   it("should be able to search product no result", async () => {
//     const response = await supertest(web)
//       .get("/api/products/search")
//       .query({
//         product_name: "makan",
//       })
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.length).toBe(0);
//   });
//   it("should be able to search product whit paging", async () => {
//     const response = await supertest(web)
//       .get("/api/products/search")
//       .query({
//         page: 2,
//         size: 1,
//       })
//       .set("X-API-TOKEN", "test");

//     logger.debug(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.data.length).toBe(0);
//     expect(response.body.paging.current_page).toBe(2);
//     expect(response.body.paging.total_page).toBe(1);
//     expect(response.body.paging.size).toBe(1);
//   });
// });
