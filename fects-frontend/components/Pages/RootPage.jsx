"use client"

import React, { useState, useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import styles from "../../styles/module/album.module.css"
import { ImageLoading } from '../Loading/Loading'

const RootPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [image, setImage] = useState([])
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")

    const handleClick = () => {
        alert('Button clicked!');
    };

    const handleSearch = (term) => {
        console.log('Searching for:', term);
        setSearchResults([`Result for "${term}"`]);
    };

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
            setError('');
        } catch (error) {
            setLoading(true)
            console.error('Error fetching images:', error);
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getRandomImages()
    }, [])


    return (
        <>
            {/* <button onClick={handleClick} className="Btn_Create_Contest"> CREATE YOUR<br />OWN<br />CONTEST</button> */}
            <SearchBar onSearch={handleSearch} />
            <div className={styles.ImageContainer}>
                {loading ? (
                    Array.from({ length: 12 }).map((_, index) => (
                        <ImageLoading key={index} />
                    ))
                ) : (
                    image.map((imgUrl, index) => (
                        <div key={index} className={styles.imgBox}>
                            <img src={imgUrl} className={styles.Img} alt='contest-image' />
                        </div>
                    ))

                )}

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

        </>

    )
}

export default RootPage;