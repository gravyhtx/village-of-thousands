import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Web3Connect from './Web3Connect.tsx'


function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}



const Web3Wallet = (props: any) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Connect wallet={props.wallet}/>
    </Web3ReactProvider>
  )
}

export default Web3Wallet;