import React from 'react'
import UsersShow from 'src/components/roomPage/UsersShow';
import AdminControl from 'src/components/roomPage/AdminControl';
import SpectatorsList from 'src/components/roomPage/SpectatorsList';
import { Typography, Stack, Button, Container } from '@mui/material';
import Chat from 'src/components/messages/Chat';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { map } from 'lodash';


const RoomLobby = ({ roomData, currUserId, roomId, isSpectator, setIsSpectator, socket, messageRef, setMessageRef, messages, setMessages }) => {
  const { name, teams, team_names, users_list, moderator, allow_spectators, room_size, blacklist, user_reports} = roomData;
  const navigate = useNavigate();
  const handle_ready_click = () => {
    socket.current.emit('ready_click', { 'roomId': roomId, 'userId':currUserId });  // currently currUserId is ignored by the server and the ip is used instead
  }

  const handle_leave_click = () => {
    socket.current.emit('leave_click', { 'roomId': roomId, 'userId':currUserId });  // currently currUserId is ignored by the server and the ip is used instead
    navigate('/');
  } 

  const handleSpectatorClick = () => {
    setIsSpectator(true);
    socket.current.emit('spectator_click', { 'roomId': roomId, 'userId':currUserId });
  }

  const handleDebaterClick = () => {
    setIsSpectator(false);
    socket.current.emit('debater_click', { 'roomId': roomId, 'userId':currUserId });
  }

  return (
    <>
      <Container style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}>
        <Card sx={{width: "100%", height: "fit-content"}}
          style={{
            display: 'flex',
            paddingBottom: '20px',
            paddingTop: '20px',
            backgroundColor: '#dbe4f3',
            maxHeight: '90%',
            minHeight: '90%',
        }}>
        <Stack direction="column" alignItems="center" spacing={3} sx={{ width: '100%' }}>
          <Typography variant="h2">{name}</Typography>
        <Stack direction="row" sx={{ width: '95%' }} spacing={2} style={{flexGrow: '1', overflow: 'auto', marginTop: '11px', maxHeight:'40%', minHeight:'40%'}}>
          <UsersShow user_reports={user_reports} onSpecClick={handleDebaterClick} allowSpectators={allow_spectators} teamNames={team_names} teams={teams} usersList={users_list} currUserId={currUserId} roomId={roomId} socket={socket} moderator={moderator} isSpectator={isSpectator} roomSize={room_size} />
          <SpectatorsList onIconClick={handleSpectatorClick} isSpectator={isSpectator} allowSpectators={allow_spectators} spectsList={roomData.spectators_list} isConversation={false}/>
        </Stack>
        <Chat roomId={roomId} socket={socket} messageRef={messageRef} setMessageRef={setMessageRef} messages={messages} setMessages={setMessages} currUserId={currUserId}/>
        <Stack direction="row" spacing={8}>
          <Button variant="contained" onClick={handle_leave_click} color="error">
            Leave
          </Button>
          {isSpectator ? (<> </>) : (<Button type="submit" variant="contained" onClick={handle_ready_click} color="success">
            Ready
          </Button>)}
          <AdminControl moderatorId={moderator} currUserId={currUserId} roomId={roomId} socket={socket}/>
        </Stack>
        </Stack>
        </Card>
      </Container>
    </>
  );
};

export default RoomLobby