import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../hooks/web3-react";
import { useContract } from "../contexts/contractProvider";
import { getTransactionErrorMessage } from "../lib/errors";
import { useSnackbar } from "notistack";
import { ethers } from "ethers";

import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import WalletButton from "../components/Header/WalletButton";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import useStyles from "../themes/useStyles";

export default function Account() {
  const { account } = useWeb3React();
  const { CryptoPillsAnthemContract, signer } = useContract();

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
    if (!!CryptoPillsAnthemContract) {
      CryptoPillsAnthemContract.owner()
        .then((value) => {
          setIsOwner(value === account);
        })
        .catch((error) => displayMessage(error, "error"));
    } else {
      displayMessage("Can't find contract", "warning");
    }
  }, [CryptoPillsAnthemContract, account]);

  const [nfts, setNfts] = React.useState([]);
  const [username, setUsername] = React.useState([]);
  const [howmany, setHowmany] = React.useState([]);
  const [yessir, setYessir] = React.useState(false);
  const options = { method: "GET", headers: { Accept: "application/json" } };

  // 0xb41F146670Ce3DEdac51D79956Cd5E292be26EC4

  useEffect(() => {
    if (!!CryptoPillsAnthemContract) {
      let accountAddress = "";
      accountAddress = account;
      fetch(
        `https://api.opensea.io/api/v1/assets?format=json&owner=${accountAddress}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setNfts(response.assets);
          setUsername(response.assets[0].owner.user.username);
        })
        .catch((err) => console.error(err));
    }
  }, [CryptoPillsAnthemContract, account]);

  const filteredNfts = nfts.filter(
    (nft) =>
      nft.collection.payout_address ===
      "0xb41f146670ce3dedac51d79956cd5e292be26ec4"
  );

  useEffect(() => {
    setHowmany(filteredNfts.length);
  }, [filteredNfts]);

  useEffect(() => {
    if (howmany > 0) {
      setYessir(true);
    }
  }, [filteredNfts]);

  var today = new Date();
  var curHr = today.getHours();
  let welcome;
  if (curHr < 12) {
    welcome = "Good morning";
  } else if (curHr < 18) {
    welcome = "Good afternoon";
  } else {
    welcome = "Good evening";
  }

  function mintAnthem() {
    CryptoPillsAnthemContract.connect(signer).mint();
  }

  return (
    <>
      <Head>
        <title>Your Pillman Account | Crypto Pills</title>
        <meta
          name="description"
          content="Micha Klein's digital art has been around for over 30 years, and is not going away."
        />
      </Head>
      <Container
        id="top-anchor"
        maxWidth={false}
        component="main"
        className={classes.root}
      >
        <Header />
        {!CryptoPillsAnthemContract ? (
          <>
            <section className="tf-section page-title mt-50">
              <div className="container">
                <div className="col-md-12">
                  <div className="page-title__body rm">
                    <div className="block-text pt-12 center">
                      <h3 className="sub-title mb-33">
                        Please login to your MetaMask wallet with Crypto Pills
                        to access your account
                      </h3>
                      <br />
                      <br />

                      <WalletButton />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="tf-section page-title mt-50">
              <div className="container">
                <div className="col-md-12">
                  <div className="page-title__body rm">
                    <div className="block-text pt-12 center-mb">
                      {!yessir ? (
                        <>
                          <h3 className="sub-title mb-33">{welcome} </h3>
                          <h5 className="fs-24 mb-10">
                            You don't have any Crypto Pills in this wallet yet.
                          </h5>
                          <h5 className="fs-24 mb-10">
                            Join our community and enjoy the benefits!
                          </h5>
                          <br />
                          <a
                            href="https://opensea.io/collection/crypto-pills-by-micha-klein"
                            target="_blank"
                            rel="noopener"
                            className="btn-action style-3"
                          >
                            View Collection on OpenSea
                          </a>
                        </>
                      ) : (
                        <>
                          <h3 className="sub-title mb-33">
                            {welcome}
                            <span
                              style={{
                                color: "#3b5397",
                                fontSize: "23px",
                                margin: "0 0 20px",
                                display: "block",
                              }}
                            >
                              {/* {( username ? username : <></>)} */}
                            </span>
                          </h3>
                          <h5 className="fs-24 mb-10">
                            You have {howmany} Pillman - that's awesome 💊
                          </h5>
                          <h5 className="fs-24 mb-10">
                            You can now mint the Crypto Pills Anthem for free 🎵
                          </h5>
                          <br />
                          <br />
                          <a
                            onClick={mintAnthem}
                            className="btn-action style-3"
                          >
                            Mint Cryto Pills Anthem
                          </a>
                        </>
                      )}
                    </div>

                    {filteredNfts.map((nft, index) => {
                      return (
                        index < 1 && (
                          <>
                            <a
                              href={nft.permalink}
                              target="_blank"
                              rel="noopener"
                            >
                              <img src={nft.image_url} className="hide-mb" />
                            </a>
                          </>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {!yessir ? (
              <></>
            ) : (
              <>
                {" "}
                <section className="tf-section mt-53">
                  <div className="container">
                    <div className="row" style={{ textAlign: "center" }}>
                      <h3
                        className="title mb-28"
                        data-aos="fade-up"
                        data-aos-duration={1000}
                      >
                        Your Crypto Pills
                      </h3>

                      <div style={{ flexDirection: "row" }}>
                        {filteredNfts.map((nft, index) => {
                          return (
                            index < 12 && (
                              <>
                                <a
                                  href={nft.permalink}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  <img
                                    src={nft.image_url}
                                    className="os-photo"
                                  />
                                  <br />
                                </a>
                              </>
                            )
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
            {!yessir ? (
              <></>
            ) : (
              <>
                <section className="tf-section hero-slider">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-6 col-md-6 col-12">
                        <div className="block-text pt-24 mt-27">
                          <h6 className="sub-title mb-6" data-aos={"fade-up"}>
                            Crypto Pills Benefits for You
                          </h6>
                          <h2 className="title mb-26" data-aos="fade-up">
                            Exclusive 50% Off Merchandise
                          </h2>
                          <p className="mb-20 fs-18" data-aos="fade-up">
                            Enjoy the benefits of being a Crypto Pills Gold
                            Member with a 50% discount on the new Crypto Pills
                            merchandise that was dropped this week, with lots
                            more cool merch to come!
                            <br />
                            <br />
                          </p>
                          <a
                            href="https://dropthepill.com/collections/crypto-pills"
                            className="btn-action style-2"
                            data-aos="fade-up"
                            data-aos-duration={1200}
                          >
                            Visit DropThePill Store
                          </a>
                        </div>
                      </div>
                      <div className="col-xl-6 col-md-6 col-12">
                        <div className="content-right d-flex mt-50">
                          <div
                            style={{ borderRadius: "30px", overflow: "hidden" }}
                          >
                            <a href="https://dropthepill.com/products/blue-bucket-hat-gang-hoodie">
                              <img
                                src="/images/store4.png"
                                width="240"
                                height="260"
                                style={{ display: "inline" }}
                              />
                            </a>
                            <a href="https://dropthepill.com/collections/crypto-pills/products/crypto-pill-mint-t-shirt">
                              <img
                                src="/images/store3.png"
                                width="240"
                                height="260"
                                style={{ display: "inline" }}
                              />
                            </a>
                            <a href="https://dropthepill.com/collections/crypto-pills/products/crypto-pills-origins-t-shirt">
                              <img
                                src="/images/store1.png"
                                width="240"
                                height="260"
                                style={{ display: "inline" }}
                              />
                            </a>
                            <a href="https://dropthepill.com/collections/crypto-pills/products/pink-peruvian-raver-hoodie">
                              <img
                                src="/images/store2.png"
                                width="240"
                                height="260"
                                style={{ display: "inline" }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
