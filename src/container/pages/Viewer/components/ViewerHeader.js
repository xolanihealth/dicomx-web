import { Button, Divider, Dropdown, Menu, Typography } from 'antd';
import React from 'react';
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
import '../styles.css';
import useViewer from '../hooks/useViewer';
const ViewerHeader = () => {
  const { Text } = Typography;
  const { sayHello } = useViewer();
  return (
    <div className="viewer-panel flex flex-row overflow-x-auto items-center gap-4 w-full px-8 h-16">
      <Dropdown
        overlay={
          <Menu className="viewer-panel-dropdown-menu">
            <Menu.Item>
              <BiBlock size={14} />
              <Text>Wwwc</Text>
            </Menu.Item>
            <Menu.Item style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
              <BiBlock size={14} />
              <Text>WwwcRegion</Text>
            </Menu.Item>
            <Divider className="m-0" />
            <Menu.Item className="text-gray-500">
              <MdMoreHoriz size={14} />
              <Text>Presets</Text>
            </Menu.Item>
            <Divider className="m-0" />
            <Menu.Item>
              <MdFilterHdr size={14} />
              <Text>Soft Tissue</Text>
            </Menu.Item>
            <Menu.Item>
              <MdFilterHdr size={14} />
              <Text>Lung</Text>
            </Menu.Item>
            <Menu.Item>
              <MdFilterHdr size={14} />
              <Text>Bone</Text>
            </Menu.Item>
            <Menu.Item>
              <MdFilterHdr size={14} />
              <Text>Brain</Text>
            </Menu.Item>
            <Menu.Item>
              <MdFilterHdr size={14} />
              <Text>Abdomen</Text>
            </Menu.Item>
            <Menu.Item>
              <MdFilterHdr size={14} />
              <Text>Cerebrum</Text>
            </Menu.Item>
            <Menu.Item>
              <MdFilterHdr size={14} />
              <Text>Pelvis</Text>
            </Menu.Item>
          </Menu>
        }
        //   trigger={['click']}
        placement="bottomCenter"
      >
        <button className="flex flex-row justify-center items-center hover:text-primary text-white">
          <div className="flex justify-center flex-col items-center">
            <BiBlock size={20} />

            <Text
              className="text-white hover:text-primary"
              style={{ width: 30, fontSize: '11px' }}
              ellipsis={{ tooltip: 'Windowing' }}
            >
              Windowing
            </Text>
          </div>
          <BiCaretDown size={16} />
        </button>
      </Dropdown>
      <button onClick={sayHello} className="flex flex-row justify-center items-center hover:text-primary text-white">
        <div className="flex justify-center flex-col items-center">
          <MdOutlineFrontHand size={20} />

          <Text
            className="text-white hover:text-primary"
            style={{ width: 30, fontSize: '11px' }}
            ellipsis={{ tooltip: 'Pan' }}
          >
            Pan
          </Text>
        </div>
      </button>

      <button className="flex flex-row justify-center items-center hover:text-primary text-white">
        <div className="flex justify-center flex-col items-center">
          <BiZoomIn size={20} />

          <Text
            className="text-white hover:text-primary"
            style={{ width: 30, fontSize: '11px' }}
            ellipsis={{ tooltip: 'Zoom' }}
          >
            Zoom
          </Text>
        </div>
      </button>

      <button className="flex flex-row justify-center items-center hover:text-primary text-white">
        <div className="flex justify-center flex-col items-center">
          <MdRefresh size={20} />

          <Text
            className="text-white hover:text-primary"
            style={{ width: 30, fontSize: '11px' }}
            ellipsis={{ tooltip: 'Rotate' }}
          >
            Rotate
          </Text>
        </div>
      </button>

      <Dropdown
        overlay={
          <Menu className="viewer-panel-dropdown-menu">
            <Menu.Item>
              <MdChevronLeft size={14} />
              <Text>Angle</Text>
            </Menu.Item>
            <Menu.Item>
              <MdLegendToggle size={14} />
              <Text>CobbAngle</Text>
            </Menu.Item>
            <Menu.Item>
              <MdCallReceived size={14} />
              <Text>ArrowAnnotate</Text>
            </Menu.Item>
            <Menu.Item>
              <MdStraighten size={14} />
              <Text>Length</Text>
            </Menu.Item>
            <Menu.Item>
              <MdCompareArrows size={14} />
              <Text>Bi-Directional</Text>
            </Menu.Item>
          </Menu>
        }
        //   trigger={['click']}
        placement="bottomCenter"
      >
        <button className="flex flex-row justify-center items-center hover:text-primary text-white">
          <div className="flex justify-center flex-col items-center">
            <MdSquareFoot size={20} />

            <Text
              className="text-white hover:text-primary"
              style={{ width: 30, fontSize: '11px' }}
              ellipsis={{ tooltip: 'Measure' }}
            >
              Measure
            </Text>
          </div>
          <BiCaretDown size={16} />
        </button>
      </Dropdown>

      <Dropdown
        overlay={
          <Menu className="viewer-panel-dropdown-menu">
            <Menu.Item>
              <MdGames size={14} />
              <Text>Probe</Text>
            </Menu.Item>
            <Menu.Item>
              <MdAttractions size={14} />
              <Text>DragProbe</Text>
            </Menu.Item>
          </Menu>
        }
        //   trigger={['click']}
        placement="bottomCenter"
      >
        <button className="flex flex-row justify-center items-center hover:text-primary text-white">
          <div className="flex justify-center flex-col items-center">
            <MdGames size={20} />

            <Text
              className="text-white hover:text-primary"
              style={{ width: 30, fontSize: '11px' }}
              ellipsis={{ tooltip: 'Probe' }}
            >
              Probe
            </Text>
          </div>
          <BiCaretDown size={16} />
        </button>
      </Dropdown>

      <Dropdown
        overlay={
          <Menu className="viewer-panel-dropdown-menu">
            <Menu.Item>
              <MdGesture size={14} />
              <Text>FreeHandScissors</Text>
            </Menu.Item>
            <Menu.Item>
              <MdPanoramaFishEye size={14} />
              <Text>CircleScissors</Text>
            </Menu.Item>
            <Menu.Item>
              <MdCrop75 size={14} />
              <Text>RectangleScissors</Text>
            </Menu.Item>
          </Menu>
        }
        //   trigger={['click']}
        placement="bottomCenter"
      >
        <button className="flex flex-row justify-center items-center hover:text-primary text-white">
          <div className="flex justify-center flex-col items-center">
            <MdDesignServices size={20} />

            <Text
              className="text-white hover:text-primary"
              style={{ width: 30, fontSize: '11px' }}
              ellipsis={{ tooltip: 'Annotations' }}
            >
              Annotations
            </Text>
          </div>
          <BiCaretDown size={16} />
        </button>
      </Dropdown>

      <button className="flex flex-row justify-center items-center hover:text-primary text-white">
        <div className="flex justify-center flex-col items-center">
          <MdOutlineEditNote size={20} />

          <Text
            className="text-white hover:text-primary"
            style={{ width: 30, fontSize: '11px' }}
            ellipsis={{ tooltip: 'Text Marker' }}
          >
            Text Marker
          </Text>
        </div>
      </button>

      <Dropdown
        overlay={
          <Menu className="viewer-panel-dropdown-menu">
            <Menu.Item>
              <MdGesture size={14} />
              <Text>FreeHandRoi</Text>
            </Menu.Item>
            <Menu.Item>
              <MdJoinRight size={14} />
              <Text>EllipticalRoi</Text>
            </Menu.Item>
            <Menu.Item>
              <MdCrop75 size={14} />
              <Text>RectangleRoi</Text>
            </Menu.Item>
          </Menu>
        }
        //   trigger={['click']}
        placement="bottomCenter"
      >
        <button className="flex flex-row justify-center items-center hover:text-primary text-white">
          <div className="flex justify-center flex-col items-center">
            <MdPhotoSizeSelectSmall size={20} />

            <Text
              className="text-white hover:text-primary"
              style={{ width: 30, fontSize: '11px' }}
              ellipsis={{ tooltip: 'Segmentations' }}
            >
              Segmentations
            </Text>
          </div>
          <BiCaretDown size={16} />
        </button>
      </Dropdown>

      <button className="flex flex-row justify-center items-center hover:text-primary text-white">
        <div className="flex justify-center flex-col items-center">
          <MdManageSearch size={20} />

          <Text
            className="text-white hover:text-primary"
            style={{ width: 30, fontSize: '11px' }}
            ellipsis={{ tooltip: 'Magnify' }}
          >
            Magnify
          </Text>
        </div>
      </button>

      <button className="flex flex-row justify-center items-center hover:text-primary text-white">
        <div className="flex justify-center flex-col items-center">
          <MdUndo size={20} />

          <Text
            className="text-white hover:text-primary"
            style={{ width: 30, fontSize: '11px' }}
            ellipsis={{ tooltip: 'Reset' }}
          >
            Reset
          </Text>
        </div>
      </button>

      <button className="flex flex-row justify-center items-center hover:text-primary text-white">
        <div className="flex justify-center flex-col items-center">
          <MdFullscreen size={20} />

          <Text
            className="text-white hover:text-primary"
            style={{ width: 30, fontSize: '11px' }}
            ellipsis={{ tooltip: 'Fullscreen' }}
          >
            Fullscreen
          </Text>
        </div>
      </button>

      <button className="flex flex-row justify-center items-center hover:text-primary text-white">
        <div className="flex justify-center flex-col items-center">
          <MdMeetingRoom size={20} />

          <Text
            className="text-white hover:text-primary"
            style={{ width: 30, fontSize: '11px' }}
            ellipsis={{ tooltip: 'Schedule' }}
          >
            Schedule
          </Text>
        </div>
      </button>
    </div>
  );
};

export default ViewerHeader;
