import Photo from '../types/Photo';
import { storage } from '../libs/firebase'
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage'
import { v4 as createId } from 'uuid';
import { api } from '../libs/axios';


export const getAll = () => {
    return new Promise<Photo[]>(async (resolve, reject) => {
        try
        {
            const list: Photo[] = [];
            // const imagesFolder = ref(storage, 'images');
            // const photoList = await listAll(imagesFolder);
    
            // for(const i in photoList.items) {
            //     const photoUrl = await getDownloadURL(photoList.items[i]);

            const response = await api.get('/photos');

            const photoList = response.data as Photo[];

            for(const i in photoList)
            {
                list.push({
                    name: photoList[i].name,
                    url: photoList[i].url,
                    id: photoList[i].id
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

            const formData = new FormData();
            formData.append('image', file);

            const response = await api.post('/photos', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

            const photo : Photo = response.data as Photo;

            // const newFile = ref(storage, `images/${createId()}`)
    
            // const upload = await uploadBytes(newFile, file);
            // const photoUrl = await getDownloadURL(upload.ref);
    
            resolve({
                name: photo.name,
                url: photo.url,
                id: photo.id
            } as Photo);
        }
        else {
            reject(new Error('Not allowed file type'));
        }
    })
};