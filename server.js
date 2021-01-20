const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

//init bodyparser middleware
app.use(express.json({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept", "Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
    next();
  });

app.get('/', (req, res) => res.send('api running'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
