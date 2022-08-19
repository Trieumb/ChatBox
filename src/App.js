import './App.css';
import Login from './Components/Login';
import {Routes, Route} from 'react-router-dom';
import ChatRoom from './Components/ChatRoom';
import AuthProvider from './Components/Context/AuthProvider';
import AppProvider from './Components/Context/AppProvider';
import AddRoomModal from './Components/Modals/AddRoomModal';
import InviteMemberModal from './Components/Modals/InviteMemberModal';

function App () {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<ChatRoom />} path="/" />
        </Routes>
        <AddRoomModal />
        <InviteMemberModal />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
