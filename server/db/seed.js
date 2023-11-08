const db = require("../db/client");
const bcrypt = require('bcrypt');
const SALT_COUNT = 5;



async function createInitialProducts() {
    try {
        console.log("Starting to create products...");


    const categories = [
        { categoryName: 'toy', petCategory: 'dog' },
        { categoryName: 'toy', petCategory: 'cat' },
      ];
  
      const products = [
        {
            name: 'Cotton Blend Tug Rope',
            image: 'https://image.chewy.com/is/image/catalog/152836_Main._AC_SL1200_V1549654979_.jpg',
            price: '15.00',
            description: 'Strong Chewing Teething Training Interactive for Dogs and Cats',
            petCategory: 'dog',
            categoryName: 'toy'
          },
          {
            name: 'Squeaky Plush Dog Toy',
            image: 'https://image.chewy.com/is/image/catalog/68071_MAIN._AC_SL1200_V1530544157_.jpg',
            price: '7.00',
            description: 'Squeaker that makes every far-flung game of fetch even more entertaining',
            petCategory: 'dog',
            categoryName: 'toy'
          },
          {
            name: 'Brick Puzzle Game Dog Toy',
            image: 'https://image.chewy.com/is/image/catalog/148599_MAIN._AC_SL1200_V1694285518_.jpg',
            price: '10.99',
            description: 'Hide the treats and watch your pup paw and nose them to reveal their prize.',
            petCategory: 'dog',
            categoryName: 'toy'
          },
          {
            name: 'Bacon Flavor Wishbone Dog Chew Toy',
            image: 'https://image.chewy.com/is/image/catalog/71968_MAIN._AC_SL1200_V1612404735_.jpg',
            price: '9.40',
            description: `Delivers a wag-worthy flavor from real bacon that's fused all the way through the chew.`,
            petCategory: 'dog',
            categoryName: 'toy'
          },
          {
            name: 'Ball Launcher Dog Toy',
            image: 'https://image.chewy.com/is/image/catalog/53259_MAIN._AC_SL1200_V1602320474_.jpg',
            price: '7.95',
            description: 'This quality ball launcher and ball set provides hours of fun playing fetch with your pooch.',
            petCategory: 'dog',
            categoryName: 'toy'
          },
    
      ];

      for (const category of categories) {
        await db.category.create({ data: category });
      }
  
      for (const product of products) {
        await db.product.create({ data: product });
      }
      
        console.log("Finished creating products!");
    } catch (error) {
        console.log("Error creating products!");
        throw error;
    };

}

async function createInitialUsers() {
    try {
        console.log("Starting to create users...");

        const hashedPassword1 = await bcrypt.hash('password1', SALT_COUNT);
        const hashedPassword2 = await bcrypt.hash('password2', SALT_COUNT);
        const hashedPassword3 = await bcrypt.hash('password3', SALT_COUNT);

        await db.user.create({
            data: {
                name: 'User 1',
                username: 'user1',
                password: hashedPassword1,
                role: 'user',
                profile: {
                    create: {
                        name: 'User 1 Profile',
                        age: 30,
                        email: 'user1@example.com',
                    },
                },
            },
        });

        await db.user.create({
            data: {
                name: 'User 2',
                username: 'user2',
                password: hashedPassword2,
                role: 'admin', 
                profile: {
                    create: {
                        name: 'User 2 Profile',
                        age: 25, 
                        email: 'user2@example.com',
                    },
                },
            },
        });

        await db.user.create({
            data: {
                name: 'User 3',
                username: 'user3',
                password: hashedPassword3,
                profile: {
                    create: {
                        name: 'User 3 Profile',
                        age: 28, 
                        email: 'user3@example.com',
                    },
                },
            },
        });

        console.log("Finished creating users!");
    } catch (error) {
        console.error("Error creating users:", error);
    }
}

async function seed() {
    await createInitialProducts();
    await createInitialUsers();
}


seed()
    .catch(console.error);

