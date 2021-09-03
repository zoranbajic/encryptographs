import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { Footer } from '.';
import { makeStyles } from '@material-ui/core/styles';

export default function About() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '98vh',
      }}
    >
      <Container>
        <Box mt={10} mb={10}>
          <Typography variant='h3' gutterBottom marked='center' align='center'>
            About
          </Typography>
        </Box>
        <Grid container direction='column' alignItems='center'>
          <Grid item xs={12} sm={7}>
            <Typography paragraph={true}>
              A while back our family of two became a family of three and
              relatives began clamoring for pictures of the newest family
              member. Being a bit of a privacy enthusiast/hobbyist I knew I
              wouldn't be trusting any site that didn't use end-to-end
              encryption with those kinds of photos. Apps like Signal were an
              option but that required getting everyone to download an install
              it, which would be a hassle and a challenge especially for those
              who weren't very tech-savy. Additionally, there was no way to
              create albums so grouping photos for ease of browsing was not an
              option.
            </Typography>
            <Typography paragraph={true}>
              I researched the options available but while there were
              sites/services that allowed you to create end-to-end encrypted
              image galleries, none of them offered the ability to share those
              with anyone else {'('} I guess due to the technical challenges
              {')'}. In the end, I just threw in the towel and used secure
              messaging apps, hoping something better would eventually come
              along.
            </Typography>
            <Typography paragraph={true}>
              Time went by, I ended up switching careers to software
              engineering, and one day thought to check if any new options had
              come up. While I still couldn't find anything that fit the bill,
              in my search I came across Etebase, a set of client-side libraries
              and a server for building end-to-end encrypted applications.
            </Typography>
            <Typography paragraph={true}>
              After reviewing the docs and reaching out to Tom Hacohen, the
              creator, with some questions, I realized Etebase provided all the
              functionality I needed to build what I hadn't been able to find,
              and thus Encryptographs was born.
            </Typography>
            <Typography paragraph={true}>
              As it is now, I still consider it a beta version but the core
              functionality is all there. I will continue to work on refining
              it, fixing bugs and adding features but for now, play around it
              and let me know what you think!
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}
