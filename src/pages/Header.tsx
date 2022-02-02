import React, { useEffect, useState } from 'react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import axios from "axios";
function Header() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();    
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
