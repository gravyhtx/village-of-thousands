import { events } from './eventsData';
import { isToday } from '../utils/siteFunctions';

import EventsPage from './EventsPage';
import PopUpPage from './PopUpPage';

const RenderEventPage = () => {
  const dates = [
    ...events.yr22[0].dates,
    ...events.yr22[1].dates,
  ];

  return isToday(dates) ? <PopUpPage /> : <EventsPage />;
}

export default RenderEventPage;