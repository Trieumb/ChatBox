import React, {useContext} from 'react';
import {Button, Collapse, Typography} from 'antd';
import styled from 'styled-components';
import {PlusSquareOutlined} from '@ant-design/icons';
import {AppContext} from '../Context/AppProvider';
import {useNavigate} from 'react-router-dom';

const {Panel} = Collapse;
const PanelStyled = styled (Panel)`
&&& {
    .ant-collapse-header,
    p{
        color: white;
    }
    .ant-collapse-content-box{
        padding: 0 40px;
    }
    .add-room{
        color: white;
        padding: 0;
    }
}
`;
const LinkStyled = styled (Typography.Link)`
    display: block;
    margin-bottom:5px;
    color: white;
`;

const RoomList = () => {
  const {rooms, isAddRoomVisible, setIsAddRoomVisible} = useContext (
    AppContext
  );
  const navigate = useNavigate ();

  const handleAddRoom = () => {
    navigate ('addRoom', setIsAddRoomVisible (true));

    console.log (isAddRoomVisible);
  };
  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header="Danh sách các phòng" key="1">
        {rooms.map (room => <LinkStyled key={room.id}>{room.name}</LinkStyled>)}
        <Button
          className="add-room"
          type="text"
          icon={<PlusSquareOutlined />}
          onClick={handleAddRoom}
        >
          Thêm phòng
        </Button>
      </PanelStyled>

    </Collapse>
  );
};

export default RoomList;