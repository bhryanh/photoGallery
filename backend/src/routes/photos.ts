import { Router, Request, Response } from 'express'
import Photo from '../entity/Photo'
import PhotoRepository from '../repository/photos'
import S3Utils from '../services/S3Utils';
import multer from 'multer';

const router: Router = Router();
const repository: PhotoRepository = new PhotoRepository();
const S3: S3Utils = new S3Utils();
const upload = multer();

router.get('/', async (req: Request, res: Response) => {
    const photos = await repository.findAll();
    res.send(photos);
});

router.delete('/', async (req: Request, res: Response) => {
    await repository.deleteAll();
    res.send('All registers deleted');
});

router.post('/', upload.single("image"), async (req: Request, res: Response) => {

    if(req.body !== null){
        try
        {
            const name = req.file.originalname;
            const { id, url } = await S3.uploadFile(req.file.buffer);

            const photo: Photo = {
                id : id,
                name: name,
                url: url
            }

            const photoSaved = await repository.save(photo);

            res.send(photoSaved);
        }
        catch(ex)
        {
            res.status(400).send(ex);
        }
    }
});

export default router;
