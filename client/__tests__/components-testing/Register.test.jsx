/**
 * @jest-environment jsdom
 */

import React from "react";

import "@testing-library/jest-dom";
import { renderWithProviders } from "../../utils/test-utils";
import { setupServer } from "msw/node";
import authHandlers from "../../../mocks/serverMock/authMock";
import Register from "../../components/Register";
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

describe("<Register/>", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });
  test("renders the Register Component", () => {
    const register = renderWithProviders(<Register />);
    expect(register).not.toBe(null);
  });

  test("render and display the Register page", () => {
    renderWithProviders(<Register />);
    const title = screen.getByText("Create Account");
    const name = screen.getByText("Name");
    const username = screen.getByText("Username");
    const password = screen.getByText("Password");
    const email = screen.getByText("Email");
    const mobile = screen.getByText("Mobile Number");
    const Address = screen.getByText("Address");

    const continueButton = screen.getByRole("button", {
      name: "continue",
      hidden: true,
    });
    expect(title).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    expect(email).toBeInTheDocument();
    expect(mobile).toBeInTheDocument();
    expect(Address).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
  });
  test("the user should login into their account after clicked submit with correct username and password", async () => {
    renderWithProviders(<Register />);
    const continueButton = screen.getByRole("button", {
      name: "submit",
      hidden: true,
    });
    fireEvent.click(continueButton);
    const response = await fetch("http://localhost:8080/auth/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "testUser",
        username: "exampleUser",
        email: "user@example.com",
        password: "testPassword",
        mobile: "12345",
        address: "test address",
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
