import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("http://localhost:8080/auth/user/login", async () => {
    return HttpResponse.json({
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
    });
  }),
  http.post("http://localhost:8080/auth/user/register", async () => {
    return HttpResponse.json({
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
    });
  }),
];

export default authHandlers;
