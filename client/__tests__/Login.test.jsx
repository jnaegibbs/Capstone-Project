/**
 * @jest-environment jsdom
 */

import React from "react";

import "@testing-library/jest-dom";
import { renderWithProviders } from "../utils/test-utils";
import { setupServer } from "msw/node";
import { handlers } from "../../mocks/serverMock";
import Login from '../components/Login';

const server = setupServer(...handlers);
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
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

  // login button rendered correctly

  // register button rendered correctly with register link

  // continue button rendered correctly

  // successful login - verify if token is present
});
