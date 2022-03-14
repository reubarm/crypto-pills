import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../hooks/web3-react";
import Head from "next/head";
import { useRouter } from "next/router";

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Link,
  Typography,
  Container,
  Button,
  Grid,
  TextField,
  Stack,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
  },
  headerLink: {
    margin: theme.spacing(1, 2),
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    color: "#555",
    letterSpacing: "-0.5px",
    "&:hover": {
      textDecoration: "none",
      color: "#000",
    },
  },
  bannerSection: {
    marginTop: "50px",
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: "url(/overlay.svg), url(/game.png)",
    height: "100vh",
    padding: "20rem 0",
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: "4rem",
  },
  subtitle: {
    color: "#fff",
    fontSize: "1.5rem",
  },
  introTitle: {
    color: "#4e3b5d",
    letterSpacing: "-2px",
    fontWeight: "600",
    margin: "3rem 0",
  },
  openSea: {
    fontSize: "1rem",
    fontWeight: "700",
    letterSpacing: "0",
    textTransform: "none",
    borderRadius: "10",
    margin: "3rem 1rem 0 0",
    minWidth: "250px",
    minHeight: "50px",
    backgroundColor: "#692a97",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#471d66",
    },
  },
  detailSection: {
    marginTop: "100px",
  },
  majorHeading: {
    marginBlockStart: "3rem",
  },
  pointHeading: {
    marginBlockStart: "2rem",
  },
}));

export default function Home() {
  const { active } = useWeb3React();
  const router = useRouter();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const theme = useTheme();
  const classes = useStyles();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Head>
        <title>Play Game | Crypto Pills</title>
        <meta
          name="description"
          content="Micha Klein’s digital art has been around for over 30 years, and is not going away."
        />
      </Head>
      <Container
        id="top-anchor"
        maxWidth={false}
        component="main"
        className={classes.root}
      >
        <Header />

        <Container
          maxWidth={false}
          component="div"
          className={classes.bannerSection}
        >
          <Typography variant="h3" component="p" className={classes.title}>
            Have fun with your Crypto Pills
          </Typography>
          <br />
          <Typography
            variant="body2"
            component="p"
            className={classes.subtitle}
          >
            An Expansive Metaverse to Play, Build, Own, and Monetize your
            virtual experience with Crypto Pills.
          </Typography>
          <br />
          <Typography
            variant="body2"
            component="p"
            className={classes.subtitle}
          >
            <strong>Play our V1 game and build your own virtual world.</strong>
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.openSea}
            href="https://pillman-proto.netlify.app/"
          >
            Play Game
          </Button>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
