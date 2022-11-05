import { useState } from 'react';
// import vEv111122 from '../../public/images/events/vot_e_11-11-22.jpg';
import { GradientBox } from '../containers/FunBoxes';
import ImageContainer from '../containers/ImageContainer';
import { SocialCircles } from '../containers/SocialCircles';

import PopUpPage from './PopUpPage';

import { events } from './eventsData';

import styles from './Event.module.css';
import { isToday } from '../../utils/siteFunctions';

const EventsPage = () =>  {
  const link = (url, text) => <a className={styles.link} href={url}>{text}</a>

  const dates = [
    ...events.yr22[0].dates,
    ...events.yr22[1].dates,
  ];
  
  const DisplayEvents = () => {
    // const stripeColorsA = [
    //   ['rgb(77 177 255 / 80%)','rgba(192.156,224.557,250.014,0) 80%'],
    //   ['rgb(244 182 128 / 80%)','rgba(250.014,192.156,195.145,0) 80%'],
    //   ['rgb(159 126 240 / 80%)','rgba(195.145,250.014,192.156,0) 80%'],
    // ];
    // const stripeColorsB = [
    //   ['rgb(244 182 128 / 80%)','rgba(250.014,192.156,195.145,0) 80%'],
    //   ['rgb(77 177 255 / 80%)','rgba(192.156,224.557,250.014,0) 80%'],
    //   ['rgb(159 126 240 / 80%)','rgba(195.145,250.014,192.156,0) 80%'],
    // ];
    const stripeColorsA = [
      ['rgb(77 177 255 / 80%)','rgba(192.156,224.557,250.014,0) 80%'],
      ['rgb(133 165 193 / 80%)','rgba(250.014,192.156,195.145,0) 80%'],
      ['rgb(159 126 240 / 80%)','rgba(195.145,250.014,192.156,0) 80%'],
    ];
    const stripeColorsB = [
      ['rgb(133 165 193 / 80%)','rgba(250.014,192.156,195.145,0) 80%'],
      ['rgb(77 177 255 / 80%)','rgba(192.156,224.557,250.014,0) 80%'],
      ['rgb(159 126 240 / 80%)','rgba(195.145,250.014,192.156,0) 80%'],
    ];
    const gradientStripe = (colors) =>
      <GradientBox stripe={true} border={false} gradientBorder={{size: '4px'}}
        colorsArray={colors} contain={false} position={['217deg', '127deg', '336deg']} />
    const EventMap = () => {
    return (
    events.yr22.map((item, index) => {
      return <div key={index}>{
        item.confirmed ? <>
        {gradientStripe(stripeColorsA)}
        <div className={styles.eventMap} key={index}>
          <div className={styles.contentContainer}>
            <div className={styles.mapHeader}>{ item.showName ? item.name : '' }</div>
            <ImageContainer useNext={false} containerClasses={styles.flyer} img={item.flyer} />
            <div className={styles.dates}>{
              item.dates[0]
            + (item.dates.length > 1 ? ' - ':'')
            + (item.dates.length > 1 ? (item.dates[item.dates.length - 1]) : '')
            }</div>
            <div className={styles.location}>{
              ( item.street ? item.street : "" )
            + ( item.cityState ? ", " + item.cityState : "" )
            + ( item.zip ? ", " + item.zip : ""  )
            }</div>
            {item.iconsObjArr ?
              <div className={styles.socials}>{
              <SocialCircles isEvent={true} iconsObjArray={item.iconsObjArr} iconsLength={item.iconsObjArr.length} contain />
            }</div> : <div className={styles.website}>{link(item.website, item.website)}</div>}
          </div>
        </div>
        {gradientStripe(stripeColorsB)}</>
      : <></>}
      </div>
      })
    )}
    return (<div className={styles.main}>
      <div className={styles.componentHeader}>
        <div className={styles.headerText}>VoT Events</div>
      </div>
      <div className={styles.eventCard + " disable-highlight"}>
        <EventMap />
      </div>
      </div>
    )
  }
  
  const DisplayPopUp = () => <PopUpPage />

  // const dates = ['10/26/2022', '10/27/2022'];

  return isToday(dates) ? <DisplayPopUp /> : <DisplayEvents />;
}

export default EventsPage;