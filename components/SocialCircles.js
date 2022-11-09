import SvgContainer from '../components/SvgContainer';

import Github from '../public/images/icons/github_social-circles.svg';
import Instagram from '../public/images/icons/instagram_social-circles.svg';
import Twitter from '../public/images/icons/twitter_social-circles.svg';
import Discord from '../public/images/icons/discord_social-circles.svg';
import TikTok from '../public/images/icons/tiktok_social-circles.svg';

import website from '../config/site-data.json';


export const SocialCircles = ({ socialContainer, iClass, width, icon1, icon2, icon3, icon4, icon1link, icon2link, icon3link, icon4link, icon1alt, icon2alt, icon3alt, icon4alt }) => {

  iClass=iClass?" "+iClass:" svg-color-light";
  socialContainer=socialContainer?" "+socialContainer:"";
  width=width?width:"";

  icon1=icon1?icon1:Instagram;
  icon2=icon2?icon2:Twitter;
  icon3=icon3?icon3:TikTok;
  icon4=icon4?icon4:Github;

  icon1link=icon1link?icon1link:website.instagramUrl;
  icon2link=icon2link?icon2link:website.twitterUrl;
  icon3link=icon3link?icon3link:website.tiktokUrl;
  icon4link=icon4link?icon4link:website.githubUrl;

  icon1alt=icon1alt?icon1alt:website.name+" // Instagram";
  icon2alt=icon2alt?icon2alt:website.name+" // Twitter";
  icon3alt=icon3alt?icon3alt:website.name+" // TikTok";
  icon4alt=icon4alt?icon4alt:website.name+" // Github";

  const icons = [
    {
      src: icon1,
      link: icon1link,
      alt: icon1alt,
      name: "Instagram"
    },{
      src: icon2,
      link: icon2link,
      alt: icon2alt,
      name: "Twitter"
    },{
      src: icon3,
      link: icon3link,
      alt: icon3alt,
      name: "TikTok"
    },{
      src: icon4,
      link: icon4link,
      alt: icon4alt,
      name: "Github"
    }
  ]

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