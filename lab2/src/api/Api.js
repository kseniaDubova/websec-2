export default class Api {
    async getAllStations() {
        return this.fetchData("/api/stations")
    }
  
    async getBetweenStation(from, to) {
      return this.fetchData(`/api/search?from=${from}&to=${to}`);
    }

    async getStationInfo(station) {
        return this.fetchData(`/api/schedule?station=${station}`);
    }
  
    async fetchData(endpoint) {
      try {
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("Ошибка запроса:", error);
        return null;
      }
    }
  }