import { expect } from "chai";
import fs from "fs";
import { getSuggestedUser } from "../src/hardToTest.mjs";
import { mockData } from "./mockData.mjs";

describe("Getting a suggested user", () => {
  const filePath = `${process.cwd()}/users_test_db.json`;
  const todaysDate = new Date();

  beforeEach(() => {
    // load  test db json file with mock data
    try {
      fs.writeFileSync(filePath, JSON.stringify(mockData));
    } catch (error) {
      console.error(error);
    }
  });

  afterEach(() => {
    // remove test db json file
    try {
      fs.unlinkSync(filePath);
      //file removed
    } catch (err) {
      console.error(err);
    }
  });

  it("should return a user with the correct properties ", () => {
    const user = getSuggestedUser(filePath);
    expect(user).to.have.all.keys(
      "_id",
      "company",
      "email",
      "gender",
      "name",
      "registered",
      "lastSuggested"
    );
  });

  it("should correctly update the 'last suggested' property on the suggested user", () => {
    const user = getSuggestedUser(filePath);
    expect(user.lastSuggested.toString()).to.contain(
      new Date().toString().substring(0, 10)
    );
  });
});
