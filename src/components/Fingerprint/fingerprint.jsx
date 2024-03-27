import React from 'react';
import './fingerprint.css'; // Add your own CSS file for styling
import DesktopIcon from './desktop-image.png';
import AccordionSection from '../accordion/Accordion';

const data = {
  userAgent: {
    isYaBrowser: false,
    isAuthoritative: true,
    isMobile: false,
    isMobileNative: false,
    isTablet: false,
    isiPad: false,
    isiPod: false,
    isiPhone: false,
    isiPhoneNative: false,
    isAndroid: false,
    isAndroidNative: false,
    isBlackberry: false,
    isOpera: false,
    isIE: false,
    isEdge: false,
    isIECompatibilityMode: false,
    isSafari: false,
    isFirefox: false,
    isWebkit: false,
    isChrome: true,
    isKonqueror: false,
    isOmniWeb: false,
    isSeaMonkey: false,
    isFlock: false,
    isAmaya: false,
    isPhantomJS: false,
    isEpiphany: false,
    isDesktop: true,
    isWindows: true,
    isLinux: false,
    isLinux64: false,
    isMac: false,
    isChromeOS: false,
    isBada: false,
    isSamsung: false,
    isRaspberry: false,
    isBot: false,
    isCurl: false,
    isAndroidTablet: false,
    isWinJs: false,
    isKindleFire: false,
    isSilk: false,
    isCaptive: false,
    isSmartTV: false,
    isUC: false,
    isFacebook: false,
    isAlamoFire: false,
    isElectron: false,
    silkAccelerated: false,
    browser: 'Chrome',
    version: '116.0.0.0',
    os: 'Windows 10.0',
    platform: 'Microsoft Windows',
    geoIp: {},
    source: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    isWechat: false,
    electronVersion: ''
  },
  os: 'Windows 10.0',
  browser: 'Chrome',
  ip: '::1',
  location: null
}


const getDeviceImage = (userAgent) => {
  if (userAgent.isMobile) {
    return 'mobile-image.png';
  } else if (userAgent.isTablet) {
    return 'tablet-image.png';
  } else if (userAgent.isDesktop) {
    return DesktopIcon;
  } else {
    return 'default-image.png';
  }
};

const Fingerprint = () => {
  const { userAgent, ip, location } = data;

  const deviceImage = getDeviceImage(userAgent);

  return (
    <div className="fingerprint-container">
      <img className="device-image" src={deviceImage} alt="Device" />
      <div className="device-details">
        <p className="os-browser">Operating System: {userAgent.os}</p>
        <p className="os-browser">Browser: {userAgent.browser} </p>
        <p>{userAgent.version}</p>
      </div>
      <div className="ip-location"> 
        <p>IP Address: {ip}</p>
        <p>Location: {location ? `${location.city}, ${location.country}` : 'N/A'}</p>
      </div>
      <AccordionSection/>
    </div>
  );
};

export default Fingerprint;
