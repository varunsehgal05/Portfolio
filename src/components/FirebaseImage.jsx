import React, { useState, useEffect } from 'react';
import { getFirebaseImageUrl } from '../services/firebase';

/**
 * Hook to retrieve an image URL from Firebase Storage with local fallback
 */
export const useFirebaseImage = (storagePath, fallbackUrl) => {
  const [src, setSrc] = useState(fallbackUrl || storagePath);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getFirebaseImageUrl(storagePath, fallbackUrl).then((url) => {
      if (isMounted) {
        setSrc(url);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [storagePath, fallbackUrl]);

  return { src, loading };
};

/**
 * Image component that loads from Firebase Cloud Storage with instant fallback
 */
export const FirebaseImage = ({ storagePath, fallbackSrc, alt = '', className = '', ...props }) => {
  const { src } = useFirebaseImage(storagePath, fallbackSrc);
  const [hasError, setHasError] = useState(false);

  return (
    <img 
      src={hasError ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export default FirebaseImage;
