import { PageHeader } from 'antd';
import Styled from 'styled-components';

const PageHeaderStyle = Styled(PageHeader)`
  .ant-breadcrumb {
    ol{
      @media (max-width: 575px) {
        justify-content: center;
      }
    }
    li{
        display:flex;
        align-items:center;
    }
  }
  .ant-page-header-heading-title {
    font-weight: normal;
    font-size: 18px;
  }
`;

const HeaderWrapper = Styled.div`
  
`;

export { PageHeaderStyle, HeaderWrapper };
