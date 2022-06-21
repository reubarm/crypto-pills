import { useEffect } from "react";
import Head from "next/head";
import { Link, Container } from "@material-ui/core";
import { TwitterIcon, DiscordIcon, InstagramIcon } from "../components/Icons";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AOS from "aos";

export default function Press() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <Head>
        <title>
          Press | Crypto Pills NFTs, Games, Movies and Merchandise by Micha Klein
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
        <section className="tf-section page-title mt-50">
          <div className="container">
            <div className="col-md-12">
              <div
                className="page-title__body rm"
                style={{ background: "#3e61b9" }}
              >
                <div className="block-text">
                  <h2 className="sub-title mb-20 whitetext">
                    Crypto Pills News
                  </h2>
                  <p className="fs-24 mb-33 whitetext">
                    We have made headlines with Crypto Pills so far;
                    <br />
                    and there's many more exciting stories to come!
                  </p>
                </div>
                <img src="/press.jpeg" alt="Latest News" className="hide-mb" />
              </div>
            </div>
          </div>
        </section>
        {/* end PageTitle */}
        {/* Blog grid */}
        <section className="blog-grid">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="blog-box">
                  <div className="blog-img">
                    <a
                      href="https://nfts.wtf/crypto-pills-are-popping-30-years-of-music-and-digital-art-history-nfts/"
                      target="_blank"
                      rel="nofollow"
                    >
                      <img
                        src="/images/banner.jpeg"
                        alt="Monteno"
                        height="250"
                      />
                    </a>
                  </div>
                  <div className="blog-content">
                    <ul class="meta">
                      <li>
                        <a
                          href="https://nfts.wtf/crypto-pills-are-popping-30-years-of-music-and-digital-art-history-nfts/"
                          target="_blank"
                          rel="nofollow"
                        >
                          NFTs.wtf
                        </a>
                      </li>
                    </ul>
                    <a
                      href="https://nfts.wtf/crypto-pills-are-popping-30-years-of-music-and-digital-art-history-nfts/"
                      className="title h4"
                      target="_blank"
                      rel="nofollow"
                    >
                      Crypto Pills are Popping! 30 Years of Music and Digital
                      Art History NFTs with Micha Klein
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="blog-box">
                  <div className="blog-img">
                    <a
                      href="https://lawire.com/blockchain-creative-powerhouse-micha-klein-bags-first-ever-best-digital-nft-artist-award/"
                      target="_blank"
                      rel="nofollow"
                    >
                      <img src="/artwork.png" alt="Monteno" height="250" />
                    </a>
                  </div>
                  <div className="blog-content">
                    <ul class="meta">
                      <li>
                        <a
                          href="https://lawire.com/blockchain-creative-powerhouse-micha-klein-bags-first-ever-best-digital-nft-artist-award/"
                          target="_blank"
                          rel="nofollow"
                        >
                          lawire.com
                        </a>
                      </li>
                    </ul>
                    <a
                      href="https://lawire.com/blockchain-creative-powerhouse-micha-klein-bags-first-ever-best-digital-nft-artist-award/"
                      className="title h4"
                      target="_blank"
                      rel="nofollow"
                    >
                      Blockchain Creative Powerhouse Micha Klein Bags First Ever
                      ‘Best Digital NFT Artist’ Award
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="blog-box">
                  <div className="blog-img">
                    <a
                      href="https://nftevening.com/crypto-pills-nft-collectible-based-on-micha-kleins-pillman/"
                      target="_blank"
                      rel="nofollow"
                    >
                      <img src="/artgallery.png" alt="Monteno" height="250" />
                    </a>
                  </div>
                  <div className="blog-content">
                    <ul class="meta">
                      <li>
                        <a
                          href="https://nftevening.com/crypto-pills-nft-collectible-based-on-micha-kleins-pillman/"
                          target="_blank"
                          rel="nofollow"
                        >
                          nftevening.com
                        </a>
                      </li>
                    </ul>
                    <a
                      href="https://nftevening.com/crypto-pills-nft-collectible-based-on-micha-kleins-pillman/"
                      className="title h4"
                      target="_blank"
                      rel="nofollow"
                    >
                      NFT Collectible Based on Micha Klein’s Pillman
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="blog-box">
                  <div className="blog-img">
                    <a
                      href="https://ashadedviewonfashion.com/2021/04/20/in-conversation-with-the-digital-artist-micha-klein/"
                      target="_blank"
                      rel="nofollow"
                    >
                      <img
                        src="https://ashadedviewonfashion.com/wp-content/uploads/2021/04/ashadedviewonfashion.com-in-conversation-with-the-digital-artist-micha-klein-crystal-powder-from-god-micha-klein-2000-.jpg"
                        alt="Monteno"
                        height="250"
                      />
                    </a>
                  </div>
                  <div className="blog-content">
                    <ul class="meta">
                      <li>
                        <a
                          href="https://ashadedviewonfashion.com/2021/04/20/in-conversation-with-the-digital-artist-micha-klein/"
                          target="_blank"
                          rel="nofollow"
                        >
                          ashadedviewonfashion.com
                        </a>
                      </li>
                    </ul>
                    <a
                      href="https://ashadedviewonfashion.com/2021/04/20/in-conversation-with-the-digital-artist-micha-klein/"
                      className="title h4"
                      target="_blank"
                      rel="nofollow"
                    >
                      In conversation with the pioneer of digital art: Micha
                      Klein
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Blog grid */}
        {/* Action */}
        <section className="tf-section newsletter mt-50">
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
                      href="https://twitter.com/TheCryptoPills"
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
      </>
      <Footer />
    </>
  );
}
