import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';


const app = express();
import indexRoutes  from './routes/index';
import productRoutes  from './routes/product.routes';
import saleRoutes from './routes/sale.routes';
import userRoutes from "./routes/user.routes";
import loginRoutes  from "./routes/login.routes";
import findAllRoutes from "./routes/findAll.routes";

//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes
app.use('/api', indexRoutes)
app.use('/api', productRoutes)
app.use('/api', saleRoutes)
app.use('/api', saleRoutes)
app.use('/api', userRoutes)
app.use('/api', loginRoutes)
app.use('/api', findAllRoutes)





//this folder for this app will be used to store public files
app.use('/uploads', express.static(path.resolve('uploads')));


export default app;

