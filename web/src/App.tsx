import React, { useState, useEffect } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import Photo from './types/Photo';
import { PhotoItem } from './components/PhotoItem';

function App() {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, []);

  const handleFormSubmit = async (evt : React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const file = formData.get('image') as File;

    if(file && file.size > 0){
      setUploading(true);
      const result = await Photos.insert(file);
      setUploading(false);

      if(result instanceof Error){
        alert(`${result.name} - ${result.message}`)
      }
      else {
        setPhotos([...photos, result]);
      }
    }
  };

  return (
    <C.Container>
      <C.Area>
        <C.Header>Photo Gallery</C.Header>
        
        {loading &&
        <C.ScreenWarning>
            <div className='emoji'>🤚</div>
            <div>Loading...</div>
        </C.ScreenWarning>}

        <C.UploadForm method='POST' onSubmit={handleFormSubmit}>
            <input type="file" name='image' />
            <input type="submit" value='Send' />
            {uploading && 'Uploading image...'}
        </C.UploadForm>

        {!loading && photos.length > 0 &&
            <C.PhotoList>
              {photos.map((item, index) => (
                <PhotoItem key={index} url={item.url}  name={item.name}/>
              ))}
            </C.PhotoList>
        }

      {!loading && photos.length === 0 &&
        <C.ScreenWarning>
            <div className='emoji'>:/</div>
            <div>There is no photo in the bucket</div>
        </C.ScreenWarning>}
      </C.Area>
    </C.Container>
  );
}

export default App;
