import { useState } from 'react';
import vEv111122 from '../../public/images/events/vot_e_11-11-22.jpg';
import { isToday } from '../../utils/siteFunctions';


export const EventsPage = () =>  {

  const events = {
    "yr22": [
      {
        "name": "BANGER! IN THE HANGAR! // VERT JAM // '22",
        "confirmed": true,
        "street": "",
        "cityState": "Houston, TX",
        "dates": ["11/11/2022","11/12/2022"],
        "times": ["2pm-11pm","12pm-11pm"],
        "flyer": vEv111122,
        "instagram": "",
        "website": "ww",
        "details": `This is where we put details and things like a <a href="www">link</a> for example.`,
        "isPublic": true,
        "isOnline": false
      },
      {
        "name": "BANGER! IN THE HANGAR! // VERT JAM // '22",
        "confirmed": true,
        "street": "",
        "cityState": "Houston, TX",
        "dates": ["10/26/2022","12/12/2022"],
        "times": ["2pm-11pm","12pm-11pm"],
        "flyer": vEv111122,
        "instagram": "",
        "website": "ww",
        "details": `This is where we put details and things like a <a href="www">link</a> for example.`,
        "isPublic": true,
        "isOnline": false
      },
    ]
  }
  
  const dates = [
    ...events.yr22[0].dates,
    ...events.yr22[1].dates
  ];
  
  const DisplayEvents = () => {
    const eventMap = events.yr22.map((item, index) => {
      return (
        <div key={index}>
          <div>{
            
          }</div>
        </div>
      )
    })
    return (<>
      <div>Events</div>
      { eventMap }
      </>
    )
  }
  
  const DisplayPopUp = () => {
    return (
      <div>Pop Up</div>
    )
  }
  // const dates = ['10/26/2022', '10/27/2022'];

  return isToday(dates) ? <DisplayPopUp /> : <DisplayEvents />;
}