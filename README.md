# Capstone Project 2023 - Fluffy Friends Pet Supply Store

<div style="text-align: justify"> 
Are you a pet owner looking for a one-stop destination for all your animal friends’ needs? Look no further than our new pet supply shop, Fluffy Friends! This site is more than just a retailer, it’s the home of a pet-loving community dedicated to helping pets live happy, healthy lives. Our user friendly interface will allow customers to seamlessly browse items by category, add to cart, complete transactions, and view and save favorite items. We also have a community page where we will showcase dogs and cats up for adoption and promote community rescues and resources. Helping our local animals find loving homes and access needed resources is very important to us.
</div>

## Key Features:
<div style="text-align: justify"> 
<ul>
<li> Registration and Account Management: Register or log in to your account with ease. Enjoy a personalized shopping experience with your saved preferences and order history.</li>
<li>Extensive Inventory: Explore a vast selection of pet supplies for sale, from pet food and accessories to toys and grooming products. Our website offers individual item listings with detailed descriptions and images, ensuring you make informed choices.</li>
<li>Efficient Search Function: Find exactly what you need in no time! Our powerful search feature allows you to filter and sort items by category, brand, price, and more.</li>
<li>Shopping Cart Management: Add and remove items to your shopping cart effortlessly. Keep track of your selections as you continue shopping.</li>
<li>Seamless Checkout: When you're ready to complete your purchase, our user-friendly checkout process makes it quick and secure.</li>
<li>User-Friendly Interface: We've designed our website with you in mind. Enjoy an intuitive and visually appealing interface that's easy to navigate.</li>
<li>User Roles: We understand that different users have unique needs. With our role-based authorizations, you can customize the user experience:
    - User: Shop, manage your profile, and make purchases.
    - Administrator: Manage inventory, user accounts, and website content.
</ul>
</div>

## Stretch Goal Features:
<div style="text-align: justify"> 
<ul>
<li>Pets for Adoption: Not only can you shop for supplies, but you can also explore adorable pets looking for a loving home. Connect with local shelters and rescue organizations through our platform.</li>
<li>Discounts and Memberships: Unlock exclusive discounts and membership benefits to save on your favorite pet products.</li>
<li>Employee Access: If you're an employee, our platform offers a designated portal for you to manage inventory, assist customers, and streamline operations.</li>
<li>About/Information: Learn more about our commitment to pets, our mission, and how we support the pet community.</li>
</ul>
</div>

## Please see our database model below for reference:
![image](https://github.com/jnaegibbs/Capstone-Project/assets/135480996/5868c811-dfed-40b3-b202-1f2c47d3a646)

## Getting Started

1. Make a new repository using this template
2. Add your teammates as collaborators on the repository
3. Clone your repository locally
4. Run `npm install` to install all the dependencies
5. Setup your `.env` file locally - you can use the `.env.example` as a guideline. In particular, you will need to setup `PORT` and `DATABASE_URL` environment variables. But you may as well at a `JWT_SECRET` while you're in there.
6. Run `npm run dev` to run locally


### Starting the App

Start just the server (great while only working on API endpoints)
```
npm run server:dev
```

For starting the full-stack application - the server will restart whenever changes are made in the `server` directory, and the React app will rebuild whenever changes are made in the `client` directory.

```
npm run dev
```

### Running Tests

This will run Jest with verbose output enabled:
```
npm run test
```

If you want Jest to continually run as files are changed, you can call:
```
npm run test -- --watch
```

Or if you want Jest to continually run all tests when files change:
```
npm run test -- --watchAll
```

### Seed the Database

This will run the `server/db/seed.js` file:
```
npm run seed
```

### Deploying the App

You will need to create a Database in your hosting provider of choice (Render or Heroku both work well, but only Render is free).

Once you have a Database URL setup, you will need to setup your Environment Variables to include your Database URL, as well as any other app secrets needed (eg. JWT secret, Client ID and Secret for OAuth, etc)

Whichever provider you use, you will need to set the following settings:

**Build Command:** `npm install && npm run seed && npm run build`
**Start Command:** `npm start`

## Basic File Structure
```
.
├── client/
├── dist (ignored by git)
├── mocks/
├── node_modules (ignored by git)
├── prisma/
├── server/
├── .gitignore
├── index.html
├── jest.config.js
├── package.json
├── README.md
└── vite.config.js
```

### Client Files

```
.
├── client/
│   ├── components/
│   │   ├── __tests__/
│   │   │   └── MyComponent.test.js
│   │   ├── MyComponent.jsx
│   │   ├── ... (etc, with as many nested folders as needed to keep organized)
│   │   └── profile/
│   │       ├── Profile.jsx
│   │       ├── ProfileImage.jsx
│   │       └── ProfileHeader.jsx
│   ├── app/
│   │   └── store.js
│   ├── features/
│   │   ├── api/
│   │   │   └── apiSlice.js
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   └── counter/
│   │       └── counterSlice.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
```

### Server Files

```
.
├── server/
│   ├── __tests__/
│   │   └── app.test.js
│   ├── api/
│   │   ├── __tests__/
│   │   │   └── user.test.js
│   │   ├── index.js
│   │   ├── user.js
│   │   └── // ... (etc, with nested folders for sub-routes as needed to keep organized)
│   ├── auth/
│   │   ├── __tests__/
│   │   │   └── auth.test.js
│   │   └── index.js (used for authenticating with your app)
│   ├── db/
│   │   ├── client.js
│   │   ├── seed.js
│   │   └── // ... (optionally, add files / sub-folders with helper methods for accessing the DB with Prisma)
│   ├── app.js (configure the app)
│   └── index.js (start the app)
```
## Basic File Structure
