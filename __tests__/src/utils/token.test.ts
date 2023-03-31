import { it, describe, expect, vi, beforeEach } from "vitest";
import jwt from "jsonwebtoken";
import { decodeToken, setToken, getToken } from "../../../src/utils/token";
import { TOKEN } from "../../../src/utils/constants";

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

  it("should return empty object when token input is invalid", () => {
    const invalid_token = "not-a-valid-token";
    expect(decodeToken(invalid_token)).toEqual(null);
  });

  it("should return empty object when token input is empty or undefined", () => {
    expect(decodeToken("")).toEqual(null);
    expect(decodeToken()).toEqual(null);
  });
});

describe("setToken()", () => {
  beforeEach(() => {
    window.localStorage.removeItem(TOKEN);
  });

  it("should call localStorage.setItem with the token argument and token constants", () => {
    const token = jwt.sign(decodedToken, "secret");

    const setItemSpy = vi.spyOn(window.localStorage, "setItem");

    setToken(token);

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toBeCalledWith(TOKEN, token);

    setItemSpy.mockRestore();
  });

  it("should save the token correctly in localstorage", () => {
    const token = jwt.sign(decodedToken, "secret");

    setToken(token);

    expect(window.localStorage.getItem(TOKEN)).toEqual(token);
  });

  it("should save a empty string if token is empty", () => {
    setToken("");

    expect(window.localStorage.getItem(TOKEN)).toEqual("");
  });

  it("should save token with special characters", () => {
    const token = "t0k3n.3sp3c1al#";

    setToken(token);

    expect(window.localStorage.getItem(TOKEN)).toEqual(token);
  });
});

describe("getToken()", () => {
  beforeEach(() => {
    window.localStorage.removeItem(TOKEN);
  });

  it("should call localStorage.getItem with the TOKEN constants", () => {
    const getItemSpy = vi.spyOn(window.localStorage, "getItem");

    getToken();

    expect(getItemSpy).toHaveBeenCalledTimes(1);
    expect(getItemSpy).toBeCalledWith(TOKEN);

    getItemSpy.mockRestore();
  });

  it("should return the token value from localStorage", () => {
    const token = jwt.sign(decodedToken, "secret");
    window.localStorage.setItem(TOKEN, token);

    expect(getToken()).toEqual(token);
  });

  it("should return null if there isn't token in localStorage", () => {
    expect(getToken()).toBeNull();
  });

  it("should return a token with special characters from localStorage", () => {
    const token = "t0k3n.3sp3c1al#";
    localStorage.setItem(TOKEN, token);

    expect(getToken()).toEqual(token);
  });

  it("should not modify the value of the token in localStorage", () => {
    const token = jwt.sign(decodedToken, "secret");
    window.localStorage.setItem(TOKEN, token);

    getToken();

    expect(window.localStorage.getItem(TOKEN)).toBe(token);
  });
});
