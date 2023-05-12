import React, { useEffect, useRef } from 'react';

const useViewer = () => {
  const viewerRef = useRef();

  const sayHello = () => console.log(viewerRef.current);
  return { sayHello, viewerRef };
};

export default useViewer;
