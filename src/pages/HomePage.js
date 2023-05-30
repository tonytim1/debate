import { Helmet } from 'react-helmet-async';
import { Grid, Button, Container, TextField, Stack, Typography, Autocomplete } from '@mui/material';
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import { doc, getDoc, updateDoc, getDocs, collection} from 'firebase/firestore';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];


// ----------------------------------------------------------------------

export default function HomePage() {
  const [roomsData, setRoomsData] = useState(new Map());
  const navigate = useNavigate();

  const socket = io('ws://' + window.location.hostname + ':5000');

  const fetchRooms = async () => {
    socket.emit('fetch_all_rooms');
  };

  useEffect(() => {
    const fetchData = async () => {
      fetchRooms();
      socket.once('all_rooms', (rooms) => {
        setRoomsData(new Map(Object.entries(rooms)));
      });
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    console.log(typeof(roomsData));
  }, [roomsData]);

  return (
    <>
      <Helmet>
        <title> Debate Center | Home </title>
      </Helmet>

      <Container>
        <Stack spacing={2} alignItems="center" justifyContent="center"  mb={1}>
          <Typography variant="h2">
            Debate Center
          </Typography>
          <Typography variant="h8">
            Discover diverse perspectives, ignite meaningful discussions
          </Typography>
          <Stack spacing={2} mb={3} direction="row" alignItems="center" justifyContent="center" sx={{width:'100%'}}>
              <TextField label="Search for debates" sx={{width:'90%'}}/>
              <Button size="small" variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => {navigate("/dashboard/createRoom")}}>
                Create Room
              </Button>
          </Stack>
          <Grid container spacing={3} justifyContent="center">
            {Array.from(roomsData).map(([roomId, data]) => (
              <BlogPostCard key={roomId} room={data} roomId={roomId} />
              ))}
          </Grid>
        </Stack>
      </Container>
    </>
  );
}
