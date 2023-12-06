/**
 * @jest-environment jsdom
 */

import React from "react";

import "@testing-library/jest-dom";
import { renderWithProviders } from "../../utils/test-utils";
import { setupServer } from "msw/node";
import productApiHandlers from "../../../mocks/serverMock/productApiMock";
import Account from "../../components/Account";
import { screen } from "@testing-library/react";
import { useAppSelector } from "../../hooks";
import { useFetchSingleProductQuery } from "../../redux/productsApi";
import { useGetUserOrderQuery } from "../../redux/orderApi";

const server = setupServer(...productApiHandlers);
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../hooks", () => ({
  ...jest.requireActual("../../hooks"),
  useAppSelector: jest.fn(),
}));

jest.mock("../../redux/productsApi",()=>({
  ...jest.requireActual("../../redux/productsApi"),
  useFetchSingleProductQuery:jest.fn(),
}));

jest.mock("../../redux/orderApi",()=>({
  ...jest.requireActual("../../redux/orderApi"),
  useGetUserOrderQuery:jest.fn(),
}))

const user = {
  token: "token",
  user: {
    id: 123,
    username: "test username",
    isAdmin: true,
    profile: [
      {
        id: 1,
        name: "test name",
        email: "test@test.com",
        phoneNumber: "12345",
        address: "test address",
        userId: 123,
      },
    ],
    order: [{
      id: 1,
      orderedAt: "2023-12-03T03:56:29.089Z",
      productId: 1,
      userId: 1,
      quantity: 1
    }],
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
    useGetUserOrderQuery.mockReturnValue(null);
    useAppSelector.mockReturnValue(null);
    useFetchSingleProductQuery.mockReturnValue(null);
   
    const account = renderWithProviders(<Account />);
    expect(account).not.toBe(null);
  });

  test("render and display the login page if user not logged In", () => {
    useAppSelector.mockReturnValue(null);
    useFetchSingleProductQuery.mockReturnValue(null);
    useGetUserOrderQuery.mockReturnValue(null);
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

  test("render and display the account page with user details if user logged In", async () => {
    useAppSelector.mockReturnValue(user.user);
    useFetchSingleProductQuery.mockReturnValue(user.user.order)
    useGetUserOrderQuery.mockReturnValue(user.user.order)
    renderWithProviders(<Account />);
   
   
    const LoggedInusername = await screen.findByDisplayValue("test username");
    const LoggedInname = await screen.findByDisplayValue("test name");
    const LoggedInEmail = await screen.findByDisplayValue("test@test.com");
    const LoggedInPhoneNumber = await screen.findByDisplayValue("12345");
    const LoggedInAddress = await screen.findByDisplayValue("test address");

    expect(screen.getByText("BASIC INFORMATION")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();

    expect(LoggedInusername).toBeInTheDocument;
    expect(LoggedInname).toBeInTheDocument;
    expect(LoggedInEmail).toBeInTheDocument;
    expect(LoggedInPhoneNumber).toBeInTheDocument;
    expect(LoggedInAddress).toBeInTheDocument;
  });
 });

