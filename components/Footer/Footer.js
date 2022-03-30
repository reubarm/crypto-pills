import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { TwitterIcon, DiscordIcon, InstagramIcon} from '../Icons';
import Copyright from './Copyright'

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  link: {
    margin: '0 10px',
    color: '#457B9D',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="footer" className={classes.footer}>
      <hr/>
      <br/>
      <Typography variant='h5' component='p' align='center'>Get in touch</Typography><br/>
      <Typography variant='body2' component='p' align='center'>Send us your best Crypto-Pill stories, crazy ideas, cool music and thoughts or questions you’d like to share with us:</Typography>
      <Grid container spacing={4} justifyContent="space-evenly" style={{marginTop: '1rem'}}>
        <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Link variant="button" color="textPrimary" href="https://twitter.com/pills_crypto" target="_blank" rel="noopener" className={classes.link}>
              <TwitterIcon style={{ fontSize: 28}}/>
            </Link>
            <Link variant="button" color="textPrimary" href="https://discord.gg/UV4FnNGYdp" target="_blank" rel="noopener" className={classes.link}>
              <DiscordIcon style={{ fontSize: 28}}/>
            </Link>
            <Link variant="button" color="textPrimary" href="https://www.instagram.com/cryptopills_official" target="_blank" rel="noopener" className={classes.link}>
              <InstagramIcon style={{ fontSize: 28}}/>
            </Link>
        </Grid>
        {/* <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <img src="/images/pills-logo.jpeg" style={{width:'100px'}}></img>
        </Grid> */}
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}