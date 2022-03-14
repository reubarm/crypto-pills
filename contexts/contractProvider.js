import React, { createContext, useContext, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers'
import CryptoPills_ABI from '../contracts/CryptoPills.json'
import contractAddresses from '../contracts/contract-address.json'

const networkNames = {
  1: "mainnet",
  4: "rinkeby",
}

const CryptoPillsContractContext = createContext({
  signer: null,
  CryptoPillsContract: null
})

export const CryptoPillsContractProvider = ({ children }) => {

  CryptoPillsContractContext.displayName = `CryptoPillsContractContext`

  const { library, chainId } = useWeb3React();

  const CryptoPillsContract = useMemo(() => {
    if (chainId !== undefined && Number.isInteger(chainId) && library !== undefined) {
        let networkName = networkNames[chainId];
        let address = contractAddresses[networkName]?.CryptoPills;
        
        if (!address) return undefined;
      
        try {
          return new ethers.Contract(address, CryptoPills_ABI.abi, library);
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
    CryptoPillsContract,
    signer
  }

  return <CryptoPillsContractContext.Provider value={contractContext}>{children}</CryptoPillsContractContext.Provider>
}

export function useContract() {
  return useContext(CryptoPillsContractContext)
}