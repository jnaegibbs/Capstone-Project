/**
 * @jest-environment jsdom
 */

import React from "react";

import "@testing-library/jest-dom";
import { renderWithProviders } from "../../utils/test-utils";
import { setupServer } from "msw/node";
import authHandlers from "../../../mocks/serverMock/authMock";
import Account from "../../components/Account";
import { fireEvent, screen } from "@testing-library/react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { testUseAppSelector } from "../../utils/test-app-selector";

const server = setupServer(...authHandlers);
const mockedUsedNavigate = jest.fn();


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

//jest.mock("../../hooks");

const user = {
  token: "token",
  user: {
    id: 123,
    username: "test",
    isAdmin: true,
    profile: [
      {
        id: 1,
        name: "test",
        email: "test@test.com",
        phoneNumber: "12345",
        address: "test address",
        userId: 123,
      },
    ],
    order: [{}],
    cart: [{}],
  },
};
//Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("<Account/>", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
   
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Account Component", () => {
    const account = renderWithProviders(<Account />);
    expect(account).not.toBe(null);
  });

  test("render and display the login page if user not logged In", () => {
    renderWithProviders(<Account />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();

    const username = screen.getByText("Username");
    const password = screen.getByText("Password");

    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" })
    ).toBeInTheDocument();
  });

  test("render and display the account page if user logged In", async () => {
    renderWithProviders(<Account />);
    //useAppSelector.mockImplememtation(testUseAppSelector);

   
  
  });
});
