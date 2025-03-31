import { useState } from "react";

function StationSelector({ stations, onSelect }) {
  const [search, setSearch] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredStations = search.trim()
    ? stations.filter((station) =>
        station.title.toLowerCase().includes(search.trim().toLowerCase())
      )
    : stations;


  const handleSelectStation = (station) => {
    setSearch(station.title); 
    setIsInputFocused(false); 
    onSelect(station); 
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 200);
  };

  return (
    <div className="ui-search">
      <input
        type="text"
        placeholder="Поиск станции..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={handleBlur}
      />
      {isInputFocused && (
        <div className="search">
          {filteredStations ? (
            <ul>
              {filteredStations.map((station) => (
                <li
                  key={station.codes.yandex_code}
                  onMouseDown={() => handleSelectStation(station)}
                  style={{ cursor: "pointer" }}
                >
                  {station.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>Станции не найдены</p>
          )}
        </div>
      )}
    </div>
  );
}

export default StationSelector;