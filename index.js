import express from 'express';
import { homeRouter } from './routes/homerouter.js';


const app = express();
const PORT = 3000;



//app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/' , homeRouter);
app.listen(PORT ,() => 
{
    console.log(`The application is running on PORT:${PORT}`);
})