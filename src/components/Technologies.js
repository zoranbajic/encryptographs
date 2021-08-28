import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import etesyncLogo from '../assets/Etesync.png';
import jsLogo from '../assets/JavaScript.png';
import reactLogo from '../assets/React.png';
import materialUILogo from '../assets/MaterialUI.png';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

export default function Technologies() {
  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        overflow: 'hidden',
        bgcolor: '#fafbfd',
        padding: 60,
      }}
    >
      <Container sx={{ mt: 15, mb: 50, display: 'flex', position: 'relative' }}>
        <Typography variant='h6'>
          <Box
            margin={3}
            textAlign='center'
            marginBottom={5}
            fontWeight='fontWeightBold'
          >
            This site was built with
          </Box>
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} xl={3}>
            <Box sx={item}>
              <Box
                component='img'
                src={etesyncLogo}
                alt='eteSync'
                sx={{ height: 55 }}
              />
              <Typography>
                <Box margin={3} textAlign='center' fontWeight='fontWeightBold'>
                  Etebase
                </Box>
              </Typography>
              {/* <Typography variant='body1'>
                {`Create an account and confirm your email address so that you can begin creating albums and uploading photos.`}
              </Typography> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <Box sx={item}>
              <Box
                component='img'
                src={jsLogo}
                alt='JavaScript'
                sx={{ height: 55 }}
              />
              <Typography>
                <Box margin={3} textAlign='center' fontWeight='fontWeightBold'>
                  JavaScript
                </Box>
              </Typography>
              {/* <Typography variant='body1'>
                {`Tell your friends and family about Encryptographs and ask them to create accounts of their own.`}
              </Typography> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <Box sx={item}>
              <Box
                component='img'
                src={reactLogo}
                alt='React'
                sx={{ height: 55 }}
              />
              <Typography>
                <Box margin={3} textAlign='center' fontWeight='fontWeightBold'>
                  React
                </Box>
              </Typography>
              {/* <Typography variant='body1'>
                {`Once they've shared their username with you, you can send invites to them to view your albums.`}
              </Typography> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <Box sx={item}>
              <Box
                component='img'
                src={materialUILogo}
                alt='Material UI'
                sx={{ height: 55 }}
              />
              <Typography>
                <Box margin={3} textAlign='center' fontWeight='fontWeightBold'>
                  Material UI
                </Box>
              </Typography>
              {/* <Typography variant='body1'>
                {`Once they've shared their username with you, you can send invites to them to view your albums.`}
              </Typography> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
