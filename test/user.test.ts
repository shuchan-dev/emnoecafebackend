import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test.utils";
import bcrypt from "bcrypt";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delate();
  });
  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });
  it("should register new user", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});

describe("POST /api/user/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delate();
  });

  it("should be able to login", async () => {
    const respons = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(respons.body);
    expect(respons.status).toBe(200);
    expect(respons.body.data.username).toBe("test");
    expect(respons.body.data.name).toBe("test");
    expect(respons.body.data.token).toBeDefined();
  });

  it("should reject login user if username wrong", async () => {
    const respons = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "test",
    });

    logger.debug(respons.body);
    expect(respons.status).toBe(401);
    expect(respons.body.errors).toBeDefined();
  });
  it("should reject login user if password wrong", async () => {
    const respons = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "testt",
    });

    logger.debug(respons.body);
    expect(respons.status).toBe(401);
    expect(respons.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delate();
  });
  it("should be able to ger User", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });

  it("should reject get user if token is invalid", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "salah");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delate();
  });
  it("should reject update user if request is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "",
        name: "",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject update user if request token is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "salah")
      .send({
        password: "bener",
        name: "update",
      });
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
  it("should be able to update name", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        name: "update",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("update");
  });
  it("should be able to update password", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "update",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    const user = await UserTest.get();
    expect(await bcrypt.compare("update", user.password)).toBe(true);
  });
});

describe("DELETE /api/users/curent", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delate();
  });

  it("should be able to logout", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("Logout Success");
    const user = await UserTest.get();
    expect(user.token).toBeNull();
  });

  it("should reject logout user if token is wrong", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "salah");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/users", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delate();
  });
  it("should get all data", async () => {
    const response = await supertest(web)
      .get("/api/users")
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(200);
  });
});
