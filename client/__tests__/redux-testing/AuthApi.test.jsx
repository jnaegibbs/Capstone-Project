/**
 * @jest-environment jsdom
 */
import tokenReducer, { logout } from "../../redux/tokenSlice";

test("should return the initial state", () => {
  expect(tokenReducer(undefined, { type: undefined })).toEqual({
    token: null,
    user: null,
  });
});

test("should handle a token and user being added to an tokenSlice", () => {
  const setState = { token: "token", user: "userDetails" };

  expect(
    tokenReducer(setState, { token: "token", user: "userDetails" })
  ).toEqual({ token: "token", user: "userDetails" });
});

test("should handle logout being removed from tokenSlice", () => {
  const previousState = { token: "token", user: "userDetails" };

  expect(
    tokenReducer(previousState, logout({ token: null, user: null }))
  ).toEqual({ token: null, user: null });
});
