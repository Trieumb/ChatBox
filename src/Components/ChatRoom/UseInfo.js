import {Avatar, Button, Typography} from 'antd';
import React, {useContext} from 'react';
import styled from 'styled-components';
import {auth} from '../../Firebase/config';
import {AuthContext} from '../Context/AuthProvider';

const WrapperStyle = styled.div`
display: flex;
justify-content: space-between;
padding: 12px 16px;
border-bottom: 1px solid rgba(82, 38 ,83);

.username {
    color: white;
    margin-left: 8px;
}
`;

const UseInfo = () => {

  const {user: {displayName, photoURL}} = useContext (AuthContext);

  return (
    <WrapperStyle>

      <div>
        <Avatar src={photoURL}>{photoURL? "" : displayName?.charAt(0)?.toUpperCase()}</Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <div>
        <Button onClick={() => auth.signOut ()}>Đăng Xuất</Button>
      </div>

    </WrapperStyle>
  );
};

export default UseInfo;
