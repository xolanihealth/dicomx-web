import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setStack } from '../../../redux/dicom/actions';
import { getItem } from '../../../utility/localStorageControl';
import ViewerHeader from './components/ViewerHeader';
import ViewerMain from './components/ViewerMain';
import ViewerStudy from './components/ViewerStudy';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import dicomParser from 'dicom-parser';

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
// cornerstoneWebImageLoader.external.cornerstone = cornerstone;
// cornerstoneWebImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.Hammer = Hammer;

cornerstoneTools.init({
  showSVGCursors: true,
  mouseEnabled: true,
  touchEnabled: true,
  globalToolSyncEnabled: true,
});
cornerstoneTools.toolColors.setActiveColor('rgb(252, 236, 3)');

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
if (!cornerstoneWADOImageLoader.initialized) {
  cornerstoneWADOImageLoader.webWorkerManager.initialize({
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        usePDFJS: false,
        strict: false,
      },
    },
  });
}
const index = () => {
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  const client = axios.create({
    baseURL: 'https://xolanihealth.cloud',
    headers: {
      Authorization: `Bearer ${getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
  useEffect(() => {
    if (location?.state?.study) {
      const { imagePath } = location?.state?.study;
      if (imagePath) {
        const filename = imagePath.split('/').pop();
        client
          .get(`/download-file?path=${imagePath}&name=${filename}`, { responseType: 'blob' })
          .then((result) => {
            dispatch(
              setStack({
                imageIds: [result.data].map((file) => cornerstoneWADOImageLoader.wadouri.fileManager.add(file)),
                currentImageIndex: 0,
              }),
            );
          })
          .catch((err) => console.log(err));
      }

      let state = { ...location.state };
      delete state.study;
      history(location.pathname, { replace: true });
    }
  }, []);
  return (
    <div className="w-full flex flex-row -mt-3" style={{ height: `calc(100vh - 43px)`, backgroundColor: '#27272b' }}>
      <ViewerStudy />
      <div className="w-4/5">
        <ViewerHeader />
        <ViewerMain />
      </div>
    </div>
  );
};

export default index;
