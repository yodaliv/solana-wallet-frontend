import React, { useEffect, useState } from 'react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import axios from "axios";
function Header() {
    const { connection } = useConnection();
    const { publicKey, signMessage } = useWallet();
    const [ randomMessage, setRandomMessage ] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:8080/api/getRandomMessage').then((res) => {
            setRandomMessage(res.data.data);
        }).catch(err => {

        })
    }, [])
    useEffect(() => {
        if(signMessage && publicKey)
        {
            const Verify = async() => {
                const signature = await signMessage(randomMessage as any);
                axios.post('http://localhost:8080/api/verify', { randomMessage: randomMessage, signature: signature, publicKey: publicKey}).then((res) =>{
                    setIsValid(res.data.result);
                }).catch(err =>{

                })
            }
            Verify();
        }
    },[publicKey])
    
  const renderButton = () => {
    if(!publicKey) {
        return(
            <div className="header-button">
                <WalletMultiButton className='header_button'>CONNECT WALLET</WalletMultiButton>
            </div>
        )
    }else {
        return(
            <div className="header-button">
                <WalletDisconnectButton className='header_button' />
            </div>  
        )
    }
  }
  return (
    <>
    <div className="header py-5 container mx-auto px-3 flex items-center justify-between">
      <div className="header_logo">
        <span className="hover:text-gray-700 cursor-pointer text-base pt-10 md:pt-0 logo">BETA</span>
      </div>
      {renderButton()}
    </div>
    </>
  );
}
export default Header;
