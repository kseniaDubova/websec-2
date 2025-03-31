import { useState, useEffect } from "react";
import StationSelector from "../components/ui/StationSelector.jsx";
import Api from "../api/Api"; 

function Home({ stations }) {
  const [selectedStation, setSelectedStation] = useState(null);
  const [activeStation, setActiveStation] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    if (!selectedStation) return;
  
    async function fetchActiveStation() {
      setLoadingInfo(true);
      const api = new Api(); 
      let data = await api.getStationInfo(selectedStation.codes.yandex_code);
  
      if (data) {
        setActiveStation(data.schedule.map(el => ({
          label: el.thread.title,
          train: el.thread.number,
          departure: el.departure,
          arrival: el.arrival,
        })));
      } else {
        setActiveStation([]);
      }
      setLoadingInfo(false);
    }
  
    fetchActiveStation();
  }, [selectedStation]);

  return (
    <div>
      <div className="station-search">
        <h2>ЖД станции: </h2>
        <StationSelector stations={stations} onSelect={setSelectedStation} />
      </div>
      {selectedStation && (
        <div className="result">
          <h2>Выбранная станция: {selectedStation.title}</h2>
          {loadingInfo ? (
            <p>Загрузка расписания...</p>
          ) : activeStation.length > 0 ? (
            <div className="table-container">
              <table className="train-table">
                <thead>
                  <tr>
                    <th>Маршрут</th>
                    <th>Поезд</th>
                    <th>Отправление</th>
                    <th>Прибытие</th>
                  </tr>
                </thead>
                <tbody>
                  {activeStation.map((item, index) => (
                    <tr key={index}>
                      <td>{item.label}</td>
                      <td>{item.train}</td>
                      <td>{item.departure}</td>
                      <td>{item.arrival}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Нет данных о движении поездов</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;