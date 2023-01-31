import React, { useEffect } from 'react';
import * as C from './App.styles';
import { PhotoItem } from './components/PhotoItem';
import { ToastContainer } from 'react-toastify';
import usePhoto from './hooks/usePhoto';

function App() {

  const { photos, getPhotos, uploadPhoto } = usePhoto();

  useEffect(() => {
    getPhotos();
  }, [])

  const handleFormSubmit = async (evt : React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const file = formData.get('image') as File;

    if(file && file.size > 0){
      uploadPhoto(file);
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
