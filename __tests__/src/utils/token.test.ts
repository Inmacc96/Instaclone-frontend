import { it, describe, expect } from "vitest";
import jwt from "jsonwebtoken";
import { decodeToken } from "../../../src/utils/token";

const decodedToken = {
  id: "640711fdf7b14a41b2dcebb8",
  email: "test@test.com",
  name: "Test",
  username: "test123",
};

describe("decodeToken()", () => {
  const token = jwt.sign(decodedToken, "secret");

  it("should return the decoded token when token input is valid", () => {
    expect(decodeToken(token)).toEqual(decodedToken);
  });

  it("should return empty object when token input isn't valid", () => {
    const invalid_token = "not-a-valid-token";
    expect(decodeToken(invalid_token)).toEqual(null);
  });

  it("should return empty object when token input is empty or undefined", () => {
    expect(decodeToken("")).toEqual(null);
    expect(decodeToken()).toEqual(null);
  });
});
