import React, {useMemo} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Carousel from './components/Carousel'
import Grid from './components/AlbumGrid'
import BeeAnimation from './components/BeeAnimation'
import Modal from './components/Modal'

const images = [
  "src/CarouselPics/bey03.png",
  "src/CarouselPics/bey04.png",
  "src/CarouselPics/bey06.png",
  "src/CarouselPics/bey07.png",
  "src/CarouselPics/bey08.jpg",
  "src/CarouselPics/bey09.png",
  "src/CarouselPics/bey10.png",
  "src/CarouselPics/bey11.png",
  "src/CarouselPics/bey13.png",
  "src/CarouselPics/bey16.png",
  "src/CarouselPics/bey18.png",
  "src/CarouselPics/bey19.png",
  "src/CarouselPics/beyandblue.jpg",
  "src/CarouselPics/bey24.png"
];

const App= () => {
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
