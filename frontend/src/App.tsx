import React, { useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Carousel from './components/Carousel'
import Modal from './components/Modal'
import axios from 'axios'


const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("Making API request...");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get_images`, {
          params: { prefix: "carousel" }
        });
        console.log("Raw API response:", response);
        console.log("Response data:", response.data);
        console.log("Response type:", typeof response.data);
        console.log("Is array?", Array.isArray(response.data));
        
        // Force it to be an array
        const imageArray = Array.isArray(response.data) ? response.data : 
                           (typeof response.data === 'string' ? [response.data] : []);
        console.log("Final image array:", imageArray);
        setImages(imageArray);
      } catch (error) {
        console.error("Full error object:", error);
        console.error("Error fetching images:", (error as Error).message);
        if (axios.isAxiosError(error) && error.response) {
          console.error("Error response:", error.response.data);
        }
        setImages([]);  // Set to empty array on error
      }
    };

    fetchImages(); 

    return () => {}; 
  }, []);

  return (
    <>
      <div>
        <Carousel images={images} />
      </div>
      <div>
        <Modal />
      </div>
    </>
  )
}

export default App
