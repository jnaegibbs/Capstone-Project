const db = require("../db");
const bcrypt = require('bcrypt');
const SALT_COUNT = 5;



async function createInitialProducts() {
    try {
        console.log("Starting to create products...");

        // Product 1
        await db.product.create({
            data: {
                name: 'Cotton Blend Tug Rope',
                image: 'https://image.chewy.com/is/image/catalog/152836_Main._AC_SL1200_V1549654979_.jpg',
                price: '$15.00',
                description: 'Strong Chewing Teething Training Interactive for Dogs and Cats',
                categoryId: 1,
            },
        });

        //Product 2
        await db.product.create({
            data: {
                name: 'Squeaky Plush Dog Toy',
                image: 'https://image.chewy.com/is/image/catalog/68071_MAIN._AC_SL1200_V1530544157_.jpg',
                price: '$7.00',
                description: 'Squeaker that makes every far-flung game of fetch even more entertaining',
                categoryId: 1,
            },
        });

        // Product 3
        await db.product.create({
            data: {
                name: 'Brick Puzzle Game Dog Toy',
                image: 'https://image.chewy.com/is/image/catalog/148599_MAIN._AC_SL1200_V1694285518_.jpg',
                price: '$10.99',
                description: 'Hide the treats and watch your pup paw and nose them to reveal their prize.',
                categoryId: 1,
            },
        });

        // Product 4
        await db.product.create({
            data: {
                name: 'Bacon Flavor Wishbone Dog Chew Toy',
                image: 'https://image.chewy.com/is/image/catalog/71968_MAIN._AC_SL1200_V1612404735_.jpg',
                price: '$9.40',
                description: 'Delivers a wag-worthy flavor from real bacon that\'s fused all the way through the chew.',
                categoryId: 1,
            },
        });

        // Product 5
        await db.product.create({
            data: {
                name: 'Ball Launcher Dog Toy',
                image: 'https://image.chewy.com/is/image/catalog/53259_MAIN._AC_SL1200_V1602320474_.jpg',
                price: '$7.95',
                description: 'This quality ball launcher and ball set provides hours of fun playing fetch with your pooch.',
                categoryId: 1,
            },
        });

        // Product 6
        await db.product.create({
            data: {
                name: 'Cat Tunnel',
                image: 'https://image.chewy.com/is/image/catalog/166382_MAIN._AC_SL1200_V1668737518_.jpg',
                price: '$19.99',
                description: 'This pop-up cat play tunnel provides fun interactive games and an enticing hiding spot to keep your kitty stimulated.',
                categoryId: 1,
            },
        });

        // Product 7
        await db.product.create({
            data: {
                name: 'Window Teaser Cat Toy',
                image: 'https://image.chewy.com/is/image/catalog/91384_MAIN._AC_SL1200_V1539005215_.jpg',
                price: '$9.99',
                description: 'Promotes healthy exercise and fulfills your cat’s instinctual desire to chase, hunt and capture.',
                categoryId: 1,
            },
        });

        // Product 8
        await db.product.create({
            data: {
                name: 'Rainbow Catnip Toy',
                image: 'https://image.chewy.com/is/image/catalog/102811_MAIN._AC_SL1200_V1527257389_.jpg',
                price: '$7.99',
                description: 'Made from durable cotton twill and colored using only natural vegetable or soy-based colors.',
                categoryId: 1,
            },
        });

        // Product 9
        await db.product.create({
            data: {
                name: 'Cat Treat Puzzle Toy',
                image: 'https://image.chewy.com/is/image/catalog/227098_MAIN._AC_SL1200_V1636510666_.jpg',
                price: '$21.99',
                description: 'The purr-fect toy for curious cats, since it helps encourage their natural foraging instincts.',
                categoryId: 1,
            }
        });

        // Product 10
        await db.product.create({
            data: {
                name: 'Rainbow Cat Map',
                image: 'https://image.chewy.com/is/image/catalog/83997_MAIN._AC_SL1200_V1602317764_.jpg',
                price: '$14.99',
                description: 'The perfect mat for your feline to nap and lay out on.',
                categoryId: 1,
            }
        });

        // Product 11
        await db.product.create({
            data: {
                name: 'SmartBlend Chicken and Rice (40 lbs)',
                image: 'https://image.chewy.com/is/image/catalog/143259_MAIN._AC_SL1200_V1676050816_.jpg',
                price: '$60.48',
                description: 'Tender, meaty morsels and crunchy kibble come together for a drool-worthy taste dogs love.',
                categoryId: 2,
            }
        });

        // Product 12
        await db.product.create({
            data: {
                name: "Grilled Steak & Vegetable Flavor Dog Kibble (44lbs)",
                image: "https://image.chewy.com/is/image/catalog/362455_MAIN._AC_SL1200_V1698957071_.jpg",
                price: "$29.98",
                description: "Dry dog food prepared with whole grains and essential nutrients to promote a healthy skin and luxurious coat.",
                categoryId: 2,
            },
        });

        // Product 13
        await db.product.create({
            data: {
                name: "Texas Beef + Sweet Potato (10lb)",
                image: "https://image.chewy.com/is/image/catalog/200579_MAIN._AC_SL1200_V1670437600_.jpg",
                price: "$51.98",
                description: "Grain-free kibble is made with real food ingredients to deliver balanced nutrition.",
                categoryId: 2,
            },
        });

        // Product 14
        await db.product.create({
            data: {
                name: "Blue Buffalo's Stew Chicken & Beef Variety Pack (12.5-oz can, case of 6)",
                image: "https://image.chewy.com/is/image/catalog/735686_MAIN._AC_SL1200_V1674586853_.jpg",
                price: "$17.58",
                description: "Pate-style food packed with real beef and chicken.",
                categoryId: 2,
            },
        });

        // Product 15
        await db.product.create({
            data: {
                name: "Hill's Science Diet Adult Sensitive Stomach & Skin Tender Turkey & Rice Stew",
                image: "https://image.chewy.com/is/image/catalog/157792_MAIN._AC_SL1200_V1595601955_.jpg",
                price: "$44.88",
                description: "Specially designed to support your dog’s sensitive stomach with easy-to-digest turkey, chicken, and rice.",
                categoryId: 2,
            },
        });

        // Product 16
        await db.product.create({
            data: {
                name: "Iams ProActive Health Indoor Weight & Hairball Care Adult Dry Cat Food (16lb)",
                image: "https://image.chewy.com/is/image/catalog/93653_MAIN._AC_SL1200_V1609975950_.jpg",
                price: "$29.99",
                description: "Dry kibble for adult cats designed to support healthy weight and reduce hairballs.",
                categoryId: 2,
            },
        });

        // Product 17
        await db.product.create({
            data: {
                name: "Blue Buffalo Wilderness Chicken Recipe Grain-Free Dry Cat Food (12lb)",
                image: "https://image.chewy.com/is/image/catalog/46918_MAIN._AC_SL600_V1598116904_.jpg",
                price: "$44.99",
                description: "High-protein recipe is packed with real chicken to help your little hunter build and maintain lean muscle.",
                categoryId: 2,
            },
        });

        // Product 18
        await db.product.create({
            data: {
                name: "Purina Fancy Feast with Savory Chicken & Turkey Dry Cat Food (12lbs)",
                image: "https://image.chewy.com/is/image/catalog/76145_MAIN._AC_SL1200_V1678227384_.jpg",
                price: "$33.99",
                description: "Gourmet chicken and turkey dry cat food recipe baked into wonderfully crisp morsels for a crunchy texture that cats love.",
                categoryId: 2,
            },
        });

        // Product 19
        await db.product.create({
            data: {
                name: "Tiny Tiger Chunks in EXTRA Gravy Beef & Poultry Recipes Variety Pack Grain-Free Canned Cat Food (24 pk)",
                image: "https://image.chewy.com/is/image/catalog/147784_Main._AC_SL1200_V1558459942_.jpg",
                price: "$17.99",
                description: "Grain-free variety pack contains three tasty recipes from the farm, including Beef, Chicken, and Turkey and Giblets.",
                categoryId: 2,
            },
        });

        // Product 20
        await db.product.create({
            data: {
                name: "Catit Dinner Ocean Fish with Tuna & Carrot Cat Wet Food, 2.8-oz can",
                image: "https://image.chewy.com/is/image/catalog/781854_MAIN._AC_SL1200_V1677076415_.jpg",
                price: "$1.99",
                description: "Nutrients, vitamins, and minerals help support your cat’s health while adding much-needed moisture to their daily diet.",
                categoryId: 2,
            },
        });

        // Product 21
        await db.product.create({
            data: {
                name: "Frisco Magical Butterfly Wings Dog & Cat Costume",
                image: "https://image.chewy.com/is/image/catalog/713062_MAIN._AC_SL1200_V1689271325_.jpg",
                price: "$9.99",
                description: "The intricate wings feature a felt black frame with flocked texture, and iridescent polyester that produces a shiny multicolor effect.",
                categoryId: 3,
            },
        });

        // Product 22
        await db.product.create({
            data: {
                name: "Blazin' Safety LED USB Rechargeable Nylon Dog Collar",
                image: "https://image.chewy.com/is/image/catalog/363321_MAIN._AC_SL1200_V1643073089_.jpg",
                price: "$21.99",
                description: "Comes with a slim bulb strip and a small on/off box, which works in any weather condition.",
                categoryId: 3,
            },
        });

        // Product 23
        await db.product.create({
            data: {
                name: "Doggie Design American River Ombre Nylon Reflective Back Clip Dog Harness",
                image: "https://image.chewy.com/is/image/catalog/119357_MAIN._AC_SL1200_V1520018058_.jpg",
                price: "$19.99",
                description: "Vibrant pattern is printed directly on the breathable mesh and is machine washable.",
                categoryId: 3,
            },
        });

        // Product 24
        await db.product.create({
            data: {
                name: "Frisco Glow in the Dark Mystical Print Dog & Cat Bandana, X-Small/Small",
                image: "https://image.chewy.com/is/image/catalog/261218_PT2._AC_SL1200_V1633086982_.jpg",
                price: "$4.99",
                description: "Glow-in-the-dark print features classic Halloween cats, witch hats, and moons.",
                categoryId: 3,
            },
        });

        // Product 25
        await db.product.create({
            data: {
                name: "Frisco Polar Bear Sweater Knit Dog & Cat Hat",
                image: "https://image.chewy.com/is/image/catalog/745742_MAIN._AC_SL1200_V1694793753_.jpg",
                price: "$12.99",
                description: "This cream-colored, cable-knit hat features polar bear ears sewn on top for some winter weather protection inspired by the North Pole.",
                categoryId: 3,
            },
        });

        // Product 26
        await db.product.create({
            data: {
                name: "Kodiak Insulated Dog Coat",
                image: "https://image.chewy.com/is/image/catalog/123934_MAIN._AC_SL1200_V1536157123_.jpg",
                price: "$29.99",
                description: "Hand-knit by Andean artisans with 100% natural, non-allergenic, organic wool sourced from small farms with Fair Trade guidelines.",
                categoryId: 3,
            },
        });

        // Product 27
        await db.product.create({
            data: {
                name: "Frisco Basic Dog & Cat T-Shirt",
                image: "https://image.chewy.com/is/image/catalog/153684_PT2._AC_SL1200_V1624601556_.jpg",
                price: "$12.99",
                description: "The cotton construction offers comfort and easy dressing and undressing.",
                categoryId: 3,
            },
        });

        // Product 28
        await db.product.create({
            data: {
                name: "Frisco Sherpa Lined Fairisle Dog & Cat Sweater",
                image: "https://image.chewy.com/is/image/catalog/718422_MAIN._AC_SL1200_V1692380243_.jpg",
                price: "$16.99",
                description: "Cute pullover sweater perfect for cozying up to a snuggle by the fireplace, at home, or at the ski lodge.",
                categoryId: 3,
            },
        });

        // Product 29
        await db.product.create({
            data: {
                name: "Non-Skid Cable Knit Dog Socks",
                image: "https://image.chewy.com/is/image/catalog/272473_MAIN._AC_SL1200_V1634828479_.jpg",
                price: "$4.99",
                description: "Stylish, chunky knit in a neutral gray color fits into any pet’s wardrobe.",
                categoryId: 3,
            },
        });

        // Product 30
        await db.product.create({
            data: {
                name: "STAR WARS Pictogram Dog & Cat Bandana",
                image: "https://image.chewy.com/is/image/catalog/311873_MAIN._AC_SL1200_V1643331444_.jpg",
                price: "$9.99",
                description: "Comfy and stylish all in one—just tie it loosely around your pet’s neck for easy on/off.",
                categoryId: 3,
            },
        });

        // Product 31
        await db.product.create({
            data: {
                name: "FURminator Long Hair Dog Deshedding Tool",
                image: "https://image.chewy.com/is/image/catalog/243251_MAIN._AC_SL1200_V1594389959_.jpg",
                price: "$35.25",
                description: "Features a stainless-steel edge that reaches beneath the long topcoat, removing undercoat and loose hair.",
                categoryId: 4,
            },
        });

        // Product 32
        await db.product.create({
            data: {
                name: "Mobile Dog Gear Insulated Food Carriers Dog Car Accessories",
                image: "https://image.chewy.com/is/image/catalog/525454_MAIN._AC_SL1200_V1650398192_.jpg",
                price: "$29.99",
                description: "Spacious enough to hold a variety of foods—so don’t forget the treats!",
                categoryId: 4,
            },
        });

        // Product 33
        await db.product.create({
            data: {
                name: "GoTags Anodized Aluminum Personalized Dog ID Tag",
                image: "https://image.chewy.com/is/image/catalog/153068_MAIN._AC_SL1200_V1619702553_.jpg",
                price: "$7.95",
                description: "Cut into the shape of a bone to make personal identification even more paw-sonal!",
                categoryId: 4,
            },
        });

        // Product 34
        await db.product.create({
            data: {
                name: "Rechargable Cordless Shaver Trimmer Kit with Clippers for Dogs & Cats",
                image: "https://image.chewy.com/is/image/catalog/317705_MAIN._AC_SL1200_V1635867385_.jpg",
                price: "$35.99",
                description: "Works on all fur types, including curly, straight, thick, long and short.",
                categoryId: 4,
            },
        });

        // Product 35
        await db.product.create({
            data: {
                name: "Adjustable Safety Tether Dog & Cat Seat Belt Travel Accessories",
                image: "https://image.chewy.com/is/image/catalog/616614_MAIN._AC_SL1200_V1672337771_.jpg",
                price: "$8.99",
                description: "Made from durable, high-quality nylon",
                categoryId: 4,
            },
        });


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
                profile: {
                    create: {
                        name: 'User 2 Profile',
                        age: 25, // Set the desired age
                        email: 'user2@example.com', // Set the desired email
                    },
                },
            },
        });

        await db.user.create({
            data: {
                name: 'User 3',
                username: 'user3',
                password: hashedPassword3, // Replace with the hashed password for user3
                profile: {
                    create: {
                        name: 'User 3 Profile',
                        age: 28, // Set the desired age
                        email: 'user3@example.com', // Set the desired email
                    },
                },
            },
        });
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

