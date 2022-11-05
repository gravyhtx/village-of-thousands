import styles from './Event.module.css';
import { iconObj } from '../containers/SocialCircles';
import bangerFlyer from '../../public/images/events/vert_jam-site_flyer.png';

export const eventsData = {
  banger: {
    company: "Houston Vert Ramp",
    eventName: "BANGER! IN THE HANGAR!",
    fullEventName: <>
      <div className={styles.mainHeader}>BANGER! IN THE HANGAR!</div>
      <div className={styles.subHeader}>VERT JAM :: '22'</div>
    </>,
    flyer: bangerFlyer,
    site: ["website","https://bangerinthehangar.com"],
    siteIg: ["instagram","https://www.instagram.com/houstonvertramp/"],
    eventIg: ["instagram","https://www.instagram.com/bangerinthehangar/"],
    ytLink: ["youtube","https://www.youtube.com/channel/UCTmL28_JAGr2hQCl4sYHO_Q"]
  }
}

export const events = {
  "yr22": [
    {
      "name": eventsData.banger.fullEventName,
      "showName": false,
      "confirmed": true,
      "street": "2202 Paul Quinn St.",
      "cityState": "Houston, TX",
      "zip": "77091",
      "dates": ["11/11/2022","11/12/2022"],
      "times": ["2pm-11pm","12pm-11pm"],
      "flyer": eventsData.banger.flyer,
      "instagram": eventsData.banger.siteIg[1],
      "website": eventsData.banger.site[1],
      "iconsObjArr": [
        iconObj(
          eventsData.banger.company,
          false,
          eventsData.banger.eventName,
          eventsData.banger.site[0],
          eventsData.banger.site[1]),
        iconObj(
          eventsData.banger.company,
          false,
          eventsData.banger.eventName,
          eventsData.banger.siteIg[0],
          eventsData.banger.siteIg[1]),
        iconObj(
          eventsData.banger.company,
          true,
          eventsData.banger.eventName,
          eventsData.banger.ytLink[0],
          eventsData.banger.ytLink[1]),
        iconObj(
          eventsData.banger.company,
          true,
          eventsData.banger.eventName,
          eventsData.banger.eventIg[0],
          eventsData.banger.eventIg[1]),
      ],
      "isPublic": true,
      "isOnline": false
    },
    {
      "name": "SNEAKER SUMMIT",
      "showName": true,
      "confirmed": false,
      "street": "",
      "cityState": "Houston, TX",
      "dates": ["10/26/2022","12/12/2022"],
      "times": ["2pm-11pm","12pm-11pm"],
      "flyer": bangerFlyer,
      "instagram": "",
      "website": "ww",
      "iconsObjArr": [],
      "isPublic": true,
      "isOnline": false
    },
  ]
}