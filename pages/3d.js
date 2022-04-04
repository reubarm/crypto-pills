import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../hooks/web3-react";
import { useContract } from "../contexts/contractProvider";
import { getTransactionErrorMessage } from "../lib/errors";
import { useSnackbar } from "notistack";
import { ethers } from "ethers";

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import Head from "next/head";
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
    padding: "10rem 0",
    textAlign: "center",
    '@media (max-width: 575px)': {
      padding: "6rem 0",
    },
  },
  title: {
    color: "#fff",
    fontSize: "4rem",
    '@media (max-width: 575px)': {
      fontSize: "2rem",
    },
  },
  subtitle: {
    color: "#fff",
    fontSize: "1.5rem",
    '@media (max-width: 575px)': {
      fontSize: "1rem",
    },
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
    backgroundColor: "#703673",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#873fbd",
    },
    '@media (max-width: 520px)': {
      margin: "2rem 0 0",
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

export default function Admin() {
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = useWeb3React();
  const { CryptoPillsContract, signer } = useContract();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const displayMessage = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant: variant,
    });
  };

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const classes = useStyles();

  const [isOwner, setIsOwner] = React.useState(false);

  useEffect(() => {
    if (!!CryptoPillsContract) {
      CryptoPillsContract.owner()
        .then((value) => {
          setIsOwner(value === account);
        })
        .catch((error) => displayMessage(error, "error"));
    } else {
      displayMessage("Can't find contract", "warning");
    }
  }, [CryptoPillsContract, account]);

  const [contractData, setContractData] = React.useState({
    isOwner: false,
    preSaleActive: false,
    saleActive: false,
    baseUri: null,
    ownerAddress: null,
    ownedTokens: 0,
    contractBalance: ethers.BigNumber.from(0),
  });

  const updateContractData = () => {
    if (!!CryptoPillsContract) {
      let p1 = CryptoPillsContract.owner();
      let p2 = CryptoPillsContract.preSaleActive();
      let p3 = CryptoPillsContract.saleActive();
      let p4 = CryptoPillsContract.baseURI();
      let p5 = CryptoPillsContract.balanceOf(account);
      let p6 = library.getBalance(CryptoPillsContract.address);

      Promise.all([p1, p2, p3, p4, p5, p6])
        .then((values) => {
          setContractData({
            isOwner: values[0] === account,
            ownerAddress: values[0],
            preSaleActive: values[1],
            saleActive: values[2],
            baseUri: values[3],
            ownedTokens: values[4].toNumber(),
            contractBalance: values[5],
          });
        })
        .catch((error) => displayMessage(error, "error"));
    } else {
      console.warn("Can't find smart contract");
    }
  };

  useEffect(updateContractData, [CryptoPillsContract, account]);

  const [tokensMinted, setTokensMinted] = React.useState(0);

  const transferEventListener = (from, to, tokenId) => {
    CryptoPillsContract.totalSupply()
      .then((value) => setTokensMinted(value.toNumber()))
      .catch((error) =>
        displayMessage(
          `Error retrieving total supply: ${getErrorMessage(error)}`,
          "error"
        )
      );
  };

  useEffect(() => {
    if (!!CryptoPillsContract) {
      CryptoPillsContract.totalSupply()
        .then((value) => setTokensMinted(value.toNumber()))
        .catch((error) =>
          displayMessage(
            `Error retrieving total supply: ${getErrorMessage(error)}`,
            "error"
          )
        );

      CryptoPillsContract.on("Transfer", transferEventListener);

      return () => CryptoPillsContract.off("Transfer", transferEventListener);
    } else {
      console.warn("Can't find smart contract");
      //setErrorMessage("Contract doesn't exist");
    }
  }, [CryptoPillsContract]);

  const [processing, setProcessing] = React.useState(false);

  const [newBaseUri, setNewBaseUri] = React.useState("");

  const setBaseUri = () => {
    if (!processing) {
      if (active) {
        setProcessing(true);

        CryptoPillsContract.connect(signer)
          .setBaseURI(newBaseUri)
          .catch((error) =>
            displayMessage(getTransactionErrorMessage(error), "error")
          )
          .then((transaction) => {
            transaction.wait().then((receipt) => {
              updateContractData();
            });
            setProcessing(false);
          });
      }
    }
  };

  const withdrawFunds = () => {
    if (!processing) {
      if (active) {
        setProcessing(true);

        CryptoPillsContract.connect(signer)
          .withdraw()
          .catch((error) =>
            displayMessage(getTransactionErrorMessage(error), "error")
          )
          .then((transaction) => {
            transaction.wait().then((receipt) => {
              updateContractData();
            });
            setProcessing(false);
          });
      }
    }
  };

  const [newOwnerAddress, setNewOwnerAddress] = React.useState("");

  const transferOwnership = () => {
    if (!processing) {
      if (active) {
        setProcessing(true);

        CryptoPillsContract.connect(signer)
          .transferOwnership(newOwnerAddress)
          .catch((error) =>
            displayMessage(getTransactionErrorMessage(error), "error")
          )
          .then((transaction) => {
            transaction.wait().then((receipt) => {
              updateContractData();
            });
            setProcessing(false);
          });
      }
    }
  };

  const [tokensToReserve, setTokensToReserve] = React.useState(0);

  const reserveTokens = () => {
    if (!processing) {
      if (active) {
        setProcessing(true);

        CryptoPillsContract.connect(signer)
          .reserve(tokensToReserve)
          .catch((error) =>
            displayMessage(getTransactionErrorMessage(error), "error")
          )
          .then((transaction) => {
            transaction.wait().then((receipt) => {
              updateContractData();
            });
            setProcessing(false);
          });
      }
    }
  };

  const [newWhitelistAddress, setNewWhitelistAddress] = React.useState("");

  const addToWhitelist = () => {
    if (!processing) {
      if (active) {
        setProcessing(true);

        CryptoPillsContract.connect(signer)
          .addToWhitelist([newWhitelistAddress])
          .catch((error) =>
            displayMessage(getTransactionErrorMessage(error), "error")
          )
          .then((transaction) => {
            displayMessage(`adding address`, "info");
            transaction.wait().then((receipt) => {
              displayMessage(`address added`, "success");
              setNewWhitelistAddress("");
            });
            setProcessing(false);
          });
      }
    }
  };

  const [checkWhitelistAddress, setCheckWhitelistAddress] = React.useState("");

  const checkWhitelist = () => {
    if (!processing) {
      if (active) {
        setProcessing(true);

        CryptoPillsContract.connect(signer)
          .isOnWhitelist(checkWhitelistAddress)
          .then((isOnWhitelist) => {
            displayMessage(
              `${checkWhitelistAddress} is ${
                isOnWhitelist ? "" : "not"
              } on the whitelist.`,
              isOnWhitelist ? "success" : "error"
            );
          })
          .catch((error) =>
            displayMessage(getTransactionErrorMessage(error), "error")
          )
          .then(() => {
            setProcessing(false);
          });
      }
    }
  };

  const [nfts, setNfts] = React.useState([]);
  const [howmany, setHowmany] = React.useState([]);
  const options = { method: "GET", headers: { Accept: "application/json" } };

  useEffect(() => {
    if (!!CryptoPillsContract) {
      let accountAddress = "";
      accountAddress = account;
      fetch(
        `https://api.opensea.io/api/v1/assets?format=json&owner=${account}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setNfts(response.assets);
          setHowmany(response.assets.length);
        })
        .catch((err) => console.error(err));
    }
  }, [CryptoPillsContract, account]);


 const filteredNfts = nfts.filter((nft) => nft.collection.payout_address === "0xb41f146670ce3dedac51d79956cd5e292be26ec4");

  console.log(nfts);
  console.log(howmany);

  return (
    <>
      
      <Head>
        <title>3D Crypto Pills | Crypto Pills</title>
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
           {(CryptoPillsContract ? `You have ${howmany} Crypto Pills` : "You don't have any Crypto Pills")}
           <span style={{display: 'block', margin: '1.5rem'}}>💊😊</span>
          </Typography>
          <br />
          <Grid item sx={12} md={12} className={classes.gridCell}>
          {filteredNfts.map((nft, index) => {
            return (
              index < 6 && (
                <>
                  <a href={nft.permalink} target="_blank" rel="noopener">
                    <img
                      src={nft.image_url}
                      width="190"
                      style={{
                        display: "inline-block",
                        margin: "0.4rem",
                        borderRadius: "15px",
                      }}
                    />
                  </a>
                </>
              )
            );
          })}
          </Grid>
          <br/>
          <Typography
            variant="body2"
            component="p"
            className={classes.subtitle}
          >
            {(CryptoPillsContract ? `You are officially a Gold Member, because you are the owner of ${howmany} Crypto Pills.` : "If you own a Crypto Pill, you can become an exclusive member of the community and mint for free.")}
            
          </Typography>
          <br />
          <Typography
            variant="body2"
            component="p"
            className={classes.subtitle}
          >
            {(CryptoPillsContract ? `Mint some of the rarest and best for FREE - you're amazing!` : `Mint our new 3D Crypto Pills for 0.1 ETH` )}
            
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.openSea}
            onClick={() => alert("Coming soon!")}
          >
            {(CryptoPillsContract ? "Mint 3D Crypto Pill for FREE" : "Mint 3D Crypto Pill for 0.1 ETH" )}
          </Button>
        </Container>
      </Container>



          {/* <Grid item sx={12} md={12} className={classes.gridCell}>
            <Typography
              variant="h4"
              component="p"
              align="center"
            >{`Tokens Minted: ${tokensMinted}`}</Typography>
          </Grid>

          <Grid item sx={12} md={12}>
            <Divider />
          </Grid>

          <Grid item sx={12} md={5} className={classes.gridCell}>
            <Typography
              variant="body1"
              component="p"
              className={classes.textValue}
            >{`Pre-sale is currently ${
              contractData.preSaleActive ? "active" : "inactive"
            }`}</Typography>
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}></Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}>
            <Typography
              variant="body1"
              component="p"
              className={classes.textValue}
            >{`Sale is currently ${
              contractData.saleActive ? "active" : "inactive"
            }`}</Typography>
          </Grid>

          <Grid item sx={12} md={12}>
            <Divider />
          </Grid>

          <Grid item sx={12} md={5} className={classes.gridCell}>
            <TextField
              fullWidth
              variant="outlined"
              label="Base URI"
              className={classes.input}
              value={newBaseUri}
              onChange={(e) => setNewBaseUri(e.target.value)}
            />
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}>
            <Button
              variant="contained"
              disabled={!active || !isOwner}
              onClick={setBaseUri}
              className={classes.button}
            >
              Set Base URI
            </Button>
          </Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}>
            <Typography
              variant="body1"
              component="p"
              className={classes.textValue}
            >
              {contractData.baseUri}
            </Typography>
          </Grid>

          <Grid item sx={12} md={12}>
            <Divider />
          </Grid>

          <Grid item sx={12} md={5} className={classes.gridCell}>
            <Typography
              variant="body1"
              component="p"
              className={classes.textValue}
            >
              Current contract balance:{" "}
              {ethers.utils.formatUnits(contractData.contractBalance, "ether")}
            </Typography>
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}>
            <Button
              variant="contained"
              disabled={!active || !isOwner}
              onClick={withdrawFunds}
              className={classes.button}
            >
              Withdraw Funds
            </Button>
          </Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}>
            <Typography
              variant="body1"
              component="p"
              className={classes.textValue}
            >
              Withdraw to {contractData.ownerAddress}
            </Typography>
          </Grid>

          <Grid item sx={12} md={12}>
            <Divider />
          </Grid>

          <Grid item sx={12} md={5} className={classes.gridCell}>
            <TextField
              fullWidth
              variant="outlined"
              label="New Owner Wallet"
              className={classes.input}
              value={newOwnerAddress}
              onChange={(e) => setNewOwnerAddress(e.target.value)}
            />
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}>
            <Button
              variant="contained"
              disabled={!active || !isOwner}
              onClick={transferOwnership}
              className={classes.button}
            >
              Transfer Ownership
            </Button>
          </Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}>
            <Typography
              variant="body1"
              component="p"
              className={classes.textValue}
            >
              {contractData.ownerAddress}
            </Typography>
          </Grid>

          <Grid item sx={12} md={12}>
            <Divider />
          </Grid>

          <Grid item sx={12} md={5} className={classes.gridCell}>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="# Tokens To Reserve"
              className={classes.input}
              value={tokensToReserve}
              onChange={(e) => setTokensToReserve(e.target.value)}
            />
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}>
            <Button
              variant="contained"
              disabled={!active || !isOwner}
              onClick={reserveTokens}
              className={classes.button}
            >
              Reserve Tokens
            </Button>
          </Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}>
            <Typography
              variant="body1"
              component="p"
              className={classes.textValue}
            >{`You currently hold ${contractData.ownedTokens} NFTs`}</Typography>
          </Grid>

          <Grid item sx={12} md={12}>
            <Divider />
          </Grid>

          <Grid item sx={12} md={5} className={classes.gridCell}>
            <TextField
              fullWidth
              variant="outlined"
              label="Add Whitelist Address"
              className={classes.input}
              value={newWhitelistAddress}
              onChange={(e) => setNewWhitelistAddress(e.target.value)}
            />
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}>
            <Button
              variant="contained"
              disabled={!active || !isOwner}
              onClick={() => addToWhitelist()}
              className={classes.button}
            >
              Submit Whitelist
            </Button>
          </Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}></Grid>

          <Grid item sx={12} md={12}>
            <Divider />
          </Grid>

          <Grid item sx={12} md={5} className={classes.gridCell}>
            <TextField
              fullWidth
              variant="outlined"
              label="Check Whitelist Address"
              className={classes.input}
              value={checkWhitelistAddress}
              onChange={(e) => setCheckWhitelistAddress(e.target.value)}
            />
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}>
            <Button
              variant="contained"
              disabled={!active || !isOwner}
              onClick={() => checkWhitelist()}
              className={classes.button}
            >
              Check Whitelist
            </Button>
          </Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}></Grid>
          <Grid item sx={12} md={5} className={classes.gridCell}>
            <TextField
              fullWidth
              variant="outlined"
              label="New Owner Wallet"
              className={classes.input}
              value={newOwnerAddress}
              onChange={(e) => setNewOwnerAddress(e.target.value)}
            />
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}>
            <Button
              variant="contained"
              disabled={!active || !isOwner}
              onClick={transferOwnership}
              className={classes.button}
            >
              Transfer Ownership
            </Button>
          </Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}>
            <Typography
              variant="body1"
              component="p"
              className={classes.textValue}
            >
              {contractData.ownerAddress}
            </Typography>
          </Grid>

          <Grid item sx={12} md={12}>
            <Divider />
          </Grid>

          <Grid item sx={12} md={5} className={classes.gridCell}>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="# Tokens To Reserve"
              className={classes.input}
              value={tokensToReserve}
              onChange={(e) => setTokensToReserve(e.target.value)}
            />
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}>
            <Button
              variant="contained"
              disabled={!active || !isOwner}
              onClick={reserveTokens}
              className={classes.button}
            >
              Reserve Tokens
            </Button>
          </Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}>
            <Typography
              variant="body1"
              component="p"
              className={classes.textValue}
            >{`You currently hold ${contractData.ownedTokens} NFTs`}</Typography>
          </Grid>

          <Grid item sx={12} md={12}>
            <Divider />
          </Grid>

          <Grid item sx={12} md={5} className={classes.gridCell}>
            <TextField
              fullWidth
              variant="outlined"
              label="Add Whitelist Address"
              className={classes.input}
              value={newWhitelistAddress}
              onChange={(e) => setNewWhitelistAddress(e.target.value)}
            />
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}>
            <Button
              variant="contained"
              disabled={!active || !isOwner}
              onClick={() => addToWhitelist()}
              className={classes.button}
            >
              Submit Whitelist
            </Button>
          </Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}></Grid>

          <Grid item sx={12} md={12}>
            <Divider />
          </Grid>

          <Grid item sx={12} md={5} className={classes.gridCell}>
            <TextField
              fullWidth
              variant="outlined"
              label="Check Whitelist Address"
              className={classes.input}
              value={checkWhitelistAddress}
              onChange={(e) => setCheckWhitelistAddress(e.target.value)}
            />
          </Grid>
          <Grid item sx={12} md={3} className={classes.gridCell}>
            <Button
              variant="contained"
              disabled={!active || !isOwner}
              onClick={() => checkWhitelist()}
              className={classes.button}
            >
              Check Whitelist
            </Button>
          </Grid>
          <Grid item sx={12} md={4} className={classes.gridCell}></Grid>
        </Grid> */}
      <Footer />
    </>
  );
}