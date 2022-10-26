import { EventsPage } from "../../components/qr/UpcomingEvents";
import DefaultLayout from "../../templates/DefaultLayout";

const Events = () => {
  return (
  <DefaultLayout>
    <div>Upcoming Events</div>
    <div></div>
    <EventsPage />
  </DefaultLayout>
  )
}

export default Events;