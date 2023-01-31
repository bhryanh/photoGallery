import Photo from '../types/Photo';
import { storage } from '../libs/firebase'
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage'
import { v4 as createId } from 'uuid';

export const getAll = () => {
    const list: Photo[] = [];
    return new Promise<Photo[]>(async (resolve, reject) => {
        try
        {
            const imagesFolder = ref(storage, 'images');
            const photoList = await listAll(imagesFolder);
    
            for(const i in photoList.items) {
                const photoUrl = await getDownloadURL(photoList.items[i]);
        
                list.push({
                    name: photoList.items[i].name,
                    url: photoUrl
                });
            }
            resolve(list);
        }
        catch(ex)
        {
            reject(ex);
        }
    });
};

export const insert = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){
        const newFile = ref(storage, `images/${createId()}`)

        const upload = await uploadBytes(newFile, file);
        const photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo
    }
    else {
        return new Error('Not allowed file type');
    }
};