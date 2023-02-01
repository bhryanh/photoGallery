import { MongoRepository } from "typeorm";
import Photo from "../entity/Photo";
import { AppDataSource } from "../data-source";

class PhotoRepository {
    private repository: MongoRepository<Photo>;

    constructor() 
    {
        this.repository = AppDataSource.getMongoRepository(Photo);
    }

    findAll = async () : Promise<Photo[] | undefined> => {
        return this.repository.find();
    };

    save = async (photo: Photo) : Promise<Photo | undefined> => {
        return this.repository.save(photo);
    };

    deleteAll = async () : Promise<void> => {
        return this.repository.clear();
    }

}

export default PhotoRepository;