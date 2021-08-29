import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';

export default function Footer() {
  return (
    <Container>
      <Box px={{ xs: 5, sm: 5 }} py={{ xs: 5, sm: 5 }}>
        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
        >
          <Grid item>
            <Typography>About</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
