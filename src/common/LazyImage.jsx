import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const LazyImage = ({ src, alt }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Effect to handle when the image is in view and start loading
  useEffect(() => {
    if (inView && !loaded) {
      // Create an image element to preload the image
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [inView, src, loaded]);

  return (
    <div>
      {!loaded && !error && (
        <img
          alt="Loading placeholder"
          style={{ position: 'absolute', top: 0, left: 0, width: '300', height: '200', zIndex: 1 }}
          src={"/loadingimg.jpg"}
        />
      )}
      <img
        ref={ref}
        src={loaded ? src : undefined}
        alt={alt}
     
        style={{ width: '100%', height: '100%', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
    </div>
  );

};