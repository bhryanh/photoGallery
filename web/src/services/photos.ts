import Photo from '../types/Photo';
import { storage } from '../libs/firebase'
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage'
import { v4 as createId } from 'uuid';

export const getAll = () => {
    return new Promise<Photo[]>(async (resolve, reject) => {
        try
        {
            const list: Photo[] = [];
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

export const insert = (file: File) => {

    return new Promise<Photo | Error>(async (resolve, reject) => {
        if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){
            const newFile = ref(storage, `images/${createId()}`)
    
            const upload = await uploadBytes(newFile, file);
            const photoUrl = await getDownloadURL(upload.ref);
    
            resolve({
                name: upload.ref.name,
                url: photoUrl
            } as Photo);
        }
        else {
            reject(new Error('Not allowed file type'));
        }
    })
};