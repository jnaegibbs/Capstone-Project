import { http, HttpResponse } from "msw";

export const productApiHandlers = [
    http.get(`http://localhost:8080/api/pets/product/*`,async({request})=>{
        const url = new URL(request.url);
        const productId = url.searchParams.get('productId')
        if (!productId) {
            return new HttpResponse(null, { status: 404 })
          }
       
          return HttpResponse.json({ 
            product:{
                id:1,
                name:"test product",
                image:"testing image",
                price:"$10.00",
                description:'testing description',
                categoryName:"toy",
                petCategory:"dog",
                review:[
                    {
                        id: 5,
                        content: "review",
                        rating: 4,
                        postAt: "2023-12-02T21:52:07.860Z",
                        userId: 1,
                        productId: 1

                    }
                ]

            }
           
           })
    })
]

export default productApiHandlers;