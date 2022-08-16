import React from 'react';
import {Row, Col} from 'antd';
import UseInfo from './UseInfo';
import RoomList from './RoomList';
import styled from 'styled-components';

const SidebarStyled = styled.div`
    background: #3f0e40;
    color: white;
    height: 100vh;
`;

const Sidebar = () => {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}><UseInfo /></Col>
        <Col span={24}><RoomList /></Col>
      </Row>
    </SidebarStyled>
  );
};

export default Sidebar;
