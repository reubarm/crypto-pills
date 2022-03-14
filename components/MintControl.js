import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

import CountdownTimer from './CountdownTimer';

import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useContract } from '../contexts/contractProvider';
import { useSnackbar } from 'notistack';

import { getErrorMessage, getTransactionErrorMessage } from "../lib/errors";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem 0'
  },
  mintInputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px'
  },
  flexGrow: {
    flexGrow: '1',
  },
  mintLabel: {
    fontSize: '1.2rem',
    color: 'black',
    maxWidth: '75px',
  },
  mintNumber: {
    margin: '0 10px',
    width: '100px',
    '& input': {
      fontSize: '2rem',
      padding: '10px',
      textAlign: 'center'
    },
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  mintButton: {
    margin: '12px 12px 0 12px',
    borderRadius: '0',
    fontSize: '1.5rem',
  },
}));

const presaleTimestamp = process.env.NEXT_PUBLIC_PRESALE_TIMESTAMP != null ? +new Date(process.env.NEXT_PUBLIC_PRESALE_TIMESTAMP) : +new Date() + 15000;
const publicSaleTimestamp = process.env.NEXT_PUBLIC_SALE_TIMESTAMP != null ? +new Date(process.env.NEXT_PUBLIC_SALE_TIMESTAMP) : +new Date() + 30000;

// const presaleTimestamp = +new Date("Fri Aug 27 2021 11:11:00 GMT+0800");
// const publicSaleTimestamp = +new Date("Fri Aug 27 2021 23:11:00 GMT+0800");

export default function MintControl() {
  const { active, setError } = useWeb3React();
  const { CryptoPillsContract, signer } = useContract();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  
  const displayMessage = (msg, variant) => {
    enqueueSnackbar(msg, { 
      variant: variant,
    });
  };

  const [preSaleActive, setPreSaleActive] = React.useState(+new Date() > presaleTimestamp && +new Date() < publicSaleTimestamp);
  React.useEffect(() => {
    let interval = setInterval(() => {
      setPreSaleActive(+new Date() > presaleTimestamp && +new Date() < publicSaleTimestamp);
    }, 1000);

    return () => clearInterval(interval);
  })

  const [publicSaleActive, setPublicSaleActive] = React.useState(+new Date() > publicSaleTimestamp);
  React.useEffect(() => {
    let interval = setInterval(() => {
      if (+new Date() > publicSaleTimestamp) setPublicSaleActive(true);
    }, 1000);

    return () => clearInterval(interval);
  })

  const [tokensMinted, setTokensMinted] = React.useState(0);

  const transferEventListener = (from, to, tokenId) => {
    CryptoPillsContract.totalSupply()
      .then((value) => setTokensMinted(value.toNumber()))
      .catch((error) => displayMessage(`Error retrieving total supply: ${getErrorMessage(error)}`, 'error'));
  };

  useEffect(() => {
    if (!!CryptoPillsContract) {
      CryptoPillsContract.totalSupply()
        .then((value) => setTokensMinted(value.toNumber()))
        .catch((error) => displayMessage(`Error retrieving total supply: ${getErrorMessage(error)}`, 'error'));

      if (tokensMinted >= 10000) {
        setSaleActive(false);
      }

      CryptoPillsContract.on("Transfer", transferEventListener);

      return () => CryptoPillsContract.off("Transfer", transferEventListener);

    } else {
      console.warn("Can't find smart contract");
      //setErrorMessage("Contract doesn't exist");
    }
  }, [CryptoPillsContract]);

  const [processing, setProcessing] = React.useState(false);
  const [mintNumber, setMintNumber] = React.useState(1);

  const mintPrice = ethers.utils.parseEther("0.07");

  const handleMintButtonClick = () => {
    if (!processing) {
      if (active) {
        if (preSaleActive || publicSaleActive) {
          setProcessing(true);

          //Mint
          let number = mintNumber;
          let sendPrice = mintPrice.mul(number);

          let mintFunction = preSaleActive ? "buyPresale" : (publicSaleActive ? "buy" : "ERROR");
          CryptoPillsContract
            .connect(signer)
            [mintFunction](number, {value: sendPrice})
            .then((transaction) => {
              transaction.wait()
                .then((receipt) => {
                  displayMessage(`Successfully minted ${number} pills!`, 'success')
                });
            })
            .catch((error) => {
              displayMessage(getTransactionErrorMessage(error), 'error');
            })
            .then(() => setProcessing(false))
        }
      }
    }
  };

  if (preSaleActive || publicSaleActive) {
    return (
      <div className={classes.root}>
        <div className={classes.mintInputs}>
          <TextField
            type="number"
            className={classes.mintNumber}
            variant="outlined"
            color="primary"
            value={mintNumber}
            onChange={e => setMintNumber(Math.max(0,Math.min(e.target.value, 20)))}
            inputProps={{min:"0", max:"20", step:"1"}}
          />
          <Button
            variant="contained"
            color='primary'
            className={classes.mintButton}
            onClick={handleMintButtonClick}
          >
            {preSaleActive ? "Buy Pre-Sale" : (publicSaleActive ? "Buy" : "Sale Not Open")}
          </Button>
          <Typography variant='body1' component='p' className={classes.flexGrow}>{`${10000-tokensMinted} remaining`}</Typography>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <Button variant='contained' color="secondary" className={classes.mintButton} style={{fontSize: '1.5rem'}}>Coming on August 27th</Button>
      </div>
    )
  }
  
}
