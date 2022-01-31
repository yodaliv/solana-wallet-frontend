import React from 'react';
import { SocialIcon } from 'react-social-icons';

function Footer() {

  return (
    <div className="footer">
      <div className="flex items-center justify-center">
        <h2>Invest in Alien News:</h2>
      </div>
      <div className="flex items-center justify-center">
        <SocialIcon network="twitter" bgColor="#000" fgColor='#4abdd0' className="twitterIcon"/>
        <SocialIcon network="twitter" bgColor="#000" fgColor='#4abdd0' className="twitterIcon"/>
        <SocialIcon network="discord" bgColor="#000" fgColor='#4abdd0' className="discordIcon"/>
      </div>
    </div>
  );
}

export default Footer;