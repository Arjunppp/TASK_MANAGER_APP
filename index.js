import express from 'express';
import { homeRouter } from './routes/homerouter.js';
import { databaseConnection } from './connection.js';
import path from 'path';
import { fileURLToPath } from 'url';    
import 'dotenv/config';
import { userRouter } from './routes/userRouter.js';


const app = express();
const PORT = 3000;

const DB_URL = process.env.MONGO_URI;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


await databaseConnection(DB_URL);

//app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/' , homeRouter);
app.use('/userpage' , userRouter);


app.listen(PORT ,() => 
{
    console.log(`The application is running on PORT:${PORT}`);
})