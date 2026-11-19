import React, { useState, useEffect } from 'react';
import { getFirebaseImageUrl } from '../services/firebase';

/**
 * Hook to retrieve an image URL from Firebase Storage with local fallback
 */
export const useFirebaseImage = (storagePath, fallbackUrl) => {
  const [src, setSrc] = useState(fallbackUrl || storagePath);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!storagePath) {
      setSrc(fallbackUrl);
      return;
    }
    getFirebaseImageUrl(storagePath, fallbackUrl)
      .then((url) => {
        if (isMounted) {
          setSrc(url || fallbackUrl);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSrc(fallbackUrl);
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
export const FirebaseImage = ({ storagePath, fallbackSrc, alt = '', className = '', onError, ...props }) => {
  const { src } = useFirebaseImage(storagePath, fallbackSrc);
  const [hasError, setHasError] = useState(false);

  return (
    <img 
      src={hasError ? fallbackSrc : (src || fallbackSrc)}
      alt={alt}
      className={className}
      onError={(e) => {
        if (!hasError && fallbackSrc) {
          setHasError(true);
        } else if (onError) {
          onError(e);
        }
      }}
      {...props}
    />
  );
};

export default FirebaseImage;
