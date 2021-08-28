import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@material-ui/core';
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
        <Grid container>
          <Grid item xs={12} md={6} xl={3}>
            <Link href='https://www.etebase.com' rel='noreferrer'>
              <Box sx={item}>
                <Box
                  component='img'
                  src={etesyncLogo}
                  alt='eteBase'
                  sx={{ height: 55 }}
                />
                <Typography>
                  <Box
                    margin={3}
                    textAlign='center'
                    fontWeight='fontWeightBold'
                  >
                    Etebase
                  </Box>
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <Link
              href='https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics'
              rel='noreferrer'
            >
              <Box sx={item}>
                <Box
                  component='img'
                  src={jsLogo}
                  alt='JavaScript'
                  sx={{ height: 55 }}
                />
                <Typography>
                  <Box
                    margin={3}
                    textAlign='center'
                    fontWeight='fontWeightBold'
                  >
                    JavaScript
                  </Box>
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <Link href='https://reactjs.org/' rel='noreferrer'>
              <Box sx={item}>
                <Box
                  component='img'
                  src={reactLogo}
                  alt='React'
                  sx={{ height: 55 }}
                />
                <Typography>
                  <Box
                    margin={3}
                    textAlign='center'
                    fontWeight='fontWeightBold'
                  >
                    React
                  </Box>
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <Link href='https://material-ui.com/' rel='noreferrer'>
              <Box sx={item}>
                <Box
                  component='img'
                  src={materialUILogo}
                  alt='Material UI'
                  sx={{ height: 55 }}
                />
                <Typography>
                  <Box
                    margin={3}
                    textAlign='center'
                    fontWeight='fontWeightBold'
                  >
                    Material UI
                  </Box>
                </Typography>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
