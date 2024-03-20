import EventCalendar from './components/EventCalendar';
import './App.css';

function App() {

  return (
    <EventCalendar
      events={[
        { title: 'Event 1', description: 'Description 1', 'starting-date': '2021-08-01', 'ending-date': '2021-08-01', location: 'Location 1' },
        { title: 'Event 2', description: 'Description 2', 'starting-date': '2021-08-02', 'ending-date': '2021-08-02', location: 'Location 2' },
      ]}
    />
  )
}

export default App;
