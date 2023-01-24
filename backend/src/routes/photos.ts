import { Router, Request, Response } from 'express'
import Photo from '../entity/Photo'
import { AppDataSource } from "../data-source" 

interface PhotoRequest {
    name: string,
    url: string
}

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const photos = await AppDataSource.getMongoRepository(Photo).find();
    res.send(photos);
});

router.post('/', async (req: Request, res: Response) => {
    const photoRequest: PhotoRequest = req.body;

    if(photoRequest !== null){

        try
        {
            const photo: Photo = new Photo();
            photo.name = photoRequest.name;
            photo.url = photoRequest.url;
    
            await AppDataSource.getMongoRepository(Photo).save(photo);
    
            res.status(200).send(photo);
        }
        catch(ex)
        {
            res.status(400).send(ex);
        }
    }
});

export default router;