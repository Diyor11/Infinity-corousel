import { useState, useRef, useEffect, useMemo } from 'react'
import './App.css'

import Img1 from '../../new-app/src/assets/images/banner1.webp'
import Img2 from '../../new-app/src/assets/images/banner2.webp'
import Img3 from '../../new-app/src/assets/images/banner3.webp'
import Img4 from '../../new-app/src/assets/images/banner4.webp'
import Img5 from '../../new-app/src/assets/images/banner5.webp'
import Img6 from '../../new-app/src/assets/images/banner6.webp'

import useElementWidth from './hooks/useClientWidth'

const sliders: string[] = [
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
]

function App() {
  const [slides] = useState<string[]>(sliders)
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  const [containerRef, {width}] = useElementWidth()
  const [tranistion, setTransition] = useState<string>('0s')

  const wrapperWidth = useMemo(() => width * (slides.length + 2), [slides, width])
  const translateWrapper = useMemo(() => width * currentIndex, [width, currentIndex])

  const nextSlide = (): void => {
    if(currentIndex >= slides.length) {
      setTimeout(() => {
        setTransition('0s')
        setCurrentIndex(1)
      }, 300)
    }
    setTransition('.3s')
    setCurrentIndex(p => ++p)
  }

  const prevtSlide = (): void => {
    if(currentIndex === 1) {
      setTimeout(() => {
        setTransition('0s')
        setCurrentIndex(6)
      }, 300)
    }

    setTransition('.3s')
    setCurrentIndex(p => --p)
  }

  return (
    <div className="app">
      <header></header>
      <div className="hero">
        <div className="container">
          <div className="corousel" ref={containerRef}>
            <div className="corusel-wrapper" 
              style={{
                width: wrapperWidth + 'px', 
                transform: `translateX(${-translateWrapper + 'px'})`,
                transitionDuration: tranistion,
              }} 
            >
                <div className="corousel-slide last-clone" style={{width: width + 'px'}}>
                    <img src={slides[slides.length -1]} alt="slide" draggable='false' />
                </div>
                {slides.map((img, i) => (
                  <div className="corousel-slide" style={{width: width + 'px'}} key={i}>
                    <img src={img} alt="slide" draggable='false' />
                  </div>
                ))}
                <div className="corousel-slide first-clone" style={{width: width + 'px'}}>
                    <img src={slides[0]} alt="slide" draggable='false' />
                </div>
            </div>
            <button onClick={prevtSlide} className="action-button prev">Prev</button>
            <button onClick={nextSlide} className="action-button next">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
