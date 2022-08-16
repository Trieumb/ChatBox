import {UserAddOutlined} from '@ant-design/icons';
import {Avatar, Button, Form, Tooltip, Input} from 'antd';
import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const HeaderStyled = styled.div`
display: flex;
justify-content: space-between;
height: 56px;
padding: 0 16px;
align-items: center;
border-bottom: 1px solid rgb(230 230 230);
.header_info{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.header_title{
    margin: 0;
    font-weight: bold;
}
.header_discription{
    font-size: 12px;
}
`;

const WraperStyled = styled.div`
height: 100vh;
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;
const ContentStyled = styled.div`
height: calc(100% - 56px);
display: flex;
flex-direction: column;
padding: 11px;
justify-content: flex-end;
`;
const FormStyled = styled (Form)`
display: flex;
justify-content:space-between;
align-items: center;
padding: 2px 2px 2px 0;
border:  1px solid rgb(230, 230, 230);
border-radius:3px;

.ant-form-item{
    flex: 1;
    margin-bottom:0;
}
`;
const MessageListStyled = styled.div`
max-height: 100%;
overflow-y: auto;
`;

const ChatWindow = () => {
  return (
    <WraperStyled>
      <HeaderStyled>
        <div className="header_info">
          <p className="header_title">Room 1</p>
          <span className="header_discription">Đây là Room 1</span>
        </div>
        <ButtonGroupStyled>
          <Button icon={<UserAddOutlined />} type="text">Mời</Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip title="A"><Avatar>A</Avatar></Tooltip>
            <Tooltip title="A"><Avatar>B</Avatar></Tooltip>
            <Tooltip title="A"><Avatar>C</Avatar></Tooltip>
            <Tooltip title="A"><Avatar>D</Avatar></Tooltip>
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
          <Message
            text="test"
            photoURL={null}
            displayName="Triệu"
            createdAt={12334}
          />
          <Message
            text="test"
            photoURL={null}
            displayName="Hương"
            createdAt={12334}
          />
          <Message
            text="test"
            photoURL={null}
            displayName="Sam"
            createdAt={12334}
          />
        </MessageListStyled>
        <FormStyled>
          <Form.Item>
            <Input
              placeholder="Nhập tin nhắn"
              bordered={false}
              autoComplete="off"
            />
          </Form.Item>
          <Button type="primary">Gửi</Button>
        </FormStyled>
      </ContentStyled>
    </WraperStyled>
  );
};

export default ChatWindow;
