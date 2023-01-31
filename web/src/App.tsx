import React, { useState, useEffect } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import Photo from './types/Photo';
import { PhotoItem } from './components/PhotoItem';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
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
  }, []);

  const handleFormSubmit = async (evt : React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const file = formData.get('image') as File;

    if(file && file.size > 0){
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
  };

  return (
    <C.Container>
      <ToastContainer theme='dark'  autoClose={1000}/>
      <C.Area>
        <C.Header>Photo Gallery</C.Header>

        <C.UploadForm method='POST' onSubmit={handleFormSubmit}>
            <input type="file" name='image' />
            <input type="submit" value='Send' />
        </C.UploadForm>

        {photos.length > 0 &&
            <C.PhotoList>
              {photos.map((item, index) => (
                <PhotoItem key={index} url={item.url}  name={item.name}/>
              ))}
            </C.PhotoList>
        }

      {photos.length === 0 &&
        <C.ScreenWarning>
            <div className='emoji'>:/</div>
            <div>There is no photo in the bucket</div>
        </C.ScreenWarning>}
      </C.Area>
    </C.Container>
  );
}

export default App;
