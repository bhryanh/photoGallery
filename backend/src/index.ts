import { AppDataSource } from "./data-source"
import express from 'express';
import PhotoRoutes from './routes/photos'

AppDataSource.initialize().then(async () => {

    const app = express();
    const port: number  = 3000;

    app.use(express.json());

    app.use('/photos', PhotoRoutes);

    app.listen(port, () => {
        console.log(`Listen on port ${port}`);
    });


}).catch(error => console.log(error))
