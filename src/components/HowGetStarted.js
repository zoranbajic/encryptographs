import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

export default function HowGetStarted() {
  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        overflow: 'hidden',
        // bgcolor: '#e8eaf6',
        padding: 60,
      }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Typography variant='h6'>
          <Box margin={3} textAlign='center' fontWeight='fontWeightBold'>
            HOW TO GET STARTED
          </Box>
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              {/* <Box
                component='img'
                src={lockRed}
                alt='lock'
                sx={{ height: 55 }}
              /> */}
              <Typography>
                <Box margin={3} textAlign='center' fontWeight='fontWeightBold'>
                  1.
                </Box>
              </Typography>
              <Typography variant='body1'>
                {`Create an account and confirm your email address so that you can begin creating albums and uploading photos.`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              {/* <Box
                component='img'
                src={shieldRed}
                alt='shield'
                sx={{ height: 55 }}
              /> */}
              <Typography>
                <Box margin={3} textAlign='center' fontWeight='fontWeightBold'>
                  2.
                </Box>
              </Typography>
              <Typography variant='body1'>
                {`Tell your friends and family about Encryptographs and ask them to create accounts of their own.`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              {/* <Box
                component='img'
                src={photoRed}
                alt='photo'
                sx={{ height: 55 }}
              /> */}
              <Typography>
                <Box margin={3} textAlign='center' fontWeight='fontWeightBold'>
                  3.
                </Box>
              </Typography>
              <Typography variant='body1'>
                {`Once they've shared their username with you, you can send invites to them to view your albums.`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
