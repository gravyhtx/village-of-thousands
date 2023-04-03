import { SvgContainer } from './SvgContainer';

import IconInsta from '../../public/images/icons/instagram_social-circles.svg';
import IconTwttr from '../../public/images/icons/twitter_social-circles.svg';
import IconGithub from '../../public/images/icons/github_social-circles.svg';
import IconDiscord from '../../public/images/icons/discord_social-circles.svg';
import IconTikTok from '../../public/images/icons/tiktok_social-circles.svg';
import IconYouTube from  '../../public/images/icons/youtube_social-circles.svg'
import IconWeb01 from '../../public/images/icons/www_social-circles.svg';
import IconWeb02 from '../../public/images/icons/www2_social-circles.svg';
import IconVoT from '../../public/images/icons/vot_social-circles.svg';

import website from '../../config/site-data.json';
import { checkType } from '../../utils/validation';

import styles from './styles/SocialCircles.module.css';

export const iconObj = ( brandName, isEventLink, eventName, account, link, color ) => {

  isEventLink=isEventLink===true?true:false;
  brandName=brandName?brandName:false;
  eventName=eventName?eventName:false;
  account=account?account:'Instagram';
  link=link?link:'';

  switch(account.toLowerCase()) {
    case 'instagram':
      return {
        brandName: brandName,
        isEventLink: isEventLink,
        accountName: 'Instagram',
        src: IconInsta,
        link: link,
        alt: isEventLink ? eventName+" // "+account : brandName+" // "+account,
      }
    case 'twitter':
      return {
        brandName: brandName,
        isEventLink: isEventLink,
        accountName: 'Twitter',
        src: IconTwttr,
        link: link,
        alt: isEventLink ? eventName+" // "+account : brandName+" // "+account,
      }
    case 'github':
      return {
        brandName: brandName,
        isEventLink: isEventLink,
        accountName: 'Github',
        src: IconGithub,
        link: link,
        alt: isEventLink ? eventName+" // "+account : brandName+" // "+account,
      }
    case 'discord':
      return {
        brandName: brandName,
        isEventLink: isEventLink,
        accountName: 'Discord',
        src: IconDiscord,
        link: link,
        alt: isEventLink ? eventName+" // "+account : brandName+" // "+account,
      }
    case 'tiktok':
      return {
        brandName: brandName,
        isEventLink: isEventLink,
        accountName: 'TikTok',
        src: IconTikTok,
        link: link,
        alt: isEventLink ? eventName+" // "+account : brandName+" // "+account,
      }
    case 'youtube':
      return {
        brandName: brandName,
        isEventLink: isEventLink,
        accountName: 'YouTube',
        src: IconYouTube,
        link: link,
        alt: isEventLink ? eventName+" // "+account : brandName+" // "+account,
      }
    case 'website':
    case 'web01':
      return {
        brandName: brandName,
        isEventLink: isEventLink,
        accountName: 'Website',
        src: IconWeb01,
        link: link,
        alt: isEventLink ? eventName+" // "+account : brandName+" // "+account,
      }
    case 'web02':
      return {
        brandName: brandName,
        isEventLink: isEventLink,
        accountName: 'Website',
        src: IconWeb02,
        link: link,
        alt: isEventLink ? eventName+" // "+account : brandName+" // "+account,
      }
    case 'votsite':
      return {
        brandName: brandName,
        isEventLink: isEventLink,
        accountName: 'Digital HQ',
        src: IconVoT,
        link: link,
        alt: isEventLink ? eventName+" // "+account : brandName+" // "+account,
      }
    default:
      return {
        brandName: brandName,
        isEventLink: isEventLink,
        accountName: 'Website',
        src: IconWeb01,
        link: link,
        alt: isEventLink ? eventName+" // "+account : brandName+" // "+account,
      }
  }
}

export const SocialIcon = ({ accountName, brandName, svgClasses, width, alt, link, src,
  socialStyles, useEventStyles, color, iconsLength }) => {

  brandName = brandName ? brandName : false;
  svgClasses = svgClasses ? ' '+svgClasses : '';
  useEventStyles = useEventStyles === true ? true : false;

  const lengthToPercent = (100 / iconsLength).toFixed(2) + '%';
  iconsLength = checkType(iconsLength, 'number') ? lengthToPercent : '25%';

  // SVG  COLORS IN AVAILABLE ASS CSS CLASSES
  //  Search for available classes by '.svg-color_'
  color = brandName === true && color ? color : '';

  // ADDITIONAL STYLES MAY BE USED
  // COLOR MAY ALSO BE CHANGED USING THE 'filter' PROPERTY
  socialStyles = socialStyles ? socialStyles : {};
  const containerStyles = {
    width: iconsLength,
    marginLeft: 'auto',
    left: 'auto',
    right: 'auto',
    float: 'left',
    boxSizing: 'border-box',
    padding: '0 0.75rem',
    minHeight: '1px',
    ...socialStyles,
  }

  const iconClasses = useEventStyles === true ? styles.socialEventIcon : styles.socialIcon;
  const eventIcon = useEventStyles === true ? ' '+color : '';
  
  return (
    <div
      className='social-container'
      style={containerStyles}
      aria-label={brandName === false ? "Follow us on "+ accountName : "Follow " + brandName + " on " + accountName}>
      <SvgContainer
        layout="responsive"
        classes={iconClasses+" "+eventIcon+svgClasses}
        width={width}
        description={alt}
        link={link}
        color={color}
        src={src}
        styles={socialStyles} />
    </div>
  )
}

export const SocialCircles = ({ socialContainer, iconsObjArray, isEvent, iClass, width, color, socialStyles, iconsLength, contain }) => {

  const votIcons = [
    {
      accountName: "Instagram",
      src: IconInsta,
      link: website.instagramUrl,
      alt: website.name+" // Instagram",
    },{
      accountName: "Twitter",
      src: IconTwttr,
      link: website.twitterUrl,
      alt: website.name+" // Twitter",
    },{
      accountName: "TikTok",
      src: IconTikTok,
      link: website.tiktokUrl,
      alt: website.name+" // TikTok",
    },{
      accountName: "Github",
      src: IconGithub,
      link: website.githubUrl,
      alt: website.name+" // Github",
    }
  ];

  iClass=iClass?" "+iClass:!iClass&&!color?" svg-color-light":"";
  socialContainer=socialContainer?" "+socialContainer:"";
  width=width?width:"";
  
  iconsObjArray = checkType(iconsObjArray, 'array')?iconsObjArray:false;

  return (
    <div className={contain === true ? styles.contain : styles.wRap }>
      <div className={"social-circles icon-container row"}>
        {iconsObjArray === false ?
          votIcons.map((icon, i) => 
            <SocialIcon external={false}
              brandName={false}
              accountName={icon.accountName}
              svgClasses={iClass}
              width={width}
              alt={icon.alt}
              link={icon.link}
              src={icon.src}
              color={color}
              socialStyles={socialStyles}
              iconsLength={iconsLength}
              useEventStyles={isEvent}
              key={i} />
          )
        : iconsObjArray.map((icon, i) => 
            <SocialIcon external={false}
              brandName={icon.brandName}
              accountName={icon.accountName}
              svgClasses={iClass}
              width={width}
              alt={icon.alt}
              link={icon.link}
              src={icon.src}
              color={color}
              socialStyles={socialStyles}
              iconsLength={iconsLength}
              useEventStyles={isEvent}
              key={i} />
          )}
      </div>
    </div>
  )
}
