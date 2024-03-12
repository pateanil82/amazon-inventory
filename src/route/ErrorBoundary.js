import React, { useState, useEffect } from 'react';
import RuntimeError from '../pages/error/RuntimeError';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleErrors = (error, errorInfo) => {

      console.error('Error caught by error boundary:', error, errorInfo);
      setHasError(true);

    };

    window.addEventListener('error', handleErrors);

    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);


  if (hasError) {
    return <RuntimeError/>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
