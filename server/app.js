const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const jwt = require('jsonwebtoken');
const prisma = require('../server/db/client')




const cors = require('cors');
// Enable CORS for all routes
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, '../dist')))


app.use( async (req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

    try {
      if (token) {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
          where: {
            id
          }
        })
        req.user = user 
      }else {
          req.user = null
        }

      next();
    } catch (e) {
        console.log(e.message)
      if(e.name === "JsonWebTokenError"){

        req.user=null;
      }else {
        next(e);
    }
    }
   // next();
  });

  app.get("/test", (req, res, next) => {
    res.send("Test route");
  });
  
 

// TODO: Add your routers here
app.use("/auth",require('./auth'));
app.use("/api",require('./api'))

// Error handling middleware
app.use((error, req, res, next) => {
    console.log('SERVER ERROR: ', error);
    
        res.status(500);

    res.send({
        error: error.message,
        name: error.name,
        message: error.message,
        table: error.table,
    });
    next(error); 
});
// app.get('*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// })

// app.get('*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// })

// // 404 handler
// app.get('*', (req, res) => {
//     res.status(404).send({
//         error: '404 - Not Found',
//         message: 'No route found for the requested URL',
//     });
// });



module.exports = app;