import React from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2;
import './VideoGrid.css'; // Import your CSS styles for the VideoGrid component
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const VideoGrid = ({ myVideo, peers }) => {
  
  const calcGrid = (n) => {
    const gridMap = [];

    let remaining = n;
    let row = 0;

    while (remaining > 0) {
      if (remaining <= 2) {
        gridMap.push(remaining);
        break;
      }
      if (remaining === 3 && gridMap.length !== 0) {
        gridMap.push(3);
        break;
      }

      // const remaining >= 5 ? 2 : 3;
      const cols = remaining >= 5 ? 3 : 2;

      gridMap.push(cols);

      remaining -= cols;

      row++;
    }
    return gridMap;
  }

  peers = [1,2,3,4,5]
  // const numOfVids = myVideo !== null ? peers.length + 1 : peers.length;
  const numOfVids = 2
  return (
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${numOfVids <= 4 ? 2 : 3}, 1fr)`, gridAutoRows: `1fr`, height: '95%', alignItems: 'center', }}>
      {myVideo !== null ? (<video muted autoPlay playsInline ref={myVideo} width='100%' style={{flex:'1 1 30%'}}/>) : null}
      <Skeleton variant="rectangular" height="100px" width="30%" style={{flex:'1 1 30%'}} />
      <Skeleton variant="rectangular" height="100px" width="30%" style={{flex:'1 1 30%'}}/>
      
    
    </div>
//     <Grid container spacing={1} height='98%'>
//   {/* create a row for each val in gridMap */}
//   {gridMap.map((cols, i) => (
//     <Grid container item xs={12} spacing={1} key={i} alignItems='center'>
//       {/* create a col for each val in gridMap */}
//       {[...Array(cols)].map((_, j) => (
//         <Grid item key={j} xs={12 / cols} overflow='hidden'>
//               {myVideo !== null && i === 0 && j === 0 ? (
//                 <video muted autoPlay playsInline ref={myVideo}/>
//               ) : (
//                 <>
//                   <Typography variant="h5" gutterBottom style={{ position: "absolute" }}>
//                     {`Loading ...`}
//                   </Typography>
//                   <Skeleton variant="rectangular" height="100px" width="100%" />
//                 </>
//               )}
//         </Grid>
//       ))}
//     </Grid>
//   ))}
// </Grid>

  );
};

export default VideoGrid;