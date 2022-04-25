import React, { useState, useEffect } from 'react'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { useEagerConnect, useInactiveListener } from '../utils/hooks.ts';
import { InjectedConnector } from '@web3-react/injected-connector';
import { MetaMask } from '@web3-react/metamask';
import { deleteUserWallet, getSingleUser, updateUserWallet } from '../utils/API';
import Auth from '../utils/auth';
import { useRouter } from 'next/router';

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}


function ChainId() {
  const { chainId } = useWeb3React();
  const userChainId = chainId ?? '';
  return userChainId;
}

function BlockNumber() {
  const { chainId, library } = useWeb3React();
  const [blockNumber, setBlockNumber] = React.useState<number>();

  React.useEffect((): any => {
    if (!!library) {
      let stale = false;

      library
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        })

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber);
      }
      library.on('block', updateBlockNumber);

      return () => {
        stale = true;
        library.removeListener('block', updateBlockNumber);
        setBlockNumber(undefined);
      }
    }
  }, [library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  const userBlocknumber = blockNumber === null ? 'Error' : blockNumber ?? '';

  return userBlocknumber;
}


function Account() {
  const { account } = useWeb3React();
  const userAccount = account === null ? '-': account ? account: '';
  return (userAccount ?? '');
}

function Balance() {
  const { account, library, chainId } = useWeb3React()

  const [balance, setBalance] = React.useState()
  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
  const userBalance = balance === null ? 'Error' : balance ? formatEther(balance) : ''
  return userBalance;
}

export default function(props: any) {
  ChainId();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App walletInfo={props.wallet} />
    </Web3ReactProvider>
  )
}

function Header(walletAddress: any) {
  return (
    <div className='wallet-info'>
        <div>{walletAddress ? walletAddress : Account()}</div>
    </div>
  )
}

function App(props: any) {
  const router = useRouter();
  const context = useWeb3React<Web3Provider>() ? useWeb3React<Web3Provider>() : {
    account: undefined,
    activate: () => {},
    active: false,
    chainId: undefined,
    connector: undefined,
    deactivate: () => {},
    error: undefined,
    library: undefined,
    setError: () => {}
  }
  const { connector, library, account, activate, deactivate, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  const currentConnector = injected
  const activating = currentConnector === activatingConnector
  const connected = currentConnector === connector
  const disabled = !triedEager || !!activatingConnector || connected || !!error

  // Get User Data
  const [userData, setUserData] = useState({
    walletAddress: [{
      walletAddress: ''
    }]
  });

  const userDataLength = Object.keys(userData).length;
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const response = await getSingleUser(token);

        if(!response.ok){
            throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user.foundUser);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [userDataLength]);

  // const userWallet = () => {
  //   if(localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses')) {
  //     return ({walletAddress: localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses').toLowerCase()})
  //   }
  // }
  // console.log(account);

  const web3activate = async () => {
    try {
      setActivatingConnector(currentConnector);

      const activeWallet = await activate(injected);

      const token = Auth.loggedIn() ? Auth.getToken() : null;
      const response = await updateUserWallet({walletAddress: account}, token);
      // const response = await updateUserWallet(account, token);

      if(active) {
        router.reload();
      }

      if(!response.ok) {
          throw new Error('something went wrong!');
      }

    } catch (err) {
      console.error(err);
    }
  }

  const web3deactivate = async (e: any) => {
    try {

      const token = Auth.loggedIn() ? Auth.getToken() : null;
      const deleteObj = {
        walletAddress: e.target.dataset.value
      }
      const response = await deleteUserWallet(deleteObj, token);

      if(!response.ok) {
        throw new Error('something went wrong!');
      }
      
    } catch (err) {
      console.error(err);
      router.reload();
    }
    deactivate();
    router.reload();
  }

  return (
    <>
      {/* {((active || error) && props.walletInfo) && (Header(props.walletInfo[0].walletAddress))} */}
      {(props.walletInfo.length) ? Header(props.walletInfo[0].walletAddress) : ""}
      {(!props.walletInfo.length) ? (
      <div>
        <button
          className='btn waves-effect waves-light account-wallet-btn'
          disabled={disabled}
          onClick={() => {
            web3activate();
          }}
        >
          <div>
            {connected}
          </div>
          ADD WALLET
        </button>          
      </div>
      ) :
      (
      <div>
          <button
            className='btn waves-effect waves-light account-wallet-btn'
            onClick={(e: any) => {
              web3deactivate(e);
            }}
            data-value={props.walletInfo[0].walletAddress}
          >
            DEACTIVATE WALLET
          </button>
        {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
      </div>
      )}
    </>
  )
}