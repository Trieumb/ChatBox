import {UserAddOutlined} from '@ant-design/icons';
import {Avatar, Button, Form, Tooltip, Input, Alert} from 'antd';
import React, {useContext, useMemo, useState} from 'react';
import styled from 'styled-components';
import { addDocument } from '../../Firebase/services';
import {AppContext} from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';
import useFirestore from '../Hooks/useFirestore';
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
  const {selectedRoom, members,setIsInviteMemberVisible} = useContext (AppContext); 
  const { user: {uid, displayName,photoURL}} = useContext (AuthContext); 
  const [ inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }
// tao data messages
  const handleOnSubmit = () => {
    addDocument('messages',{
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    })
    form.resetFields(['message']);
  }

  // xu ly hien thi chat
  const condition = useMemo( () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id
  }),[selectedRoom.id])

  const messages = useFirestore('messages', condition)
  return (
    <WraperStyled>
     {
      selectedRoom.id? (<>
       <HeaderStyled>
        <div className="header_info">
          <p className="header_title">{selectedRoom?.name}</p>
          <span className="header_discription">
            {selectedRoom?.description}
          </span>
        </div>
        <ButtonGroupStyled>
          <Button icon={<UserAddOutlined />} type="text" onClick={() => setIsInviteMemberVisible(true)}>M???i</Button>
          <Avatar.Group size="small" maxCount={3}>
           {
            members.map((member) => (
              <Tooltip title={member.displayName} key={member.id}>
                <Avatar src={member.photoURL}>
                  {member.photoURL
                    ? ''
                    : member.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
            </Tooltip>))
            
           }
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
        {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
  
        </MessageListStyled>
        <FormStyled form={form}>
          <Form.Item name="message">
            <Input
            onChange={handleInputChange}
            onPressEnter={handleOnSubmit}
              placeholder="Nh???p tin nh???n"
              bordered={false}
              autoComplete="off"
            />
          </Form.Item>
          <Button type="primary" onClick={handleOnSubmit}>G???i</Button>
        </FormStyled>
      </ContentStyled></> ):( <Alert message='H??y ch???n ph??ng!' showIcon type='info' style={{margin: '5px'}} closable/>
     )} 
    </WraperStyled>
  );
};

export default ChatWindow;
