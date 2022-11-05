import SvgContainer from './SvgContainer';

import IconGithub from '../../public/images/icons/github_social-circles.svg';
import IconTwttr from '../../public/images/icons/twitter_social-circles.svg';
import IconDscrd from '../../public/images/icons/discord_social-circles.svg';
import IconTikTok from '../../public/images/icons/tiktok_social-circles.svg';
import IconInsta from '../../public/images/icons/instagram_social-circles.svg';
import IconYouTube from  '../../public/images/icons/youtube_social-circles.svg'
import IconWeb01 from '../../public/images/icons/www_social-circles.svg';
import IconWeb02 from '../../public/images/icons/www2_social-circles.svg';
import IconVoT from '../../public/images/icons/vot_social-circles.svg';

import website from '../../config/site-data.json';

const siteLink = {
  ig: website.instagramUrl,
  twt: website.twitterUrl,
  tkt: website.tiktokHandle,
  gh: website.githubUrl,
  www: website.url,
  dsc: website.discordUrl
}

export const SocialIcon = ({ name, classes, width, alt, link, src, key }) => {

  return (
    <div className='col s3' aria-label={"Follow us on "+ name} key={key}>
      <SvgContainer
        layout="responsive"
        classes={"social-icon link"+classes}
        width={width}
        description={alt}
        link={link}
        color={"white"}
        src={src} />
    </div>
  )
}

export const icons = [
  {
    src: IconInsta,
    link: website.instagramUrl,
    alt: website.name+" // Instagram",
    name: "Instagram"
  },{
    src: IconTwttr,
    link: website.twitterUrl,
    alt: website.name+" // Twitter",
    name: "Twitter"
  },{
    src: IconTikTok,
    link: website.tiktokUrl,
    alt: website.name+" // TikTok",
    name: "TikTok"
  },{
    src: IconGithub,
    link: website.githubUrl,
    alt: website.name+" // Github",
    name: "Github"
  }
]

export const SocialCircles = ({ socialContainer, votCircles, iClass, iconsObjArray, width }) => {

  iClass=iClass?" "+iClass:" svg-color-light";
  socialContainer=socialContainer?" "+socialContainer:"";
  width=width?width:"";
  votCircles=votCircles===true?true:false;

  

  return (
    <div className={"social-circles icon-container row"}>
      {icons.map((icon, i) => (
        <div className='col s3' aria-label={"Follow us on "+icon.name} key={i}>
          <SvgContainer
            layout="responsive"
            classes={"social-icon link"+iClass}
            width={width}
            description={icon.alt}
            link={icon.link}
            color={"white"}
            src={icon.src} />
        </div>
      ))}
    </div>
  )
}


// export const SocialStructure = ({ children }) => <div className={"social-circles icon-container row"}>{ children }</div>
