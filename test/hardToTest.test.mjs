import { expect } from "chai";
import { getSuggestedUser } from "../src/hardToTest.mjs";

describe("Getting a suggested user", () => {
  const filePath = `${process.cwd()}/users.json`;

  it("should return a user with the correct properties ", () => {
    const user = getSuggestedUser(filePath);
    expect(user).to.have.all.keys(
      "_id",
      "company",
      "email",
      "gender",
      "isActive",
      "name",
      "registered"
    );
  });
});
