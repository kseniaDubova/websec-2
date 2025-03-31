import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/ui/Navigation';
import AppRouter from './router';
import Api from './api/Api';

function App() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStations() {
      const api = new Api();
      let data = await api.getAllStations();
      if (data) {
        data = data.countries.find(el => el.title === 'Россия')
          .regions.find(el => el.title === 'Самарская область')
          .settlements.find(el => el.title === 'Самара')
          .stations.filter(el => el.station_type === "station");

        setStations(data);
      }
      setLoading(false);
    }

    fetchStations();
  }, []);

  return (
    <div className='App'>
      <header className='header'>
        <h1>Добро пожаловать в Самару</h1>
        <Navigation />
      </header>
      {loading ? <p>Загрузка станций...</p> : <AppRouter stations={stations} />}
    </div>
  );
}

export default App;