import { AppDataSource } from "./data-source"
import express from 'express';
import PhotoRoutes from './routes/photos';
import * as dotenv from 'dotenv';
import cors from 'cors';



AppDataSource.initialize().then(async () => {

    const corsOptions = {
        origin: "http://localhost:3001",
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      };

    dotenv.config();
    const app = express();
    const port: number  = 3000;

    app.use(express.json());
    app.use(cors(corsOptions));

    app.use('/photos', PhotoRoutes);

    app.listen(port, () => {
        console.log(`Listen on port ${port}`);
    });


}).catch(error => console.log(error))