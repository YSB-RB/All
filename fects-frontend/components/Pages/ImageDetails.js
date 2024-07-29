"use client"

import React, { useState, useEffect, useRef } from 'react';
import styles from "../../styles/module/ImageSlider.module.css"
import { FaArrowLeft, FaInfo, FaAngleLeft, FaArrowRight, FaAngleRight, FaPause, FaPlay } from 'react-icons/fa';
import InfoButton from '../Button/InfoButton';


const ImageDetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(true);
  const [images, setImage] = useState([])
  const [loading, setLoading] = useState("")
  const thumbnailRef = useRef(null);


  const getRandomImages = async () => {
    const accessKey = 'QjdKi-nvmbbtDHpwO9nupDlSWj-gAUJL5VJ_vqzBlU0';
    const count = 40;
    setLoading(true)
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`);
      // const response = await fetch("http://localhost:8080/v1/api/contest/")
      if (response.status === 403) {
        throw new Error('Rate Limit Exceeded');
      }
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      console.log(data, "Data")
      const urls = data.map(image => image.urls.raw);
      setImage(urls);
    } catch (error) {
      setLoading(true)
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getRandomImages()
  }, [])

  const PrevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const NextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }


  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        NextSlide();
      }, 3000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, isRunning]);

  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };


  const scrollThumbnails = (direction) => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({
        left: direction === 'left' ? -100 : 100,
        behavior: 'smooth'
      });
    }
  };


  const renderThumbnails = () => {
    const startIndex = currentIndex >= 7 ? currentIndex - 7 : 0;
    const visibleThumbnails = images.slice(startIndex, startIndex + 7);

    return visibleThumbnails.map((image, index) => (
      <img
        key={startIndex + index}
        src={image}
        alt={`Thumbnail ${startIndex + index}`}
        className={`${styles.thumbnail} ${currentIndex === startIndex + index ? styles.active : ''}`}
        onClick={() => goToSlide(startIndex + index)}
      />
    ));
  };


  return (
    <div className={styles.slider}>
      <InfoButton text={<FaInfo size={15} />} className='fixed right-[60px] top-[10px]' />
      <InfoButton text="Rate" className='fixed right-[60px] top-[70px]' />
      <div
        className={styles.slide}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            className={styles.Img}
            key={index}
            src={image}
            alt={`Slide ${index}`}
          />
        ))}
      </div>
      <div>
        <button className={styles.prev} onClick={PrevSlide}><FaAngleLeft size={35} /></button>
        <button className={styles.next} onClick={NextSlide}><FaAngleRight size={35} /></button>
        <button className={styles.pause} onClick={toggleRunning}>{isRunning ? <FaPause size={20} /> : <FaPlay size={20} />}</button>
      </div>
      <a href="javascript:void(0)" className="control_toggle"></a>
      <div className="gallery_post_controls">
        <a href="javascript:history.back()" className="gallery_post_close"></a>
        <div onClick={NextSlide} className="fright"><a href="javascript:void(0);"></a></div>
        <div onClick={PrevSlide} className="fleft"><a href="javascript:void(0);"></a></div>
      </div>

      {/* Thumbnail Slider Starts */}
      {currentIndex > 0 && (
        <button className={styles.thumbnailPrev} onClick={PrevSlide}><FaArrowLeft /></button>
      )}
      <div className={styles.thumbnailSlider}>
        {renderThumbnails()}
      </div>
      {currentIndex < images.length - 1 && (
        <button className={styles.thumbnailNext} onClick={NextSlide}><FaArrowRight /></button>
      )}
    </div>
  )
}

export default ImageDetails;