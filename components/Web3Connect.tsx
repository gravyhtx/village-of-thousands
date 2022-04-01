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
import { getSingleUser } from '../utils/API';
import Auth from '../utils/auth';


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
  const { chainId } = useWeb3React()
  const userChainId = chainId ?? '';
  // const [isSet, setIsSet] = useState(false);
  // useEffect(() => {
  //   localStorage.setItem('userWalletChainId', userChainId.toString());
  //   setIsSet(true);
  // }, [!isSet])
  // console.log(isSet)
  return userChainId;
}

function BlockNumber() {
  const { chainId, library } = useWeb3React();
  const [blockNumber, setBlockNumber] = React.useState<number>();

  React.useEffect((): any => {
    if (!!library) {
      let stale = false

      library
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null)
          }
        })

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber)
      }
      library.on('block', updateBlockNumber)

      return () => {
        stale = true
        library.removeListener('block', updateBlockNumber)
        setBlockNumber(undefined)
      }
    }
  }, [library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  const userBlocknumber = blockNumber === null ? 'Error' : blockNumber ?? '';

  return userBlocknumber;
}


function Account() {
  const { account } = useWeb3React();
  const userAccount = account === null ? '-': account ? account: ''
  // const [userAddress, setUserAddress] = useState('')
  // console.log(useWeb3React())

  // const token = Auth.loggedIn() ? Auth.getToken() : null;

  // const getUser = async () => {
  //   const response = await getSingleUser(token);
  //   const user = await response.json();
  //   setUserAddress(user.foundUser.walletAddress);
  //   // console.log(user)
  // }
  
  // try {
  //   let updateObj = {
  //     walletAddress: userAccount
  //   }
  //   console.log(updateObj)
  //   updateUser(updateObj, token)
  //   .then(response => {
  //     if(!response.ok) {
  //         throw new Error('something went wrong!');
  //     }
  //     setUserAddress(userAccount);
  //   });
  //   // console.log(token)
  // } catch (err) {
  //   console.error(err);
  // }
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

export default function() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  )
}

function Header() {
  // const { active, error } = useWeb3React()
  return (
    <div className='wallet-info'>
        <div>{Account()}</div>
    </div>
  )
}

function App() {
  const context = useWeb3React<Web3Provider>()
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
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const response = await getSingleUser(token);

        if(!response.ok){
            throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [userDataLength]);

  const userWallet = {
    walletAddress: Account(),
    chainId: ChainId(),
    blockNumber: BlockNumber()
  }

  // console.log(userWallet);

  const submitWallet = async () => {
    // const userAccount = account === null ? '-': account ? account: '';
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // try {
    //   updateUser(userWallet, token)
    //   .then(response => {
    //     if(!response.ok) {
    //         throw new Error('something went wrong!');
    //     }
    //   });

    // } catch (err) {
    //   console.error(err);
    // }
  }

  const web3activate = async () => {
    setActivatingConnector(currentConnector)
    const activeWallet = await activate(injected)
    submitWallet();
  }

  const web3deactivate = async () => {
    deactivate();
  }

  return (
    <>
      <Header />
      {(!active) && (
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
      )}
      {(active || error) && (
      <div>
          <button
            className='btn waves-effect waves-light account-wallet-btn'
            onClick={() => {
              web3deactivate();
            }}
          >
            DEACTIVATE WALLET
          </button>
        {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
      </div>
      )}

      {/* <hr style={{ margin: '2rem' }} /> */}

      {/* <div> */}
        {/* {!!(library && account) && (
          <button
            style={{
              height: '3rem',
              borderRadius: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => {
              library
                .getSigner(account)
                .signMessage('👋')
                .then((signature: any) => {
                  window.alert(`Success!\n\n${signature}`)
                })
                .catch((error: any) => {
                  window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))
                })
            }}
          >
            Sign Message
          </button>
        )} */}
      {/* </div> */}
    </>
  )
}