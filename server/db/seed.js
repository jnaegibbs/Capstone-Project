const db = require("../db/client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 5;

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");

    const categories = [
      { categoryName: "toy", petCategory: "dog" },
      { categoryName: "toy", petCategory: "cat" },
      { categoryName: "toy", petCategory: "smallPet" },
      { categoryName: "food", petCategory: "dog" },
      { categoryName: "food", petCategory: "cat" },
      { categoryName: "food", petCategory: "smallPet" },
      { categoryName: "clothes", petCategory: "dog" },
      { categoryName: "clothes", petCategory: "cat" },
      { categoryName: "clothes", petCategory: "smallPet" },
      { categoryName: "accessories", petCategory: "dog" },
      { categoryName: "accessories", petCategory: "cat" },
      { categoryName: "accessories", petCategory: "smallPet" }
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
      {
        name: 'Pasture Plus + Adult Rabbit Food',
        image: 'https://exoticnutrition.com/cdn/shop/files/AdultRabbitFood_1.jpg?v=1691079258',
        price: '12.99',
        description: 'Pasture Plus+ Adult Rabbit Food provides optimal nutrition for adult rabbits (12 months and older); supplements are not necessary.',
        petCategory: 'smallPet',
        categoryName: 'food',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Timothy Twists',
        image: 'https://exoticnutrition.com/cdn/shop/files/TimothyTwistsFront1.jpg?v=1694550930&width=600',
        price: '$6.99',
        description: 'All-natural blend of premium Timothy Hays, these chew treats provide essential fiber for excellent digestive health and healthy chompers!',
        petCategory: 'smallPet',
        categoryName: 'food',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Timothy Hay Cubes',
        image: 'https://exoticnutrition.com/cdn/shop/files/TimothyHayCubesFront1.jpg?v=1690985800&width=600',
        price: '$4.79',
        description: 'Exotic Nutrition Timothy Hay Cubes are a natural, low-fat, low calcium treat.',
        petCategory: 'smallPet',
        categoryName: 'food',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Herbivore Healthy Treat',
        image: 'https://exoticnutrition.com/cdn/shop/files/HerbivoreTreat3oz_1.jpg?v=1691071153',
        price: '$3.99',
        description: 'This nutritious mix of sweet potatoes, carrots, green peas, oats, and rose petals will quickly become your a favorite snack',
        petCategory: 'smallPet',
        categoryName: 'food',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Pro Nail Trimmer',
        image: 'https://exoticnutrition.com/cdn/shop/products/Nail-Trimmer-1.jpg?v=1685121319',
        price: '$5.99',
        description: ' The trimmer is 4 inches long, the perfect size for quick, precise cuts to make nail trimming easier than ever before',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Munchers Carrot Crunchers',
        image: 'https://exoticnutrition.com/cdn/shop/files/CarrotCrunchersFront2.jpg?v=1691070615&width=600',
        price: '$6.99',
        description: 'These ready-to-feed treats are made with one single ingredient...high-quality, all-natural carrot!',
        petCategory: 'smallPet',
        categoryName: 'food',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'ZooPro Carry Bag',
        image: 'https://exoticnutrition.com/cdn/shop/products/ZooPro-Carry-Bag-Small-2.jpg?v=1685121701',
        price: '$19.99',
        description: 'Exotic Nutrition ZooPro Pet Carrier provides easy transport for many types of small pets.',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Crystal Clear Water Bottle',
        image: 'https://exoticnutrition.com/cdn/shop/files/PlasticWaterBottle3.jpg?v=1695408057&width=600',
        price: '$4.99',
        description: 'Thirsty critters can drink their fill with the Exotic Nutrition Crystal Clear Water Bottle.',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Hedgie Jingle Ball',
        image: 'https://exoticnutrition.com/cdn/shop/files/HedgieJingleBall_1.jpg?v=1694010206&width=600',
        price: '$6.99',
        description: 'Rolling, pushing and tapping, your Hedgie will spend hours working this little toy around his/her cage',
        petCategory: 'smallPet',
        categoryName: 'toy',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Press and Slide Feeding Station',
        image: 'https://exoticnutrition.com/cdn/shop/products/Press-N-Slide-Feed-Station-2.jpg?v=1685121327',
        price: '$10.99',
        description: 'Exotic Nutrition Press and Slide Feeding Station design makes feeding incredibly easy.',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Casablanca Cage',
        image: 'https://exoticnutrition.com/cdn/shop/files/CasablancaCageFrontView1.jpg?v=1692383830&width=600',
        price: '$119.99',
        description: 'Comfort, safety, and convenient cleaning with Exotic Nutrition Casablanca Cage',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Crazy Legs Toy',
        image: 'https://exoticnutrition.com/cdn/shop/files/CustomerPhoto-CrazyLegs_3.jpg?v=1693578009',
        price: '$4.99',
        description: 'Exotic Nutrition Crazy Legs Toy is an interactive cage accessory for all pets.',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Aspen Bedding',
        image: 'https://exoticnutrition.com/cdn/shop/files/91HlA6eOPIS.jpg?v=1698166742&width=600',
        price: '$13.99',
        description: 'Keep your pet home neat and fresh with natural paper fibers to quickly absorb moisture!',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Yogu Drops',
        image: 'https://exoticnutrition.com/cdn/shop/files/YoguDrops5.5oz_1.jpg?v=1690486387&width=600',
        price: '$5.99',
        description: 'Watch as your pet goes wild for the sweet and savory flavor of Yogu Drops!',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Silent Runner 12 in (Regular)',
        image: 'https://exoticnutrition.com/cdn/shop/files/SilentRunnerOrangeFront2.jpg?v=1691591558&width=600',
        price: '25.99',
        description: 'This innovative wheel is specifically designed for sugar gliders, Syrian hamsters, female rats* and similar-sized animals.',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Kritter Krawler 7" (Small)',
        image: 'https://exoticnutrition.com/cdn/shop/products/Kaytee-Run-About-7--Exercise-Ball-1.jpg?v=1685121150',
        price: '7.99',
        description: 'The Kaytee Run-About Ball is an interactive exercise toy that provides healthy activity for Hamsters, Gerbils, Sugar Gliders and other small animals.',
        petCategory: 'smallPet',
        categoryName: 'toy',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Natural Fun Balls 6 Pack',
        image: 'https://exoticnutrition.com/cdn/shop/files/NaturalFunBallsFront4.jpg?v=1700246971&width=600',
        price: '$13.99',
        description: 'his NativeCritter Natural Fun Balls 6 Pack is specially designed to meet the instinctual needs of small pets.',
        petCategory: 'smallPet',
        categoryName: 'toy',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Oxbow Essentials Regal Rat Adult Rat Food',
        image: 'https://image.chewy.com/is/image/catalog/96010_MAIN._AC_SL1200_V1661824198_.jpg',
        price: '$12.99',
        description: 'This is a nutritionally balanced feed, designed to increase the longevity and well-being of the pet rat.',
        petCategory: 'smallPet',
        categoryName: 'food',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'TRIXIE Suspension Bridge Small Pet Hammock',
        image: 'https://image.chewy.com/is/image/catalog/269199_MAIN._AC_SL1200_V1668637514_.jpg',
        price: '$9.99',
        description: 'The perfect accessory for resting, exercising or to simply keep your pet entertained.',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Vitakraft Mini Pops 100% Real Corn Cob Small Pet Treat, 6-oz bag',
        image: 'https://image.chewy.com/is/image/catalog/155078_MAIN._AC_SL1200_V1666651750_.jpg',
        price: '$5.99',
        description: 'All-natural treats made with 1 single, wholesome and nutritious ingredient for your small pet.',
        petCategory: 'smallPet',
        categoryName: 'food',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Imperial Cat Play and Shapes Cheese Small Animal Hideout',
        image: 'https://image.chewy.com/is/image/catalog/138504_MAIN._AC_SL1200_V1506525957_.jpg',
        price: '7.99',
        description: 'Helps prevent cage chewing and beat boredom by providing a safe, totally gnawable toy.',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Zilla Tropical Vertical Starter Kit with Mini Halogen Lighting',
        image: 'https://image.chewy.com/is/image/catalog/159210_MAIN._AC_SL1200_V1624393364_.jpg',
        price: '$109.99',
        description: 'This starter kit is perfect for a first-time small reptile parent and comes with an easy-to-use setup guide.',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'REPTI ZOO 40-gal Full Glass Reptile Terrarium, Black',
        image: 'https://image.chewy.com/is/image/catalog/839574_MAIN._AC_SL1200_V1682003332_.jpg',
        price: '$189.99',
        description: 'Give your scaly friend a cozy home of his own with REPTIZOO 40-gal Full Glass Reptile Terrarium',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
      },
      {
        name: 'Exo Terra Faunarium Terrarium',
        image: 'https://image.chewy.com/is/image/catalog/164485_MAIN._AC_SL1200_V1554409638_.jpg',
        price: '$9.49',
        description: 'Exo Terra Faunarium Terrarium provides the perfect place to carry your reptiles, amphibians, mice, arachnids or insects.',
        petCategory: 'smallPet',
        categoryName: 'accessories',
        inventory: {
            create: {
              quantity: 10,
            },
        }
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
        cart: {
          create: {
            cartItem: {
              create: {
              quantity: 1, 
              productId: 1, 
              }
            }
          }
        }
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
        cart: {
          create: {}
        }
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
        cart: {
          create: {}
        }
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
