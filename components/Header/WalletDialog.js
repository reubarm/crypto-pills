import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import { useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import {
  injected,
  walletconnect,
} from '../../lib/connectors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  walletOption: {
    padding: "20px",
    minWidth: '300px'
  },
  walletImage: {
    width: '50px',
    height: '50px',
    marginRight: '20px',
    filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))',
    '& img' : {
      width: '100%'
    }
  },
  walletName: {
    fontSize: '3rem'
  },
  closeButton: {
    WebkitBoxShadow: '2px 2px 2px 0 #000',
    boxShadow: '2px 2px 2px 0 #000',
  },
}));

function WalletDialog(props) {
  const { activate } = useWeb3React();
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const displayMessage = (msg, variant) => {
    enqueueSnackbar(msg, { 
      variant: variant,
    });
  };

  const { onClose, open } = props;

  const handleConnectorClick = (connector) => {
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }
    
    activate(connector)
      .then(() => onClose())
      .catch((error) => displayMessage(error, 'error'));
  }

  const handleDialogClose = (reason) => {
    onClose();
  }

  const [hasInjected, setHasInjected] = React.useState(false);

  React.useEffect(() => {
    if (typeof web3 !== 'undefined') {
      setHasInjected(true);
    }
  })

  const installMetamask = () => {
    let action = key => (
      <Button onClick={() => { window.open("https://metamask.io/download.html") }}>
        Install Metamask
      </Button>
    );

    enqueueSnackbar("Looks like Metamask is not installed.  If you're on a mobile device you need to open this website from the browser inside the Metamask app.", {
      variant: 'warning',
      autoHideDuration: 10000,
      action,
    });
  };

  return (
    <Dialog maxWidth="xs" onClose={handleDialogClose} aria-labelledby="wallet-dialog-title" open={open} className={classes.root}>
      <DialogTitle id="simple-dialog-title">Connect to Wallet</DialogTitle>
      <List>
        <ListItem button onClick={() => hasInjected ? handleConnectorClick(injected) : installMetamask()} key={'MetaMask'} className={classes.walletOption}>
          <ListItemAvatar className={classes.walletImage}>
            <img src='/images/metamask.png' />
          </ListItemAvatar>
          <ListItemText primary={'MetaMask'} className={classes.walletName}/>
        </ListItem>
        <Hidden mdUp>
          <ListItem button onClick={() => handleConnectorClick(walletconnect)} key={'WalletConnect'} className={classes.walletOption}>
            <ListItemAvatar className={classes.walletImage}>
              <img src='/images/walletConnectIcon.svg' />
            </ListItemAvatar>
            <ListItemText primary={'WalletConnect'} className={classes.walletName}/>
          </ListItem>
        </Hidden>
      </List>
      <DialogActions>
        <Button onClick={handleDialogClose} className={classes.closeButton}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WalletDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default WalletDialog;