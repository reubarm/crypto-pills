import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import WalletButton from "./WalletButton";
import MobileMenu from "./MobileMenu";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { TwitterIcon, DiscordIcon, InstagramIcon } from "../Icons";

import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: "0.5rem 8rem",
    backgroundColor: "white",
    height: "5rem",
    '@media (max-width: 1200px)': {
      padding: '0.5rem 2.3rem'
    },
    '@media (max-width: 875px)': {
      padding: '0.5rem'
    },
  },
  toolbar: {
    flexWrap: "no-wrap",
    justifyContent: "center",
  },
  toolbarRear: {
    background: theme.palette.secondary.dark,
    width: "100%",
    height: "100%",
  },
  logo: {
    height: "4rem",
  },
  mobileLogo: {
    height: "1.75rem",
  },
  mobileIcon: {
    width: "1.75rem",
    height: "1.75rem",
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    margin: "10px 10px 5px",
    color: "#4662b3",
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
}));

export default function Header(props) {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const preventDefault = (event) => event.preventDefault();

  return (
    <>
      <AppBar
        position="fixed"
        color={"default"}
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Hidden mdUp>
            <MobileMenu />
            <div className={classes.grow} />
          </Hidden>
          <Hidden smDown>
            <a href="/">
              <img src="/images/pills-logo.jpeg" className={classes.logo} />
            </a>
            <div className={classes.grow} />
            <Link
              variant="h6"
              color="textPrimary"
              href="/roadmap"
              className={classes.headerLink}
            >
              Roadmap
            </Link>
            <Link
              variant="h6"
              color="textPrimary"
              href="/play"
              className={classes.headerLink}
            >
              Play Game
            </Link>
            <Link
              variant="h6"
              color="textPrimary"
              href="https://dropthepill.com/"
              className={classes.headerLink}
            >
              Merchandise
            </Link>
            <Link
              variant="h6"
              color="textPrimary"
              onClick={() => router.push("/press")}
              className={classes.headerLink}
            >
              Press
            </Link>
            {/* <Link variant='h6' color="textPrimary" href="#mint-section" className={classes.headerLink}>Mint</Link> */}
            <Link
              href="https://twitter.com/pills_crypto"
              target="_blank"
              rel="noopener"
              className={classes.link}
            >
              <TwitterIcon style={{ fontSize: 18 }} />
            </Link>
            <Link
              href="https://discord.gg/UV4FnNGYdp"
              target="_blank"
              rel="noopener"
              className={classes.link}
            >
              <DiscordIcon style={{ fontSize: 18 }} />
            </Link>
            <Link
              href="https://www.instagram.com/cryptopills_official"
              target="_blank"
              rel="noopener"
              className={classes.link}
            >
              <InstagramIcon style={{ fontSize: 18 }} />
            </Link>
          </Hidden>
          <WalletButton />
        </Toolbar>
      </AppBar>
    </>
  );
}
