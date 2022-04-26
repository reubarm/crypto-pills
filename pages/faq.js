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
import useStyles from "../themes/useStyles";

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

  const title = [
    "How do I purchase Crypto Pills?",
    "How do I know which Crypto-Pill I get?",
    "How many Crypto Pills can I buy per single transaction?",
    "What will be the price of Crypto Pills?",
  ];

  const description = [
    "The easiest way to purchase Crypto Pills is to install a MetaMask extension in your browser and link your crypto wallet to it. Ensure you have enough ETH in your wallet to cover the cost of purchasing Crypto Pills, in addition to any associated gas fees. Approve the desired transaction on MetaMask and you are ready to go. For more information, please refer to this link: https://nftyfarm.com/metamask/",
    "Crypto Pills will remain hidden until the big reveal on August 27, 2021. Upon reveal, the artwork from the pre-defined collection will be assigned to the NFT placeholder that you purchased. “Blind sales” are chosen to ensure the Crypto Pills value is protected so no one can determine its rarity, including the project owners.",
    "There is a limit of twenty (20) Crypto Pills that can be purchased in one (1) transaction.",
    "The pricing model is a flat-rate throughout the entire sale. The cost of each Crypto-Pill is set at 0.07 Eth, and 100 Crypto Pills will be reserved for giveaways.",
  ];

  const mockData = {
    id: (index) => `${index + 1}`,
    text: {
      title: (index) => title[index],
      description: (index) => description[index],
    },
  };

  const MOCK_FAQS = [...Array(4)].map((_, index) => ({
    id: mockData.id(index),
    value: `panel${index + 1}`,
    heading: mockData.text.title(index),
    detail: mockData.text.description(index),
  }));

  return (
    <>
      <Head>
        <title>Frequently Asked Questions | Crypto Pills</title>
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
          <div className={classes.titleContainer}>
            <Typography variant="h3" component="p" className={classes.title}>
              What can we help you with?
            </Typography>
            <br />
            <Typography
              variant="body2"
              component="p"
              className={classes.subtitle}
            >
              Crypto Pills is a collection of Fine Art Digital Collectibles
              (NFTs) running on the Ethereum network. This website is only an
              interface allowing participants to purchase these digital
              collectibles.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.cta}
              href="#contact"
            >
              Contact Us
            </Button>
          </div>
        </Container>

        <Container
          maxWidth="md"
          component="div"
          className={classes.detailSection}
        >
          <Typography
            variant="h3"
            component="p"
            align="center"
            className={classes.introTitle}
          >
            Frequently Asked Questions
          </Typography>
          <br />
          <br />

          {MOCK_FAQS.map((accordion) => (
            <Accordion key={accordion.value}>
              <AccordionSummary
                style={{ height: "80px" }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="h6">
                  <strong>{accordion.heading}</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ height: "140px" }}>
                <Typography variant="subtitle1">{accordion.detail}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          <Grid id="contact" container spacing={2} style={{ margin: "5rem 0" }}>
            <Grid
              item
              xs={12}
              style={{
                background: "rgb(244, 246, 248)",
                borderRadius: "20px",
                padding: "3rem 5rem",
              }}
            >
              <Typography
                variant="h4"
                component="p"
                align="center"
                style={{ fontWeight: "600", color: "#555" }}
              >
                Haven't found the right help?
              </Typography>
              <br />
              <TextField fullWidth label="Name" variant="outlined" />
              <TextField fullWidth label="Email" variant="outlined" />
              <TextField fullWidth label="Subject" variant="outlined" />
              <TextField
                fullWidth
                label="Enter your message here."
                multiline
                rows={4}
                variant="outlined"
              />
              <div className={classes.center}>
                <Button
                  size="large"
                  variant="contained"
                  className={classes.openSea}
                >
                  Send us a Message
                </Button>
              </div>
            </Grid>

            <Grid item xs={12} style={{ margin: "2rem 0" }}>
              <hr />
              <hr />
              <hr />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                component="p"
                align="left"
                className={classes.majorHeading}
              >
                Terms &amp; Conditions
              </Typography>
              <Typography
                variant="body2"
                component="p"
                align="left"
                className={classes.pointHeading}
              >
                Crypto Pills is a collection of Fine Art Digital Collectibles
                (NFTs) running on the Ethereum network. This website is only an
                interface allowing participants to purchase these digital
                collectibles.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                Users are entirely responsible for the safety and management of
                their own private Ethereum wallets and validating all
                transactions and contracts generated by this website before
                approval.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                Furthermore, as the Crypto Pills smart contract runs on the
                Ethereum network, there is no ability to undo, reverse, or
                restore any transactions.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                This website and its connected services are provided “as is” and
                “as available” without warranty of any kind.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                By using this website you are accepting sole responsibility for
                any an all transactions involving Crypto Pills digital
                collectibles.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                You, the owner, agree that you purchase our non-fungible token
                as a Fine Art Digital Collectible.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                Non-fungible tokens should not be seen as an investment.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                The Crypto-Pill is a Fine Art Digital Collectible to be used as
                an avatar, displayed on screens, or to be printed in any format
                on any medium for your personal use. The associated Digital Art
                is high resolution and suitable for large format prints.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                It's a non-fungible token for you to collect.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                You, the owner, understand that the monetary value of this
                Digital Art Asset is in the eye of the beholder, and determined
                by the market, and that it should be treated as a Fine Art
                Digital Collectible, purchased for it’s artistic and cultural
                values.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                You, the owner are entirely responsible for any tax liability
                which may arise from minting or reselling the Crypto-Pill
                non-fungible token.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                You, the owner, agree to waive any class action status, and any
                legal dispute around the project which you may choose to bring
                can only be done on an individual basis.
              </Typography>
              <Typography variant="body2" component="p" align="left">
                The project is not targeted towards children. You agree that you
                are over the age of 18 when you purchase a Crypto-Pill, or above
                the legal age of your jurisdiction, whichever is greater.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                component="p"
                align="left"
                className={classes.majorHeading}
              >
                Ownership
              </Typography>
              <Typography
                variant="body2"
                component="p"
                align="left"
                className={classes.pointHeading}
              >
                <strong>
                  1. You Own the NFT. Each Crypto-Pill is an NFT on the Ethereum
                  blockchain.
                </strong>
              </Typography>
              <Typography variant="body2" component="p" align="left">
                When you purchase an NFT, you own the underlying Crypto-Pill;
                the High Resolution Digital Art, completely. Ownership of the
                NFT is mediated entirely by the Smart Contract and the Ethereum
                Network: at no point may we seize, freeze, or otherwise modify
                the ownership of any Crypto-Pill.
              </Typography>
              <Typography
                variant="body2"
                component="p"
                align="left"
                className={classes.pointHeading}
              >
                <strong>2. Personal Use.</strong>
              </Typography>
              <Typography variant="body2" component="p" align="left">
                Subject to your continued compliance with these Terms,
                Crypto Pills grants you a worldwide, royalty-free license to
                use, copy, display, and print out the purchased Art in any
                medium, solely for the following purposes:
              </Typography>
              <Typography variant="body2" component="p" align="left">
                (<b>A</b>) for your own personal, non-commercial use;
              </Typography>
              <Typography variant="body2" component="p" align="left">
                (<b>B</b>) as part of a marketplace that permits the purchase
                and sale of your Crypto-Pill / NFT, provided that the
                marketplace cryptographically verifies each Crypto Pills owner’s
                rights to display the Art for their Crypto-Pill to ensure that
                only the actual owner can display the Art;
              </Typography>
              <Typography variant="body2" component="p" align="left">
                or (<b>C</b>) as part of a third party website or application
                that permits the inclusion, involvement, or participation of
                your Crypto-Pill, provided that the website/application
                cryptographically verifies each Crypto Pills owner’s rights to
                display the Art for their Crypto Pills, to ensure that only the
                actual owner can display the Art, and provided that the Art is
                no longer visible once the owner of the Crypto-Pill leaves the
                website/application.
              </Typography>
              <Typography
                variant="body2"
                component="p"
                align="left"
                className={classes.pointHeading}
              >
                <strong>3. Disclaimer</strong>
              </Typography>
              <Typography variant="body2" component="p" align="left">
                Crypto Pills have been designed by established pop artist Micha
                Klein, and represent a legit part of digital art history, and a
                recognized cultural value. After all, artwork featuring the
                Pillman character is featured in important international museum
                collections. Therefore we have explicitly chosen not to allow
                commercial use and derivatives, as to not undermine the value of
                the Digital Art Asset as a unique cultural artifact, created and
                authorized by the artist.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
