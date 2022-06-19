import React, { createContext, useContext, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers'
import CryptoPillsAnthem_ABI from '../contracts/CryptoPillsAnthem.json'
import contractAddresses from '../contracts/contract-address.json'

const networkNames = {
  1: "mainnet",
  4: "rinkeby",
}

const CryptoPillsAnthemContractContext = createContext({
  signer: null,
  CryptoPillsAnthemContract: null
})

export const CryptoPillsAnthemContractProvider = ({ children }) => {

  CryptoPillsAnthemContractContext.displayName = `CryptoPillsAnthemContractContext`

  const { library, chainId } = useWeb3React();

  const CryptoPillsAnthemContract = useMemo(() => {
    if (chainId !== undefined && Number.isInteger(chainId) && library !== undefined) {
        let networkName = networkNames[chainId];
        let address = contractAddresses[networkName]?.CryptoPillsAnthem;
        
        if (!address) return undefined;
      
        try {
          return new ethers.Contract(address, CryptoPillsAnthem_ABI.abi, library);
        } catch(error) {
          console.error('Failed to get contract', error)
        }
    } else {
      return undefined;
    }
  }, [library, chainId]);

  const signer = useMemo(
    () => 
      library !== undefined
        ? library.getSigner()
        : undefined,
    [library]
  )

  const contractContext = {
    CryptoPillsAnthemContract,
    signer
  }

  return <CryptoPillsAnthemContractContext.Provider value={contractContext}>{children}</CryptoPillsAnthemContractContext.Provider>
}

export function useContract() {
  return useContext(CryptoPillsAnthemContractContext)
}