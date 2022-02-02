import SvgContainer from '../components/SvgContainer';

import Github from '../images/icons/github_social-circles.svg';
import Instagram from '../images/icons/instagram_social-circles.svg';
import Twitter from '../images/icons/twitter_social-circles.svg';
import Discord from '../images/icons/discord_social-circles.svg';

const SocialCircles = ( socialContainer, iClasses, iClass, width, icon1, icon2, icon3, icon4, icon1link, icon2link, icon3link, icon4link, icon1alt, icon2alt, icon3alt, icon4alt ) => {

    iClass=iClass?" "+iClass:" svg-color-light";
    socialContainer=socialContainer?" "+socialContainer:"";
    width=width?width:"";

    icon1=icon1?icon1:Instagram;
    icon2=icon2?icon2:Twitter;
    icon3=icon3?icon3:Discord;
    icon4=icon4?icon4:Github;

    icon1link=icon1link?icon1link:"https://instagram.com/VillageOfThousands/";
    icon2link=icon2link?icon2link:"https://twitter.com/VoThousands/";
    icon3link=icon3link?icon3link:"https://discord.gg/niCC6A47KA";
    icon4link=icon4link?icon4link:"https://github.com/gravyhtx/village-of-thousands";

    icon1alt=icon1alt?icon1alt:"Village of Thousands // Instagram";
    icon2alt=icon2alt?icon2alt:"Village of Thousands // Twitter";
    icon3alt=icon3alt?icon3alt:"Village of Thousands // Discord";
    icon4alt=icon4alt?icon4alt:"Village of Thousands // Github";

    return (
        <div className={"social-circles icon-container row"}>
            <div className='col s3'>
            {/* INSTAGRAM */}
                <SvgContainer
                    classes={
                        "social-icon link"
                        +iClass}
                    width={width}
                    description={icon1alt}
                    link={icon1link}
                    src={icon1} />
            </div>
            <div className='col s3'>
            {/* TWITTER */}
                <SvgContainer
                    classes={
                        "social-icon link"
                        +iClass}
                    width={width}
                    description={icon2alt}
                    link={icon2link}
                    src={icon2} />
            </div>
            <div className='col s3'>
            {/* DISCORD */}
                <SvgContainer
                    classes={
                        "social-icon link"
                        +iClass}
                    width={width}
                    description={icon3alt}
                    link={icon3link}
                    src={icon3} />
            </div>
            <div className='col s3'>
            {/* GITHUB */}
                <SvgContainer
                    classes={
                        "social-icon link"
                        +iClass}
                    width={width}
                    description={icon4alt}
                    link={icon4link}
                    src={icon4} />
            </div>
        </div>
    )
}

export default SocialCircles;