/**
 * @jest-environment jsdom
 */

import React from "react";

import "@testing-library/jest-dom";
import { renderWithProviders } from "../../utils/test-utils";
import { setupServer } from "msw/node";
import authHandlers from "../../../mocks/serverMock/authMock";
import Login from "../../components/Login";
import { fireEvent, screen } from "@testing-library/react";

const server = setupServer(...authHandlers);
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("<Login/>", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });
  test("renders the login Component", () => {
    const login = renderWithProviders(<Login />);
    expect(login).not.toBe(null);
  });

  test("should render and display the login page", () => {
    renderWithProviders(<Login />);
    const title = screen.getByText("Sign In");

    const username = screen.getByText("Username");

    const password = screen.getByText("Password");

    const continueButton = screen.getByRole("button", {
      name: "Continue",
      hidden: true,
    });

    const registerButton = screen.getByRole("button", {
      name: "Create an account",
      hidden: true,
    });
    expect(title).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test("the user should login into their account after clicked continue with correct username and password", async () => {
    renderWithProviders(<Login />);
    const continueButton = screen.getByRole("button", {
      name: "Continue",
      hidden: true,
    });
    fireEvent.click(continueButton);
    const response = await fetch("http://localhost:8080/auth/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "exampleUser",
        email: "user@example.com",
      }),
    });
    // Parse the JSON response
    const data = await response.json();
    // Assert the response or any other test logic
    expect(response.status).toBe(200);
    expect(data).toEqual({
      token: "token",
      user:{
        id: 123,
        username: "test",
        isAdmin: true,
        profile:[{
          id:1,
          name: "test",
    
          email: "test@test.com",
          phoneNumber: "12345",
          address: "test address",
          userId:123

        }],
        order:[{}],
        cart:[{}]

      }
     
    });
  });

});
