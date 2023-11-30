import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("api/pets/products", () => {
    console.log('Captured a "GET /posts" request');
    return new response("Hello world");
  }),
  http.post("api/pets/product", () => {
    console.log('Captured a "POST /posts" request');
  }),
  http.delete("api/pets/product/:id", ({ params }) => {
    console.log(`Captured a "DELETE /posts/${params.id}" request`);
  }),
];
