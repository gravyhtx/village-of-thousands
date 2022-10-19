import vEv111122 from '../../public/images/events/v_ev_11-11-22-.jpg';

const UpcomingEvents = () => {
  const events = {
    "2022": [
      {
        "name": "BANGER! IN THE HANGAR! // VERT JAM // '22",
        "confirmed": true,
        "street": "",
        "cityState": "Houston, TX",
        "dates": ["11/11","11/12"],
        "times": ["2pm-11pm","12pm-11pm"],
        "flyer": vEv111122,
        "instagram": "",
        "website": "",
        "details": <>
          This is where we put details and things like a <a href={events.website}>link</a> for example.
          </>,
        "isPublic": true,
        "isOnline": false
      }
    ]
  }
}

export default UpcomingEvents;