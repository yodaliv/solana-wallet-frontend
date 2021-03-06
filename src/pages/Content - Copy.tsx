import React, {useEffect, useState, FC, useCallback, useMemo} from 'react';
import ContentLogo from '../assets/img/banner.png';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getParsedNftAccountsByOwner,isValidSolanaAddress } from "@nfteyez/sol-rayz";
import axios from "axios";
import { verify } from 'crypto';

const Content = () => {
    const { connection } = useConnection();
    const { publicKey, signMessage } = useWallet();
    const [isValid, setIsValid] = useState(false);

    const getAllNftData = async () => {
        try {
            if(publicKey) {
                let ownerToken = publicKey;
                const result = isValidSolanaAddress(ownerToken.toBase58());
                console.log("result", result);
                const nfts = await getParsedNftAccountsByOwner({
                  publicAddress: ownerToken,
                  connection,
                  serialization: true,
                });
                if(nfts.length) {
                    nfts.map((nftData) => {
                        if(nftData.updateAuthority === Update_Authority) {
                            setIsValid(true);
                        }
                    })
                }
                return nfts;
            }
        } catch (error) {
          console.log(error);
        }
    };
    
    const getNftTokenData = async () => {
        try {
            if(publicKey) {
                let nftData = await getAllNftData();
                var data = Object.keys(nftData).map((key) => nftData[key]);                                                                    let arr = [];
                let n = data.length;
                for (let i = 0; i < n; i++) {
                    console.log(data[i].data.uri);
                    let val = await axios.get(data[i].data.uri);
                    arr.push(val);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkNFT = async() => {
            await getAllNftData();
        }
        checkNFT();
        //getNftTokenData();
    }, [publicKey, connection])

    const renderButton = () => {
        if(!publicKey) {
            return(
                <>
                    <div className="content-button">
                        <WalletMultiButton className='content_button'>CONNECT WALLET</WalletMultiButton>
                    </div>
                </>
            )
        }else {
            return(
                <>
                    <div className="content-button">
                        <WalletDisconnectButton className='content_button' />
                    </div>
                </>
            )
        }
    }
    
    return isValid ? (

        <div className="content">
            <div className="flex content_logo items-center justify-center">
                <img className='logo_img' src={ContentLogo} />
            </div>
            <div className="flex content_title items-center justify-center">
                <p>Discover the new way to access exclusive content in the metaverse.</p>
            </div>
            <div className="flex items-center justify-center my-7">
                {renderButton()}
            </div>
            <div className="flex content_post items-center justify-center my-6">
                <section className="max-w-7xl px-4 sm:px-6 lg:px-4 mt-12 mb-12 lg:mx-150p sm:mx-20p">
                    <article>
                        <h2 className="text-2xl">Content only for holders.</h2>
                        <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                            <article className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
                                <div className="relative w-full h-80 md:h-64 lg:h-44">
                                    <img src="https://cdn.pixabay.com/photo/2021/07/24/01/42/zebra-dove-6488440_960_720.jpg"
                                        alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                        className="w-full h-full object-center object-cover" />
                                </div>
                                <div className="px-3 py-4">
                                    <h3 className="text-sm text-gray-500 pb-2">
                                        <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href="#">
                                            <span className="absolute inset-0"></span>
                                            Basic Level
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </article>
                            <article className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
                                <div className="relative w-full h-80 md:h-64 lg:h-44">
                                    <img src="https://cdn.pixabay.com/photo/2021/09/08/20/45/bird-6607863_960_720.jpg.jpg"
                                        alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                        className="w-full h-full object-center object-cover" />
                                </div>
                                <div className="px-3 py-4">
                                    <h3 className="text-sm text-gray-500 pb-2">
                                        <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href="#">
                                            <span className="absolute inset-0"></span>
                                            Basic Level
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </article>
                            <article className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
                                <div className="relative w-full h-80 md:h-64 lg:h-44">
                                    <img src="https://cdn.pixabay.com/photo/2021/08/03/11/01/stairs-6519085_960_720.jpg"
                                        alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                        className="w-full h-full object-center object-cover" />
                                </div>
                                <div className="px-3 py-4">
                                    <h3 className="text-sm text-gray-500 pb-2">
                                        <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href="#">
                                            <span className="absolute inset-0"></span>
                                            Intermediate Level
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </article>
                        </section>
                    </article>
                </section>
            </div>
            <div className="max-w-7xl px-4 lg:mx-150p sm:mx-20p my-2 items-center justify-center content-desc">
                <h2>Upcoming features:</h2>
                <p>-Automatic generation of NFTs for creators.(Membership control access to content)</p>
                <p>-Setup of crypto membership payments</p>
                <p>-Marketplace to buy and sell these NFTs</p>
                <p>-Royalies revenue sharing for holders through ALTT NFT staking</p>
            </div>
        </div>
    ) : (
        <div className="content">
            <div className="flex content_logo items-center justify-center">
                <img className='logo_img' src={ContentLogo} />
            </div>
            <div className="flex content_title items-center justify-center">
                <p>Discover the new way to access exclusive content in the metaverse.</p>
            </div>
            <div className="flex items-center justify-center my-7">
                {renderButton()}
            </div>
            <div className="max-w-7xl px-4 lg:mx-150p sm:mx-20p my-2 items-center justify-center content-desc">
                <h2>Upcoming features:</h2>
                <p>-Automatic generation of NFTs for creators.(Membership control access to content)</p>
                <p>-Setup of crypto membership payments</p>
                <p>-Marketplace to buy and sell these NFTs</p>
                <p>-Royalies revenue sharing for holders through ALTT NFT staking</p>
            </div>
        </div>
    );
}
export default Content;

function setIsValidWallet(arg0: boolean) {
    throw new Error('Function not implemented.');
}
