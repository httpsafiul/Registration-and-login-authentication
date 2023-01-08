import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import web from './routes/web.js'
import connectDb from "./databases/connectDb.js";
const app = express();
const port = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL


// Dtatbase Connection
connectDb(DATABASE_URL);

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}));

//Load Routes
app.use('/', web)

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})