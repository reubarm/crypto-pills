import React from 'react'
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import WalletDialog from './WalletDialog';

import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import {injected } from '../../lib/connectors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  button: {
    fontSize: '1rem',
    fontWeight: '700',
    letterSpacing: '0',
    textTransform: 'none',
    borderRadius: '23px',
    padding: '10px 50px',
    marginLeft: '10px',
    backgroundColor: '#BFD7EA',
    border: '2px solid #c5e4f9',
    boxShadow: 'none',
    color: '#333',
    '&:hover': {
      backgroundColor: '#a8c6dc',
      boxShadow: 'none',
    }
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  dropdownMenuContainer: {
    marginTop: '15px',
    padding: '15px 15px 0 15px',
    backgroundColor: 'white',
  },
  dropdownMenuList: {
    color: 'black',
  },
  dropdownSubtitle: {
    fontWeight: '600',
  },
  dropdownAccount: {
    display: 'flex',
    alignItems: 'center',
    color: '#67D042',
    fontWeight: '600',
  },
  menuItem: {
    padding: '1rem 5px',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: '#EEED'
    }
  },
  dropdownDisconnect: {
    padding: '1rem 5px',
    fontSize: '0.8rem',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: '#EEED'
    }
  },
}));

export default function WalletButton(props) {
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
  const classes = useStyles();
  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const displayMessage = (msg, variant) => {
    enqueueSnackbar(msg, { 
      variant: variant,
    });
  };

  const [loading, setLoading] = React.useState(false);
  const [walletDialogOpen, setWalletDialogOpen] = React.useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      if (active) {
        handleToggleDropdown();
      } else {
        setLoading(true);
        if (typeof web3 !== 'undefined') {
          activate(injected)
            .then(setLoading(false))
            .catch((error) => displayMessage(error, 'error'));
        } else {
          setWalletDialogOpen(true);
        }
      }
    }
  };

  const handleWalletDialogClose = () => {
    setWalletDialogOpen(false);
    setLoading(false);
  };

  const [addressDisplay, setAddressDisplay] = React.useState('');

  React.useEffect(() => {
    const getAddressDisplay = async () => {
      if (account !== null && account) {
        let addressString = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
        let ensName = await library.lookupAddress(account);
        
        if (ensName !== null && ensName != "") {
          setAddressDisplay(ensName);
        } else {
          setAddressDisplay(addressString);
        }
      }
    }

    getAddressDisplay();
  }, [account]);


  // console.log(account);

  const anchorRef = React.useRef(null);
  
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const handleToggleDropdown = () => {
    setDropDownOpen((prevOpen) => !prevOpen);
  };
  
  const handleCloseDropdown = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  
    setDropDownOpen(false);
  };
  
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setDropDownOpen(false);
    }
  }
  
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(dropDownOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
  
    prevOpen.current = dropDownOpen;
  }, [dropDownOpen]);

  const handleDisconnectClick = () => {
    setDropDownOpen(false);
    if (!!connector.close) {
      connector.close().then(() => {
        deactivate();
      })
    } else {
      deactivate();
    }
  }

  return (
    <div {...props} className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          disabled={loading}
          onClick={handleButtonClick}
          ref={anchorRef}
        >
          {`${active ? `${addressDisplay}` : "Connect Wallet"}`}
          {active && <ExpandMoreIcon/>}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      <WalletDialog open={walletDialogOpen} onClose={handleWalletDialogClose} />
      <Popper open={dropDownOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex:'1' }}>
        {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom', zIndex:'1' }}
        >
          <Paper className={classes.dropdownMenuContainer}>
          <ClickAwayListener onClickAway={handleCloseDropdown}>
            <MenuList autoFocusItem={dropDownOpen} id="menu-list-grow" onKeyDown={handleListKeyDown} className={classes.dropdownMenuList}>
              <div className={classes.dropdownAccount}>
                <Typography variant='caption' className={classes.dropdownDisconnect} style={{width: '100%', color: '#333', fontSize: '14px', fontWeight: '900'}}><a href="/account">Your Account</a></Typography>
              </div>
              <div className={classes.dropdownAccount}>
                <Typography variant='body1' style={{marginRight: '20px', font: 'inherit'}}>{addressDisplay}</Typography>
                <Typography variant='caption' >connected ✔</Typography>
              </div>
              <Divider style={{backgroundColor: '#CCC'}}/>
              <MenuItem onClick={handleDisconnectClick} className={classes.dropdownDisconnect}>disconnect</MenuItem>
            </MenuList>
          </ClickAwayListener>
          </Paper>
        </Grow>
        )}
      </Popper>
    </div>
  )
}