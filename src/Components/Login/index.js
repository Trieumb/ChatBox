import React from 'react';
import {Row, Col, Button, Typography} from 'antd';
import firebase, {auth} from '../../Firebase/config';
import {useNavigate} from 'react-router-dom';
import  { addDocument, generateKeywords } from '../../Firebase/services'
const {Title} = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider ();
const ggProvider = new firebase.auth.GoogleAuthProvider ();

const Login = () => {
  const navigate = useNavigate ();
  const handleLogin = async (provider) => {
    const {additionalUserInfo, user}= await auth.signInWithPopup (provider);
    if (additionalUserInfo?.isNewUser){
      addDocument( 'user', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        keyWords: generateKeywords(user.displayName?.toLowerCase()),
        providerId: additionalUserInfo.providerId
      })
    }
  };
  //   lắng nghe sự kiện của firebase

auth.onAuthStateChanged (user => {
    if (user) {
      navigate ('/', {replace: true});
    }
  });
  return (
    <div>
      <Row justify="center" style={{height: 800}}>
        <Col span={8}>
          <Title style={{textAlign: 'center'}} lever={3}>Fun Chat</Title>
          <Button
            onClick={ () => handleLogin(ggProvider)}
            style={{width: '100%', marginBottom: 5}}
          >
            Đăng nhập bằng google
          </Button>
          <Button onClick={ () => handleLogin(fbProvider)} style={{width: '100%'}}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
