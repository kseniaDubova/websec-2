import { useState } from "react";
import StationSelector from "../components/ui/StationSelector.jsx";
import Api from "../api/Api"; 

function TwoStops({ stations }) {
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [betweenStation, setBetweenStation] = useState([]);
  const [loadingBetween, setLoadingBetween] = useState(false);

  async function fetchBetweenStation() {
    if (!selectedFrom || !selectedTo) return;

    setLoadingBetween(true);
    setBetweenStation([]);

    const api = new Api(); 
    let data = await api.getBetweenStation(selectedFrom.codes.yandex_code, selectedTo.codes.yandex_code); 

    if (data) {
      setBetweenStation(data.segments.map(el => ({
        label: el.thread.title,
        train: el.thread.number,
        time: el.duration,
      })));
    } else {
      setBetweenStation([]);
    }

    setLoadingBetween(false);
  }

  return (
    <div>
      <h2>Поиск маршрута между станциями</h2>

      <div className="station-search">
        <div>
          <h3>Откуда:</h3>
          <StationSelector stations={stations} onSelect={setSelectedFrom} />
        </div>
        <div>
          <h3>Куда:</h3>
          <StationSelector stations={stations} onSelect={setSelectedTo} />
        </div>
      </div>

      <button 
        onClick={fetchBetweenStation} 
        disabled={!selectedFrom || !selectedTo}
      >
        Найти маршрут
      </button>

      {loadingBetween ? (
        <p>Загрузка маршрутов...</p>
      ) : betweenStation.length > 0 ? (
        <div className="table-container">
          <table className="train-table">
            <thead>
              <tr>
                <th>Маршрут</th>
                <th>Поезд</th>
                <th>Время в пути (мин.)</th>
              </tr>
            </thead>
            <tbody>
              {betweenStation.map((route, index) => (
                <tr key={index}>
                  <td>{route.label}</td>
                  <td>{route.train}</td>
                  <td>{route.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Маршруты не найдены</p>
      )}
    </div>
  );
}

export default TwoStops;