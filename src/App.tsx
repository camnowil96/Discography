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
        const response = await axios.get("http://localhost:8000/get_images", {
          params: { prefix: "carousel" }  
        });
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages(); // Call the function

    return () => {}; // Empty cleanup function to satisfy TypeScript
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
