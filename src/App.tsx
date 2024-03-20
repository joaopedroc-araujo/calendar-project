import EventCalendar from './components/EventCalendar';
import './App.css';
import { MonthProvider } from './context/MonthContext';

function App() {

  return (
    <MonthProvider>
      <EventCalendar
        events={[
          { title: 'Event 1', description: 'Description 1', 'starting-date': '2024-04-01', 'ending-date': '2024-04-20', location: 'Location 1' },
          { title: 'Event 2', description: 'Description 2', 'starting-date': '2024-05-02', 'ending-date': '2024-05-23', location: 'Location 2' },
        ]}
      />
    </MonthProvider>
  )
}

export default App;
