import {
  MdOutlineFrontHand,
  MdMoreHoriz,
  MdFilterHdr,
  MdRefresh,
  MdChevronLeft,
  MdLegendToggle,
  MdCallReceived,
  MdStraighten,
  MdCompareArrows,
  MdSquareFoot,
  MdGames,
  MdAttractions,
  MdDesignServices,
  MdGesture,
  MdPanoramaFishEye,
  MdCrop75,
  MdOutlineEditNote,
  MdPhotoSizeSelectSmall,
  MdJoinRight,
  MdManageSearch,
  MdUndo,
  MdFullscreen,
  MdMeetingRoom,
  MdOpenInBrowser,
} from 'react-icons/md';
import { BiCaretDown, BiBlock, BiZoomIn } from 'react-icons/bi';
import { AiOutlineContacts } from 'react-icons/ai';
export const tools = (
  addCsTool,
  addTextTool,
  reset,
  openFullScreen,
  scheduleMeeting,
  showContactList,
  onSelectPreset,
) => [
  {
    name: 'Windowing',
    title: 'Windowing',
    value: 'WWWC',
    icon: <BiBlock size={20} />,
    children: [
      {
        name: 'Wwwc',
        title: 'Wwwc',
        value: 'Wwwc',
        icon: <BiBlock size={14} />,
        onClick: () => addCsTool('Wwwc'),
      },
      {
        name: 'WwwcRegion',
        title: 'Wwwc region',
        value: 'WwwcRegion',
        icon: <BiBlock size={14} />,
        onClick: () => addCsTool('WwwcRegion'),
      },
      {
        name: 'Presets',
        title: 'Wwwc Presets',
        value: 'presets',
        icon: <MdMoreHoriz size={14} />,
        onClick: () => null,
      },
      {
        name: 'Soft tissue',
        title: 'Soft tissue',
        value: 'tissue',
        icon: <MdFilterHdr size={14} />,
        onClick: () => onSelectPreset('tissue'),
      },
      {
        name: 'Lung',
        title: 'Lung',
        value: 'lung',
        icon: <MdFilterHdr size={14} />,
        onClick: () => onSelectPreset('lung'),
      },
      {
        name: 'Bone',
        title: 'Bone',
        value: 'bone',
        icon: <MdFilterHdr size={14} />,
        onClick: () => onSelectPreset('bone'),
      },
      {
        name: 'Brain',
        title: 'Brain',
        value: 'brain',
        icon: <MdFilterHdr size={14} />,
        onClick: () => onSelectPreset('brain'),
      },
      {
        name: 'Abdomen',
        title: 'Abdomen',
        value: 'abdomen',
        icon: <MdFilterHdr size={14} />,
        onClick: () => onSelectPreset('abdomen'),
      },
      {
        name: 'Cerebrum',
        title: 'Cerebrum',
        value: 'cerebrum',
        icon: <MdFilterHdr size={14} />,
        onClick: () => onSelectPreset('cerebrum'),
      },
      {
        name: 'Pelvis',
        title: 'Pelvis',
        value: 'pelvis',
        icon: <MdFilterHdr size={14} />,
        onClick: () => onSelectPreset('pelvis'),
      },
    ],
    // mode: 'active',
    // modeOptions: { mouseButtonMask: 1 },
  },
  {
    name: 'Pan',
    title: 'Pan',
    value: 'pan',
    icon: <MdOutlineFrontHand size={20} />,
    // mode: 'active',
    // modeOptions: { mouseButtonMask: 4 },
    onClick: () => addCsTool('Pan'),
  },
  {
    name: 'Zoom',
    title: 'Zoom',
    value: 'zoom',
    icon: <BiZoomIn size={20} />,
    // mode: 'active',
    // modeOptions: { mouseButtonMask: 2 },
    onClick: () => addCsTool('Zoom'),
  },
  {
    name: 'Rotate',
    title: 'Rotate',
    value: 'rotate',
    icon: <MdRefresh size={20} />,
    children: [],
    onClick: () => addCsTool('Rotate'),
  },

  {
    name: 'Measurement',
    title: 'Measurement',
    value: 'measurement',
    icon: <MdSquareFoot size={20} />,
    children: [
      {
        name: 'Angle',
        title: 'Regular',
        value: 'angle',
        icon: <MdChevronLeft size={14} />,
        onClick: () => addCsTool('Angle'),
      },
      {
        name: 'CobbAngle',
        title: 'Cobb',
        value: 'CobbAngle',
        icon: <MdLegendToggle size={14} />,
        onClick: () => addCsTool('CobbAngle'),
      },
      {
        name: 'ArrowAnnotate',
        title: 'Arrow Anotate',
        value: 'annotate',
        icon: <MdCallReceived size={14} />,
        onClick: () => addCsTool('ArrowAnnotate'),
      },
      {
        name: 'Length',
        title: 'Length',
        value: 'length',
        icon: <MdStraighten size={14} />,
        onClick: () => addCsTool('Length'),
      },
      {
        name: 'Bidirectional',
        title: 'Bidirectional',
        value: 'bidirectional',
        icon: <MdCompareArrows size={14} />,
        onClick: () => addCsTool('Bidirectional'),
      },
    ],
  },
  {
    name: 'Probe',
    title: 'Probe',
    value: 'probe',
    icon: <MdGames size={20} />,
    children: [
      {
        name: 'Probe',
        title: 'Regular',
        value: 'proberegular',
        icon: <MdGames size={20} />,
        onClick: () => addCsTool('Probe'),
      },
      {
        name: 'DragProbe',
        title: 'Drag',
        value: 'dragprobe',
        icon: <MdAttractions size={14} />,
        onClick: () => addCsTool('DragProbe'),
      },
    ],
  },
  {
    name: 'Annotations',
    title: 'Annotations',
    value: 'annotations',
    icon: <MdDesignServices size={20} />,
    children: [
      {
        name: 'FreehandScissors',
        title: 'Freehand Scissors',
        value: 'freehand',
        icon: <MdGesture size={14} />,
        onClick: () => addCsTool('FreehandScissors'),
      },
      {
        name: 'CircleScissors',
        title: 'Circle Scissors',
        value: 'circle',
        icon: <MdPanoramaFishEye size={14} />,
        onClick: () => addCsTool('CircleScissors'),
      },
      {
        name: 'RectangleScissors',
        title: 'Rectangle',
        value: 'rectangle',
        icon: <MdCrop75 size={14} />,
        onClick: () => addCsTool('RectangleScissors'),
      },
    ],
  },
  {
    name: 'TextMarker',
    title: 'Text Marker',
    value: 'textmarker',
    icon: <MdOutlineEditNote size={20} />,
    children: [],
    onClick: () => addTextTool(),
  },
  {
    name: 'Segmentation',
    title: 'Segmentation',
    value: 'segmentation',
    icon: <MdPhotoSizeSelectSmall size={20} />,
    children: [
      {
        name: 'FreehandRoi',
        title: 'Freehand ROI',
        value: 'freehand',
        icon: <MdGesture size={14} />,
        onClick: () => addCsTool('FreehandRoi'),
      },
      {
        name: 'EllipticalRoi',
        title: 'Ellipse',
        value: 'ellipse',
        icon: <MdJoinRight size={14} />,
        onClick: () => addCsTool('EllipticalRoi'),
      },
      {
        name: 'RectangleRoi',
        title: 'Rectangle',
        value: 'rectangle',
        icon: <MdCrop75 size={14} />,
        onClick: () => addCsTool('RectangleRoi'),
      },
    ],
  },
  {
    name: 'Magnify',
    title: 'Magnify',
    value: 'magnify',
    icon: <MdManageSearch size={20} />,
    children: [],
    onClick: () => addCsTool('Magnify'),
  },
  {
    name: 'Reset',
    title: 'Reset',
    value: 'reset',
    icon: <MdUndo size={20} />,
    children: [],
    onClick: () => reset(),
  },
  // {
  //   name: 'Dicom Tags',
  //   title: 'Hide/Show Dicom Tags',
  //   value: 'showDicomTags',
  //   icon: null,
  //   children: [],
  //   onClick: () => openFullScreen(),
  // },
  {
    name: 'Fullscreen',
    title: 'Fullscreen',
    value: 'fullscreen',
    icon: <MdFullscreen size={20} />,
    children: [],
    onClick: () => openFullScreen(),
  },
  {
    name: 'Schedule meeting',
    title: 'Schedule a meeting',
    value: 'schedmeeting',
    icon: <MdMeetingRoom size={20} />,
    children: [],
    onClick: () => scheduleMeeting(),
  },
  {
    name: 'Contact list',
    title: 'My contact list',
    value: 'contactlist',
    icon: <AiOutlineContacts size={20} />,
    children: [],
    onClick: () => showContactList(),
  },

  // // Scroll
  // { name: 'StackScrollMouseWheel', mode: 'active' },
  // // Touch
  // { name: 'PanMultiTouch', mode: 'active' },
  // { name: 'ZoomTouchPinch', mode: 'active' },
  // { name: 'StackScrollMultiTouch', mode: 'active' },
];
