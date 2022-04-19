import React, { useEffect, useState } from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Web3Connect from './Web3Connect.tsx'


function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}


const Web3Wallet = (props: any) => {
  const [wallet, setWallet] = useState('');
  
  useEffect(() => {
    setWallet(props.wallet ? props.wallet : '')
  }, [props.wallet]);

  // console.log(wallet)

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Connect wallet={wallet}/>
    </Web3ReactProvider>
  )
}

export default Web3Wallet;