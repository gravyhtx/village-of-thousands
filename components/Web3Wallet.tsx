import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Web3Connect from './Web3Connect'


function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}



const Web3Wallet = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Connect />
    </Web3ReactProvider>
  )
}

export default Web3Wallet;