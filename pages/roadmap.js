import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../hooks/web3-react";
import Head from "next/head";
import { useRouter } from "next/router";

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
import { TwitterIcon, DiscordIcon, InstagramIcon } from "../components/Icons";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AOS from "aos";

export default function Home() {
  const { active } = useWeb3React();
  const router = useRouter();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const theme = useTheme();
  // const classes = useStyles();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <Head>
        <title>
          Crypto Pills | NFTs, Games, Movies and Merchandise by Micha Klein
        </title>
        <meta
          name="description"
          content="Micha Klein’s digital art has been around for over 30 years, and is not going away."
        />
      </Head>

      <Container
        id="top-anchor"
        maxWidth={false}
        component="main"
        // className={classes.root}
      >
        <Header />
      </Container>

      <>
        <>
          {/* PageTitle */}
          <section className="tf-section page-title mt-50">
            <div className="container">
              <div className="col-md-12">
                <div className="page-title__body rm">
                  <div className="block-text pt-12 center-mb">
                    <h2 className="sub-title mb-20">
                      Roadmap &amp;
                      <br />
                      Achievements
                    </h2>
                    <p className="fs-24 mb-33">
                      We have already rolled out a large portion of <br/>our roadmap
                      and have some very exciting perks,<br/> projects and benefits
                      coming soon!
                    </p>
                  </div>
                  <img src="/roadmap.jpeg" alt="Road Map" className="hide-mb" />
                </div>
              </div>
            </div>
          </section>
          {/* end PageTitle */}

          {/* Road Map */}
          <section className="tf-section road-map mt-27" id="roadmap">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="block-text center">
                    <h1
                      className="heading-bg"
                      data-aos="fade-in"
                      data-aos-duration={1000}
                    >
                      <span>Road Map</span>
                    </h1>

                    <h3
                      className="title mb-28"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                    >
                      The Journey of <br /> Crypto Pills
                    </h3>
                    <h4
                      className="sub-title mb-10"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                    >
                      {/* Road Map */}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="road-map__content s1">
                    <div
                      className="box-time left"
                      data-aos="fade-right"
                      data-aos-offset={300}
                    >
                      <span data-aos="zoom-in" data-aos-offset={300}>
                        <i className="fa fa-check" />
                      </span>
                      <div className="rm-box">
                        <div className="rm-tite full-width">
                          <p className="fs-16 color-main mb-2"></p>
                          <h4 className="title mb-10">August 2021</h4>
                        </div>
                        <div
                          className="rm-photo"
                        >
                          <img src="/Avatar-Large.19.png" alt="" className="rm-icon" />
                        </div>
                      </div>

                      <p className="fs-18">
                        <br />
                        Artist donates 5% of of sales to Save The Children
                        Charity for children in need worldwide, which is written
                        in the Smart Contract for full transparency.
                        <br />
                        <br />
                        Airdrop of 10 Crypto-Pills to random Pill owners.
                        <br />
                        <br />
                        Upgraded role in Discord for holders by number of pills.
                      </p>
                    </div>
                    <div
                      className="box-time right mt-223"
                      data-aos="fade-up"
                      data-aos-offset={300}
                    >
                      <span data-aos="zoom-in" data-aos-offset={300}>
                        <i className="fa fa-check" />
                      </span>
                      <div className="rm-box">
                        <div className="rm-tite full-width">
                          <p className="fs-16 color-main mb-0"></p>
                          <h4 className="title mb-20">September 2021</h4>
                        </div>
                        <div
                          className="rm-photo"
                        >
                          <img src="/Avatar-Large.18.png" alt="" className="rm-icon"/>
                        </div>
                      </div>

                      <p className="fs-18">
                        {" "}
                        <br />
                        Airdrop of 10 Crypto-Pills to random Pill owners
                        <br />
                        <br />2 POAPS with future utility released for white
                        list and official launch minters
                        <br />
                        <br />
                        The 20 most active Pill owner members in the Discord
                        server received a physical OG Pillman Giclee print of
                        their Crypto-Pill Edition 1/1, and signed by artist
                        <br />
                        <br />
                        Crypto Pills Billboard on Times Square with release POAP
                        for all holders
                        <br />
                        <br />
                        Production of a pair of handmade custom Crypto Pills
                        sneakers started for winner raffle
                        <br />
                        <br />
                        The project enters the Metaverse; CryptoVoxels land
                        purchased on Vibes Island for Pill Parties, and Crypto
                        Pills Club / Gallery build
                        <br />
                        <br />
                        3D Pillman AR Snapchat Filter released
                      </p>
                    </div>
                    <div
                      className="box-time left"
                      data-aos="fade-right"
                      data-aos-offset={0}
                      style={{marginTop: '-400px'}}
                    >
                      <span data-aos="zoom-in" data-aos-offset={300}>
                        <i className="fa fa-check" />
                      </span>
                      <div className="rm-box">
                        <div className="rm-tite full-width">
                          <p className="fs-16 color-main mb-2"></p>
                          <h4 className="title mb-10">October 2021</h4>
                        </div>
                        <div
                          className="rm-photo"
                        >
                          <img src="/Avatar-Large.17.png" alt="" className="rm-icon" />
                        </div>
                      </div>

                      <p className="fs-18">
                        <br />
                        30 limited edition official Crypto Pills T-Shirts for
                        the most active and loyal members on our Discord and
                        Clubhouse
                        <br />
                        <br />
                        Airdrops of Crypto Pills wearables by Eddy Gangland for
                        Cryptovoxels with big party in Cryptovoxels
                        <br />
                        <br />
                        NFTX Liquidity Pool implemented
                        <br />
                        <br />
                        Start of the DTP Pharmacy exclusive merch shop.
                        <br />
                        <br />
                        Presentation of test for animated shorts with 3D and 2D
                        animations & Collaboration with Hollywood director
                        announced Announcement $PILLCOIN token for community
                        economics
                        <br />
                        <br />
                        Free Halloween airdrop for top holders and giveaway of
                        60 Spooky Pills limited edition and 1/1 NFTs Halloween
                        POAP in 3K resolution for all holders with future
                        utility released
                      </p>
                    </div>
                    <div
                      className="box-time right mt-223"
                      data-aos="fade-up"
                      data-aos-offset={300}
                    >
                      <span data-aos="zoom-in" data-aos-offset={300}>
                        <i className="fa fa-check" />
                      </span>
                      <div className="rm-box">
                        <div className="rm-tite full-width">
                          <p className="fs-16 color-main mb-0"></p>
                          <h4 className="title mb-20">November 2021</h4>
                        </div>
                        <div
                          className="rm-photo"
                        >
                          <img src="/Avatar-Large.15.png" alt="" className="rm-icon" />
                        </div>
                      </div>

                      <p className="fs-18">
                        <br />
                        Artist & founder of Crypto Pills awarded Best Digital
                        NFT Artist 2021 at NFT.NYC Convention New York <br />
                        <br />
                        Crypto Pills sponsors NFT Hypebeast party, New York{" "}
                        <br />
                        <br />
                        Crypto Pills sponsors NFT.me launch party, New York{" "}
                        <br />
                        <br />
                      </p>
                    </div>
                    <div
                      className="box-time left"
                      data-aos="fade-right"
                      data-aos-offset={300}
                    >
                      <span data-aos="zoom-in" data-aos-offset={300}>
                        <i className="fa fa-check" />
                      </span>
                      <div className="rm-box">
                        <div className="rm-tite full-width">
                          <p className="fs-16 color-main mb-2"></p>
                          <h4 className="title mb-10">December 2021</h4>
                        </div>
                        <div
                          className="rm-photo"
                        >
                          <img src="/Avatar-Large.16.png" alt="" className="rm-icon" />
                        </div>
                      </div>

                      <p className="fs-18">
                        <br />
                        Release Crypto Pill Rap Anthem by US Rap artist Artzy<br/><br/>
                        Thanksgiving Pills airdrops for qualified holders<br/><br/>
                        Christmas Pills drop, all sales were donated to Save The
                        Children charity <br/><br/>New Year's Party in Cryptovoxels.
                      </p>
                    </div>
                    <div
                      className="box-time right mt-223"
                      data-aos="fade-up"
                      data-aos-offset={300}
                    >
                      <span data-aos="zoom-in" data-aos-offset={300}>
                        <i className="fa fa-check" />
                      </span>
                      <div className="rm-box">
                        <div className="rm-tite full-width">
                          <p className="fs-16 color-main mb-0"></p>
                          <h4 className="title mb-20">January 2022</h4>
                        </div>
                        <div
                          className="rm-photo"
                        >
                          <img src="/Avatar-Large.14.png" alt="" className="rm-icon" />
                        </div>
                      </div>

                      <p className="fs-18">
                        <br />
                        Release of Crypto Pills Origins web3 video game beta.<br/><br/>
                        Holders can login with Metamask and use one of their
                        Crypto Pills as character. <br/><br/>Start of the Crypto Pills
                        Merch give aways. <br/><br/>Everyone buying 3 pills in Q1 gets
                        free t-shirt. 6 pills: free sweater, 9 pills free
                        hoodie, 15 pills free skateboard. for every 25 sales a
                        t-shirt is raffled.
                        <br />
                        <br />
                      </p>
                    </div>
                    <div
                      className="box-time left"
                      data-aos="fade-right"
                      data-aos-offset={300}
                    >
                      <span data-aos="zoom-in" data-aos-offset={300}>
                        <i className="fa fa-check" />
                      </span>
                      <div className="rm-box">
                        <div className="rm-tite full-width">
                          <p className="fs-16 color-main mb-2"></p>
                          <h4 className="title mb-10">February 2022</h4>
                        </div>
                        <div
                          className="rm-photo"
                        >
                          <img src="/Avatar-Large.12.png" alt="" className="rm-icon" />
                        </div>
                      </div>

                      <p className="fs-18">
                        <br />
                        Crypto Pills to the Moon part 1. A 24 carat gold
                        physical Crypto Pill was launched into space, and
                        received at the International Space Station, where it
                        will stay and circle the earth for one year, before it
                        returns to earth. <br/><br/>Part 2; It's next journey, will be in
                        2023, to it's final destination. It will be aboard the
                        moon lander and stay on the moon forever, as the first
                        NFT project on the moon.
                      </p>
                    </div>
                    <div
                      className="box-time right mt-223"
                      data-aos="fade-up"
                      data-aos-offset={300}
                    >
                      <span data-aos="zoom-in" data-aos-offset={300}>
                        <i className="fa fa-check" />
                      </span>
                      <div className="rm-box">
                        <div className="rm-tite full-width">
                          <p className="fs-16 color-main mb-0"></p>
                          <h4 className="title mb-20">March 2022</h4>
                        </div>
                        <div
                          style={{
                            width: "50px",
                            display: "inline",
                            marginTop: "-25px",
                          }}
                          
                        >
                          <img src="/Avatar-Large.13.png" alt="" className="rm-icon" />
                        </div>
                      </div>

                      <p className="fs-18">
                        <br />
                        A custom pair of Nike / Crypto Pills sneakers is sent
                        out to raffle winner. filming for NFT.me documentary,
                        with interview Micha is done in Bali. 
                        
                        <br/><br/>It will be
                        broadcasted internationally and channels like Amazon and
                        many others. Launch new Crypto Pills Website Bridge
                        merch store and Metamask.
                        <br />
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* end Road Map */}

          {/* Action */}
          <section className="tf-section newsletter">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="newsletter__body" data-aos="fade-up">
                    <div className="block-text">
                      <h3
                        className="mb-13"
                        style={{ color: "white", marginTop: "20px" }}
                      >
                        Let's be Friends
                      </h3>
                      <p
                        className="fs-21 mb-7"
                        style={{ color: "white", marginBottom: "20px" }}
                      >
                        Join us on our journey to the moon.
                      </p>
                    </div>
                    <div
                      style={{
                        width: "300px",
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "20px 0",
                      }}
                    >
                      <Link
                        href="https://twitter.com/pills_crypto"
                        target="_blank"
                        rel="noopener"
                        style={{ color: "#a8c6dc" }}
                      >
                        <TwitterIcon style={{ fontSize: 70 }} />
                      </Link>
                      <Link
                        href="https://discord.gg/UV4FnNGYdp"
                        target="_blank"
                        rel="noopener"
                        style={{ color: "#a8c6dc" }}
                      >
                        <DiscordIcon style={{ fontSize: 70 }} />
                      </Link>
                      <Link
                        href="https://www.instagram.com/cryptopills_official"
                        target="_blank"
                        rel="noopener"
                        style={{ color: "#a8c6dc" }}
                      >
                        <InstagramIcon style={{ fontSize: 70 }} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* end Action */}
        </>
      </>

      <Footer />
    </>
  );
}
