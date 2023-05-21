import { Dropdown, Menu, Typography } from 'antd';
import React from 'react';
import { BiCaretDown } from 'react-icons/bi';
import '../styles.css';
import useViewer from '../hooks/useViewer';
import { tools } from '../datas';
const ViewerHeader = () => {
  const { Text } = Typography;
  const {
    addCsTool,
    addTextTool,
    reset,
    openFullScreen,
    scheduleMeeting,
    showContactList,
    onSelectPreset,
    showReport,
  } = useViewer();
  return (
    <div className="viewer-panel flex flex-row overflow-x-auto items-center gap-4 w-full px-4 h-16">
      {tools(
        addCsTool,
        addTextTool,
        reset,
        openFullScreen,
        scheduleMeeting,
        showContactList,
        onSelectPreset,
        showReport,
      ).map((tool, i) =>
        tool?.children?.length ? (
          <Dropdown
            key={i}
            overlay={
              <Menu className="viewer-panel-dropdown-menu">
                {tool?.children?.map((child, cIndex) => (
                  <Menu.Item onClick={child.onClick} key={cIndex}>
                    {child.icon}
                    <Text>{child?.name}</Text>
                  </Menu.Item>
                ))}
              </Menu>
            }
            //   trigger={['click']}
            placement="bottomCenter"
          >
            <button className="flex flex-row justify-center items-center hover:text-primary text-white">
              <div className="flex justify-center flex-col items-center">
                {tool?.icon}

                <Text
                  className="text-white hover:text-primary"
                  style={{ width: 30, fontSize: '11px' }}
                  ellipsis={{ tooltip: tool.name }}
                >
                  {tool?.name}
                </Text>
              </div>
              <BiCaretDown size={16} />
            </button>
          </Dropdown>
        ) : (
          <button
            onClick={tool.onClick}
            key={i}
            className="flex flex-row justify-center items-center hover:text-primary text-white"
          >
            <div className="flex justify-center flex-col items-center">
              {tool?.icon}

              <Text
                className="text-white hover:text-primary"
                style={{ width: 30, fontSize: '11px' }}
                ellipsis={{ tooltip: tool.name }}
              >
                {tool?.name}
              </Text>
            </div>
          </button>
        ),
      )}
    </div>
  );
};

export default ViewerHeader;
