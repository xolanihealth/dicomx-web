import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { useDispatch } from 'react-redux';
import { setEnabledElement, setStack, setViewPort } from '../../../../redux/dicom/actions';
import { setDrawer, setDrawerChildren } from '../../../../redux/globals/actions';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Reports from '../components/ViewerReports';
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

const useViewer = () => {
  const csElementRef = useRef(null);
  const prevStack = useRef(null);
  const dispatch = useDispatch();
  const { stack, viewPort, enabledElement } = useSelector((state) => state.dicom);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let selectedTool = [];

  const sayHello = () => console.log(csElementRef);

  useEffect(() => {
    if (csElementRef.current) {
      const onImageRendered = () => {
        const element = cornerstone.getViewport(csElementRef.current);

        setWindowWidth(element.voi.windowWidth);
        dispatch(setEnabledElement(csElementRef.current));
        dispatch(setViewPort(element));
      };

      const onNewImage = () => {
        const enabledElement = cornerstone.getEnabledElement(csElementRef.current);
        dispatch(setEnabledElement(csElementRef.current));
        dispatch(setStack(stack));
      };

      const onWindowResize = () => {
        cornerstone.resize(csElementRef.current);
      };

      const onRemoveAnnotation = (event) => {
        // Check if the delete key was pressed and if an annotation is selected
        if (event.key === 'Delete' && cornerstoneTools.getToolForElement(element, 'ArrowAnnotate').currentHandle) {
          // Remove the selected annotation from the enabled element
          cornerstoneTools.removeToolState(
            element,
            'ArrowAnnotate',
            cornerstoneTools.getToolForElement(element, 'ArrowAnnotate').currentHandle.toolState,
          );
          cornerstone.updateImage(element);
        }
      };

      const element = csElementRef.current;
      cornerstone.enable(element);
      stack?.imageIds?.length &&
        cornerstone.loadImage(stack.imageIds[0]).then((image) => {
          cornerstone.displayImage(element, image);

          cornerstoneTools.addStackStateManager(element, ['stack']);
          cornerstoneTools.addToolState(element, 'stack', stack);
        });

      element.addEventListener('keydown', onRemoveAnnotation);

      element.addEventListener('cornerstoneimagerendered', onImageRendered);
      element.addEventListener('cornerstonenewimage', onNewImage);
      window.addEventListener('resize', onWindowResize);

      return () => {
        element.removeEventListener('keydown', onRemoveAnnotation);
        element.removeEventListener('cornerstoneimagerendered', onImageRendered);
        element.removeEventListener('cornerstonenewimage', onNewImage);
        window.removeEventListener('resize', onWindowResize);
        // cornerstone.disable(element);
      };
    }
  }, [csElementRef, stack]);

  useEffect(() => {
    if (prevStack.current !== null && element.current !== null) {
      const stackData = cornerstoneTools.getToolState(element.current, 'stack');
      const stk = stackData.data[0];
      stk.currentImageIdIndex = prevStack.current.currentImageIdIndex;
      stk.imageIds = prevStack.current.imageIds;
      cornerstoneTools.addToolState(element.current, 'stack', stk);
    }
  }, [prevStack.current]);

  const addCsTool = (toolName) => {
    selectedTool.push(toolName);

    const apiTool = cornerstoneTools[`${toolName}Tool`];

    cornerstoneTools.addTool(apiTool);
    cornerstoneTools.setToolActive(toolName, {
      mouseButtonMask: 1,
    });
  };

  const addTextTool = () => {
    const TextMarkerTool = cornerstoneTools.TextMarkerTool;
    selectedTool.push('TextMarker');

    // set up the markers configuration
    const configuration = {
      markers: ['text1', 'text2', 'text3', 'text4', 'text5'],
      current: 'text1',
      ascending: true,
      loop: true,
    };

    cornerstoneTools.addTool(TextMarkerTool, { configuration });
    cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 });
  };

  const reset = () => {
    cornerstone.reset(enabledElement);
    selectedTool.forEach((tool) => {
      cornerstoneTools.clearToolState(enabledElement, tool);
    });
  };

  const onSelectPreset = (type) => {
    if (enabledElement) {
      if (type == 'tissue') {
        viewPort.voi.windowWidth = 400;
        let newWindowWidth = windowWidth / 2;
        viewPort.voi.windowCenter = newWindowWidth - 20;
        cornerstone.setViewport(enabledElement, viewPort);
      }

      if (type == 'bone') {
        viewPort.voi.windowWidth = 2000;
        let newWindowWidth = windowWidth / 2;
        viewPort.voi.windowCenter = newWindowWidth - 300;
        cornerstone.setViewport(enabledElement, viewPort);
      }

      if (type == 'lung') {
        viewPort.voi.windowWidth = 1600;
        let newWindowWidth = windowWidth / 2;
        viewPort.voi.windowCenter = newWindowWidth - 600;
        cornerstone.setViewport(enabledElement, viewPort);
      }

      if (type == 'brain') {
        viewPort.voi.windowWidth = 80;
        let newWindowWidth = windowWidth / 2;
        viewPort.voi.windowCenter = newWindowWidth - 40;
        cornerstone.setViewport(enabledElement, viewPort);
      }

      if (type == 'abdomen') {
        viewPort.voi.windowWidth = 350;
        let newWindowWidth = windowWidth / 2;
        viewPort.voi.windowCenter = newWindowWidth - 50;
        cornerstone.setViewport(enabledElement, viewPort);
      }

      if (type == 'pelvis') {
        viewPort.voi.windowWidth = 400;
        let newWindowWidth = windowWidth / 2;
        viewPort.voi.windowCenter = newWindowWidth - 40;
        cornerstone.setViewport(enabledElement, viewPort);
      }

      if (type == 'cerebrum') {
        viewPort.voi.windowWidth = 120;
        let newWindowWidth = windowWidth / 2;
        viewPort.voi.windowCenter = newWindowWidth - 40;
        cornerstone.setViewport(enabledElement, viewPort);
      }
    } else {
      toast.error('No file selected');
    }
  };

  const openFullScreen = () => {};
  const scheduleMeeting = () => {};
  const showContactList = () => {};
  const showReport = () => {
    dispatch(setDrawer(true));
    dispatch(setDrawerChildren(<Reports />));
  };

  const onDropFiles = useCallback((files, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      return toast.warning('Unsupported file format. Please drop DICOM files only.');
    }

    dispatch(
      setStack({
        imageIds: files.map((file) => cornerstoneWADOImageLoader.wadouri.fileManager.add(file)),
        currentImageIndex: 0,
      }),
    );
  }, []);

  return {
    sayHello,
    csElementRef,
    addCsTool,
    addTextTool,
    reset,
    openFullScreen,
    scheduleMeeting,
    showContactList,
    onSelectPreset,
    onDropFiles,
    enabledElement,
    showReport,
  };
};

export default useViewer;
