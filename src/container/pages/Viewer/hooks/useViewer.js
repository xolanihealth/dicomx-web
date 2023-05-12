import React, { useEffect, useRef } from 'react';

const useViewer = () => {
  const viewerRef = useRef(null);
  useEffect(() => {
    if (viewerRef.current) {
      console.log(viewerRef.current?.querySelector('#cornerstone-element'));
    }
  }, []);

  const sayHello = () => console.log(viewerRef);

  return { sayHello, viewerRef };
};

export default useViewer;
