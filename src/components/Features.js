import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import lockRed from '../assets/lock_red.svg';
import shieldRed from '../assets/shield_red.svg';
import photoRed from '../assets/photo_red.svg';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

export default function Features() {
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
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component='img'
                src={lockRed}
                alt='lock'
                sx={{ height: 55 }}
              />

              <Box margin={3} textAlign='center'>
                <Typography style={{ fontWeight: 600 }}>
                  END-TO-END ENCRYPTED
                </Typography>
              </Box>
              <Typography variant='body1'>
                {`Because your data is encrypted before it leaves your computer, even we can't see it.`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component='img'
                src={shieldRed}
                alt='shield'
                sx={{ height: 55 }}
              />
              <Box margin={3} textAlign='center'>
                <Typography style={{ fontWeight: 600 }}>
                  WE TAKE PRIVACY SERIOUSLY
                </Typography>
              </Box>
              <Typography variant='body1'>
                {`We don't collect personal data, track you, or use cookies.`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component='img'
                src={photoRed}
                alt='photo'
                sx={{ height: 55 }}
              />
              <Box margin={3} textAlign='center'>
                <Typography style={{ fontWeight: 600 }}>
                  LOSSLESS STORAGE
                </Typography>
              </Box>
              <Typography variant='body1'>
                {`Your photos are not compressed in any way. What you upload is what you will see.`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
