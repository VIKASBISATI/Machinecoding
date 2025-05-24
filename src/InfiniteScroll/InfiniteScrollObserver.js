import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles.css';
import KeepNotes from './KeepNotes/KeepNotes';

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

if (!ACCESS_KEY) {
  console.error('Missing REACT_APP_UNSPLASH_ACCESS_KEY environment variable');
}

const InfiniteScrollObserver = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const currentPage = useRef(1);
  const observerTarget = useRef(null);

  const fetchImages = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?page=${currentPage.current}&per_page=10&client_id=${ACCESS_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (Array.isArray(data)) {
        const newLoadedImages = {};
        data.forEach(image => {
          newLoadedImages[image.id] = false;
        });
        setLoadedImages(prev => ({ ...prev, ...newLoadedImages }));
        setImages(prevImages => [...prevImages, ...data]);
        currentPage.current += 1;
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to load images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && !loading) {
      fetchImages();
    }
  }, [loading]);

  useEffect(() => {
    const element = observerTarget.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleObserver]);

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className="infinite-scroll-container">
      <h1>Infinite Scroll Gallery</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            {!loadedImages[image.id] && (
              <div className="shimmer">
                <div className="shimmer-content"></div>
              </div>
            )}
            <img
              key={`img-${image.id}`}
              src={image.urls.regular}
              alt={image.alt_description || 'Random image'}
              loading="lazy"
              onLoad={() => handleImageLoad(image.id)}
              className={`image ${loadedImages[image.id] ? 'loaded' : ''}`}
            />
          </div>
        ))}
      </div>
      <div ref={observerTarget} className="observer-target">
        {loading && <div className="loading-spinner">Loading...</div>}
      </div>
      <KeepNotes />
    </div>
  );
};

export default InfiniteScrollObserver; 