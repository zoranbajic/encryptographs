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
        <Box margin={3} textAlign='center'>
          <Typography variant='h6' style={{ fontWeight: 600 }}>
            HOW TO GET STARTED
          </Typography>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box margin={3} textAlign='center'>
                <Typography style={{ fontWeight: 600 }}>1.</Typography>
              </Box>
              <Typography variant='body1' align='center'>
                {`Create an account and confirm your email address so that you can begin creating albums and uploading photos.`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box margin={3} textAlign='center'>
                <Typography style={{ fontWeight: 600 }}>2.</Typography>
              </Box>
              <Typography variant='body1' align='center'>
                {`Tell your friends and family about Encryptographs and ask them to create accounts of their own.`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box margin={3} textAlign='center'>
                <Typography style={{ fontWeight: 600 }}>3.</Typography>
              </Box>
              <Typography variant='body1' align='center'>
                {`Once they've shared their username with you, you can send invites to them to view your albums.`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
