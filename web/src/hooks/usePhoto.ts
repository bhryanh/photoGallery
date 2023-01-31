import { useState } from 'react';
import Photo from '../types/Photo';
import * as Photos from '../services/photos';
import { toast } from 'react-toastify';

const usePhoto = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    
    const getPhotos = () : void => {
        toast.promise(Photos.getAll(), {
            pending: {
              render: () => 'Getting Photos from Bucket'
            },
            success: {
              render: res => {
                setPhotos(res.data as Photo[]);
                return 'Photos Loaded'
              }
            },
            error: {
              render: rej => {
                console.log(rej.data);
                return 'error';
              }
            }
        })
    };

    const uploadPhoto = (file: File) : void => {
        toast.promise(Photos.insert(file), {
            pending: 'Uploading Photo to Bucket',
            success: {
              render: res => {
                  setPhotos([...photos, res.data as Photo]);
                  return 'Photo Uploaded';
                  }
            },
            error: {
              render: rej => {
                const error: Error = rej.data as Error;
                return `${error.name} - ${error.message}`
              }
            }
          })
    }

    return {
        photos,
        getPhotos,
        uploadPhoto
    }
};

export default usePhoto;