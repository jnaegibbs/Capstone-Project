const db = require("../db/client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 5;

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");

    const categories = [
      { categoryName: "toy", petCategory: "dog" },
      { categoryName: "toy", petCategory: "cat" },
      { categoryName: "food", petCategory: "dog" },
      { categoryName: "food", petCategory: "cat" },
      { categoryName: "clothes", petCategory: "dog" },
      { categoryName: "clothes", petCategory: "cat" },
      { categoryName: "accessories", petCategory: "dog" },
      { categoryName: "accessories", petCategory: "cat" },
    ];

    const products = [
      {
        name: "Cotton Blend Tug Rope",
        image:
          "https://image.chewy.com/is/image/catalog/152836_Main._AC_SL1200_V1549654979_.jpg",
        price: "$15.00",
        description:
          "Strong Chewing Teething Training Interactive for Dogs and Cats",
        petCategory: "dog",
        categoryName: "toy",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Squeaky Plush Dog Toy",
        image:
          "https://image.chewy.com/is/image/catalog/68071_MAIN._AC_SL1200_V1530544157_.jpg",
        price: "$7.00",
        description:
          "Squeaker that makes every far-flung game of fetch even more entertaining",
        petCategory: "dog",
        categoryName: "toy",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Brick Puzzle Game Dog Toy",
        image:
          "https://image.chewy.com/is/image/catalog/148599_MAIN._AC_SL1200_V1694285518_.jpg",
        price: "$10.99",
        description:
          "Hide the treats and watch your pup paw and nose them to reveal their prize.",
        petCategory: "dog",
        categoryName: "toy",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Bacon Flavor Wishbone Dog Chew Toy",
        image:
          "https://image.chewy.com/is/image/catalog/71968_MAIN._AC_SL1200_V1612404735_.jpg",
        price: "$9.40",
        description: `Delivers a wag-worthy flavor from real bacon that's fused all the way through the chew.`,
        petCategory: "dog",
        categoryName: "toy",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Ball Launcher Dog Toy",
        image:
          "https://image.chewy.com/is/image/catalog/53259_MAIN._AC_SL1200_V1602320474_.jpg",
        price: "$7.95",
        description:
          "This quality ball launcher and ball set provides hours of fun playing fetch with your pooch.",
        petCategory: "dog",
        categoryName: "toy",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Cat Tunnel",
        image:
          "https://image.chewy.com/is/image/catalog/166382_MAIN._AC_SL1200_V1668737518_.jpg",
        price: "$19.99",
        description:
          "This pop-up cat play tunnel provides fun interactive games and an enticing hiding spot to keep your kitty stimulated.",
        categoryName: "toy",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Window Teaser Cat Toy",
        image:
          "https://image.chewy.com/is/image/catalog/91384_MAIN._AC_SL1200_V1539005215_.jpg",
        price: "$9.99",
        description:
          "Promotes healthy exercise and fulfills your cat’s instinctual desire to chase, hunt, and capture.",
        categoryName: "toy",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Rainbow Catnip Toy",
        image:
          "https://image.chewy.com/is/image/catalog/102811_MAIN._AC_SL1200_V1527257389_.jpg",
        price: "$7.99",
        description:
          "Made from durable cotton twill and colored using only natural vegetable or soy-based colors.",
        categoryName: "toy",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Cat Treat Puzzle Toy",
        image:
          "https://image.chewy.com/is/image/catalog/227098_MAIN._AC_SL1200_V1636510666_.jpg",
        price: "$21.99",
        description:
          "The purr-fect toy for curious cats, as it helps encourage their natural foraging instincts.",
        categoryName: "toy",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Rainbow Cat Map",
        image:
          "https://image.chewy.com/is/image/catalog/83997_MAIN._AC_SL1200_V1602317764_.jpg",
        price: "$14.99",
        description: "The perfect mat for your feline to nap and lay out on.",
        categoryName: "toy",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "SmartBlend Chicken and Rice (40 lbs)",
        image:
          "https://image.chewy.com/is/image/catalog/143259_MAIN._AC_SL1200_V1676050816_.jpg",
        price: "$60.48",
        description:
          "Tender, meaty morsels and crunchy kibble come together for a drool-worthy taste dogs love.",
        categoryName: "food",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Grilled Steak & Vegetable Flavor Dog Kibble (44 lbs)",
        image:
          "https://image.chewy.com/is/image/catalog/362455_MAIN._AC_SL1200_V1698957071_.jpg",
        price: "$29.98",
        description:
          "Dry dog food prepared with whole grains and essential nutrients to promote a healthy skin and luxurious coat.",
        categoryName: "food",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Texas Beef + Sweet Potato (10 lb)",
        image:
          "https://image.chewy.com/is/image/catalog/200579_MAIN._AC_SL1200_V1670437600_.jpg",
        price: "$51.98",
        description:
          "Grain-free kibble is made with real food ingredients to deliver balanced nutrition.",
        categoryName: "food",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Blue Buffalo's Stew Chicken & Beef Variety Pack (12.5-oz can, case of 6)",
        image:
          "https://image.chewy.com/is/image/catalog/735686_MAIN._AC_SL1200_V1674586853_.jpg",
        price: "$17.58",
        description: "Pate-style food packed with real beef and chicken.",
        categoryName: "food",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Hill's Science Diet Adult Sensitive Stomach & Skin Tender Turkey & Rice Stew",
        image:
          "https://image.chewy.com/is/image/catalog/157792_MAIN._AC_SL1200_V1595601955_.jpg",
        price: "$44.88",
        description:
          "Specially designed to support your dog’s sensitive stomach with easy-to-digest turkey, chicken, and rice.",
        categoryName: "food",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Iams ProActive Health Indoor Weight & Hairball Care Adult Dry Cat Food (16lb)",
        image:
          "https://image.chewy.com/is/image/catalog/93653_MAIN._AC_SL1200_V1609975950_.jpg",
        price: "$29.99",
        description:
          "Dry kibble for adult cats designed to support healthy weight and reduce hairballs.",
        categoryName: "food",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Blue Buffalo Wilderness Chicken Recipe Grain-Free Dry Cat Food (12lb)",
        image:
          "https://image.chewy.com/is/image/catalog/46918_MAIN._AC_SL600_V1598116904_.jpg",
        price: "$44.99",
        description:
          "High-protein recipe is packed with real chicken to help your little hunter build and maintain lean muscle.",
        categoryName: "food",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Purina Fancy Feast with Savory Chicken & Turkey Dry Cat Food (12lbs)",
        image:
          "https://image.chewy.com/is/image/catalog/76145_MAIN._AC_SL1200_V1678227384_.jpg",
        price: "$33.99",
        description:
          "Gourmet chicken and turkey dry cat food recipe baked into wonderfully crisp morsels for a crunchy texture that cats love.",
        categoryName: "food",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Tiny Tiger Chunks in EXTRA Gravy Beef & Poultry Recipes Variety Pack Grain-Free Canned Cat Food (24 pk)",
        image:
          "https://image.chewy.com/is/image/catalog/147784_Main._AC_SL1200_V1558459942_.jpg",
        price: "$17.99",
        description:
          "Grain-free variety pack contains three tasty recipes from the farm, including Beef, Chicken, and Turkey and Giblets.",
        categoryName: "food",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Catit Dinner Ocean Fish with Tuna & Carrot Cat Wet Food, 2.8-oz can",
        image:
          "https://image.chewy.com/is/image/catalog/781854_MAIN._AC_SL1200_V1677076415_.jpg",
        price: "$1.99",
        description:
          "Nutrients, vitamins, and minerals help support your cat’s health while adding much-needed moisture to their daily diet.",
        categoryName: "food",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Frisco Magical Butterfly Wings Dog Costume",
        image:
          "https://image.chewy.com/is/image/catalog/713062_MAIN._AC_SL1200_V1689271325_.jpg",
        price: "$9.99",
        description:
          "The intricate wings feature a felt black frame with flocked texture, and iridescent polyester that produces a shiny multicolor effect.",
        categoryName: "clothes",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Blazin' Safety LED USB Rechargeable Nylon Dog Collar",
        image:
          "https://image.chewy.com/is/image/catalog/363321_MAIN._AC_SL1200_V1643073089_.jpg",
        price: "$21.99",
        description:
          "Comes with a slim bulb strip and a small on/off box, which works in any weather condition.",
        categoryName: "clothes",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Doggie Design American River Ombre Nylon Reflective Back Clip Dog Harness",
        image:
          "https://image.chewy.com/is/image/catalog/119357_MAIN._AC_SL1200_V1520018058_.jpg",
        price: "$19.99",
        description:
          "Vibrant pattern is printed directly on the breathable mesh and is machine washable.",
        categoryName: "clothes",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Frisco Glow in the Dark Mystical Print Dog Bandana, X-Small/Small",
        image:
          "https://image.chewy.com/is/image/catalog/261218_PT2._AC_SL1200_V1633086982_.jpg",
        price: "$4.99",
        description:
          "Glow-in-the-dark print features classic Halloween cats, witch hats, and moons.",
        categoryName: "clothes",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Frisco Polar Bear Sweater Knit Dog Hat",
        image:
          "https://image.chewy.com/is/image/catalog/745742_MAIN._AC_SL1200_V1694793753_.jpg",
        price: "$12.99",
        description:
          "This cream-colored, cable-knit hat features polar bear ears sewn on top for some winter weather protection inspired by the North Pole.",
        categoryName: "clothes",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Kodiak Insulated Dog Coat",
        image:
          "https://image.chewy.com/is/image/catalog/123934_MAIN._AC_SL1200_V1536157123_.jpg",
        price: "$29.99",
        description:
          "Hand-knit by Andean artisans with 100% natural, non-allergenic, organic wool sourced from small farms with Fair Trade guidelines.",
        categoryName: "clothes",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Frisco Basic Dog T-Shirt",
        image:
          "https://image.chewy.com/is/image/catalog/153684_PT2._AC_SL1200_V1624601556_.jpg",
        price: "$12.99",
        description:
          "The cotton construction offers comfort and easy dressing and undressing.",
        categoryName: "clothes",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Frisco Sherpa Lined Fairisle Dog Sweater",
        image:
          "https://image.chewy.com/is/image/catalog/718422_MAIN._AC_SL1200_V1692380243_.jpg",
        price: "$16.99",
        description:
          "Cute pullover sweater perfect for cozying up to a snuggle by the fireplace, at home or at the ski lodge.",
        categoryName: "clothes",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Non-Skid Cable Knit Dog Socks",
        image:
          "https://image.chewy.com/is/image/catalog/272473_MAIN._AC_SL1200_V1634828479_.jpg",
        price: "$4.99",
        description:
          "Stylish, chunky knit in a neutral gray color fits into any pet’s wardrobe.",
        categoryName: "clothes",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "STAR WARS Pictogram Dog Bandana",
        image:
          "https://image.chewy.com/is/image/catalog/152703_PT2._AC_SL1200_V1631287649_.jpg",
        price: "$5.99",
        description:
          "Turn your pet into an iconic STAR WARS character with this bandana.",
        categoryName: "clothes",
        petCategory: "dog",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Frisco Basic Cat T-Shirt",
        image:
          "https://image.chewy.com/is/image/catalog/153684_PT2._AC_SL1200_V1624601556_.jpg",
        price: "$12.99",
        description:
          "The cotton construction offers comfort and easy dressing and undressing.",
        categoryName: "clothes",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Frisco Sherpa Lined Fairisle Cat Sweater",
        image:
          "https://image.chewy.com/is/image/catalog/718422_MAIN._AC_SL1200_V1692380243_.jpg",
        price: "$16.99",
        description:
          "Cute pullover sweater perfect for cozying up to a snuggle by the fireplace, at home or at the ski lodge.",
        categoryName: "clothes",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "STAR WARS Pictogram Cat Bandana",
        image:
          "https://image.chewy.com/is/image/catalog/311873_MAIN._AC_SL1200_V1643331444_.jpg",
        price: "$9.99",
        description:
          "Comfy and stylish all in one—just tie it loosely around your pet’s neck for easy on/off.",
        categoryName: "clothes",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Frisco Glow in the Dark Mystical Print Cat Bandana, X-Small/Small",
        image:
          "https://image.chewy.com/is/image/catalog/261218_PT2._AC_SL1200_V1633086982_.jpg",
        price: "$4.99",
        description:
          "Glow-in-the-dark print features classic Halloween cats, witch hats, and moons.",
        categoryName: "clothes",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Frisco Polar Bear Sweater Knit Cat Hat",
        image:
          "https://image.chewy.com/is/image/catalog/745742_MAIN._AC_SL1200_V1694793753_.jpg",
        price: "$12.99",
        description:
          "This cream-colored, cable-knit hat features polar bear ears sewn on top for some winter weather protection inspired by the North Pole.",
        categoryName: "clothes",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Frisco Magical Butterfly Wings Cat Costume",
        image:
          "https://image.chewy.com/is/image/catalog/713062_MAIN._AC_SL1200_V1689271325_.jpg",
        price: "$9.99",
        description:
          "The intricate wings feature a felt black frame with flocked texture, and iridescent polyester that produces a shiny multicolor effect.",
        categoryName: "clothes",
        petCategory: "cat",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "FURminator Long Hair Dog Deshedding Tool",
        image:
          "https://image.chewy.com/is/image/catalog/243251_MAIN._AC_SL1200_V1594389959_.jpg",
        price: "$35.25",
        description:
          "Features a stainless-steel edge that reaches beneath the long topcoat, removing undercoat and loose hair.",
        petCategory: "dog",
        categoryName: "accessories",
        inventory: {
          create: {
            quantity: 10,
          },
        },
      },
      {
        name: "Mobile Dog Gear Insulated Food Carriers Dog Car Accessories",
        image:
          "https://image.chewy.com/is/image/catalog/525454_MAIN._AC_SL1200_V1650398192_.jpg",
        price: "$29.99",
        description:
          "Spacious enough to hold a variety of foods—so don’t forget the treats!",
        petCategory: "dog",
        categoryName: "accessories",
        inventory: {
          create: {
            quantity: 15,
          },
        },
      },
      {
        name: "GoTags Anodized Aluminum Personalized Dog ID Tag",
        image:
          "https://image.chewy.com/is/image/catalog/153068_MAIN._AC_SL1200_V1619702553_.jpg",
        price: "$7.95",
        description:
          "Cut into the shape of a bone to make personal identification even more paw-sonal!",
        petCategory: "dog",
        categoryName: "accessories",
        inventory: {
          create: {
            quantity: 20,
          },
        },
      },
      {
        name: "Rechargable Cordless Shaver Trimmer Kit with Clippers for Dogs",
        image:
          "https://image.chewy.com/is/image/catalog/317705_MAIN._AC_SL1200_V1635867385_.jpg",
        price: "$35.99",
        description:
          "Works on all fur types, including curly, straight, thick, long and short.",
        petCategory: "dog",
        categoryName: "accessories",
        inventory: {
          create: {
            quantity: 12,
          },
        },
      },
      {
        name: "Adjustable Safety Tether Dog Seat Belt Travel Accessories",
        image:
          "https://image.chewy.com/is/image/catalog/616614_MAIN._AC_SL1200_V1672337771_.jpg",
        price: "$8.99",
        description:
          "Made from durable, high-quality nylon, this paw-some belt fits all vehicle makes and models.",
        petCategory: "dog",
        categoryName: "accessories",
        inventory: {
          create: {
            quantity: 8,
          },
        },
      },
      {
        name: "World's Best Unscented Clumping Corn Cat Litter",
        image:
          "https://image.chewy.com/is/image/catalog/332505_MAIN._AC_SL1200_V1632824199_.jpg",
        price: "$13.99",
        description:
          "This natural litter delivers long-lasting odor control to help keep your home smelling clean.",
        petCategory: "cat",
        categoryName: "accessories",
        inventory: {
          create: {
            quantity: 15,
          },
        },
      },
      {
        name: "sWheat Scoop Multi-Cat Unscented Natural Clumping Wheat Cat Litter",
        image:
          "https://image.chewy.com/is/image/catalog/90872_MAIN._AC_SL1200_V1634156505_.jpg",
        price: "$25.99",
        description:
          "Made without dyes, perfumes or harmful ingredients commonly found in clay litter.",
        petCategory: "cat",
        categoryName: "accessories",
        inventory: {
          create: {
            quantity: 20,
          },
        },
      },
      {
        name: "Van Ness Litter Scoop",
        image:
          "https://image.chewy.com/is/image/catalog/70490_MAIN._AC_SL1200_V1506968131_.jpg",
        price: "$1.99",
        description:
          "Ideal litter scoop for owners of small to large sized cat pans.",
        petCategory: "cat",
        categoryName: "accessories",
        inventory: {
          create: {
            quantity: 30,
          },
        },
      },
      {
        name: "Frisco Paw Shaped Cat Litter Mat",
        image:
          "https://image.chewy.com/is/image/catalog/166304_MAIN._AC_SL1200_V1572473589_.jpg",
        price: "$7.99",
        description:
          "This mat helps contain litter that spills from the litter box and keeps it on the mat to help prevent litter from being tracked around the house.",
        petCategory: "cat",
        categoryName: "accessories",
        inventory: {
          create: {
            quantity: 25,
          },
        },
      },
      {
        name: "Bundle: Seresto Flea & Tick Collar for Dogs, over 18-lbs + Flea & Tick Collar for Cats",
        image:
          "https://image.chewy.com/is/image/catalog/293838_MAIN._AC_SL1200_V1662159321_.jpg",
        price: "$121.99",
        description:
          "Starts to repel and kill fleas within 24 hours of initial application and re-infesting fleas within two hours; works on contact with no painful biting required.",
        petCategory: "cat",
        categoryName: "accessories",
        inventory: {
          create: {
            quantity: 10,
          },
        },
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
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const hashedPassword1 = await bcrypt.hash("password1", SALT_COUNT);
    const hashedPassword2 = await bcrypt.hash("password2", SALT_COUNT);
    const hashedPassword3 = await bcrypt.hash("password3", SALT_COUNT);

    await db.user.create({
      data: {
        username: "user1",
        password: hashedPassword1,
        isAdmin: true,
        profile: {
          create: {
            name: "User 1 Profile",
            email: "user1@example.com",
            phoneNumber: 123456789,
            address: "testing address 1",
          },
        },
      },
    });

    await db.user.create({
      data: {
        username: "user2",
        password: hashedPassword2,
        isAdmin: false,
        profile: {
          create: {
            name: "User 2 Profile",
            email: "user2@example.com",
            phoneNumber: 123456788,
            address: "testing address 2",
          },
        },
      },
    });

    await db.user.create({
      data: {
        username: "user3",
        password: hashedPassword3,
        isAdmin: false,
        profile: {
          create: {
            name: "User 3 Profile",
            email: "user3@example.com",
            phoneNumber: 123456787,
            address: "testing address 3",
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

seed().catch(console.error);
