import SvgContainer from '../components/SvgContainer';

import Github from '../public/images/icons/github_social-circles.svg';
import Instagram from '../public/images/icons/instagram_social-circles.svg';
import Twitter from '../public/images/icons/twitter_social-circles.svg';
import Discord from '../public/images/icons/discord_social-circles.svg';

const SocialCircles = ( socialContainer, iClass, width, icon1, icon2, icon3, icon4, icon1link, icon2link, icon3link, icon4link, icon1alt, icon2alt, icon3alt, icon4alt ) => {

    iClass=iClass?" "+iClass:" svg-color-light";
    socialContainer=socialContainer?" "+socialContainer:"";
    width=width?width:"";

    icon1=icon1?icon1:Instagram;
    icon2=icon2?icon2:Twitter;
    icon3=icon3?icon3:Discord;
    icon4=icon4?icon4:Github;

    icon1link=icon1link?icon1link:"https://instagram.com/VillageOfThousands/";
    icon2link=icon2link?icon2link:"https://twitter.com/VoThousands/";
    icon3link=icon3link?icon3link:"https://discord.gg/nfCC6A47KA";
    icon4link=icon4link?icon4link:"https://github.com/gravyhtx/village-of-thousands";

    icon1alt=icon1alt?icon1alt:"Village of Thousands // Instagram";
    icon2alt=icon2alt?icon2alt:"Village of Thousands // Twitter";
    icon3alt=icon3alt?icon3alt:"Village of Thousands // Discord";
    icon4alt=icon4alt?icon4alt:"Village of Thousands // Github";

    // const icons = [
    //     [icon1,icon1link,icon1alt],
    //     [icon2,icon2link,icon2alt],
    //     [icon3,icon3link,icon3alt],
    //     [icon4,icon4link,icon4alt],
    // ]

    return (
        <div className={"social-circles icon-container row"}>
            {/* {icons.map((icon, i) => (
                <div className='col s3' key={i}>
                    <SvgContainer
                        classes={
                            "social-icon link"
                            +iClass}
                        width={width}
                        description={icon.alt}
                        link={icon.ref}
                        color={"white"}
                        width={"75%"}
                        maxWidth={"60px"}
                        src={icon.acct} />
                        {icon[0]}
                </div>
            ))} */}
            <div className='col s3'>
                <SvgContainer
                    layout="responsive"
                    classes="social-icon instagram link"
                    width={width}
                    description={icon1alt}
                    link={icon1link}
                    color={"white"}
                    width={"75%"}
                    maxWidth={"60px"}
                    src={icon1} />
            </div>
            <div className='col s3'>
                <SvgContainer
                    layout="responsive"
                    classes="social-icon link"
                    width={width}
                    description={icon2alt}
                    link={icon2link}
                    color={"white"}
                    width={"75%"}
                    maxWidth={"60px"}
                    src={icon2} />
            </div>
            <div className='col s3'>
                <SvgContainer
                    layout="responsive"
                    classes="social-icon link"
                    width={width}
                    description={icon3alt}
                    link={icon3link}
                    color={"white"}
                    width={"75%"}
                    maxWidth={"60px"}
                    src={icon3} />
            </div>
            <div className='col s3'>
                <SvgContainer
                    layout="responsive"
                    classes="social-icon link"
                    width={width}
                    description={icon4alt}
                    link={icon4link}
                    color={"white"}
                    width={"75%"}
                    maxWidth={"60px"}
                    src={icon4} />
            </div>
        </div>
    )
}

export default SocialCircles;