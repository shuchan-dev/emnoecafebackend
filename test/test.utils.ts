import { prisma } from "../src/application/database";

export class UserTest {
  static async delate() {
    await prisma.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }
}
