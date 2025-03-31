import express from "express";
import cors from "cors";
import axios from "axios";


const app = express();
const PORT = 3000;
const API_URL = "https://api.rasp.yandex.net/v3.0/";
const KEY = "9c3f4013-633c-4ea7-a987-755537b35259";

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "optionsSuccessStatus": 200
}

app.use(cors());


// Получить список всех станций
app.get("/api/stations", cors(corsOptions), async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}stations_list/`, {
      params: { apikey: KEY, format: "json", lang: "ru_RU" }, 
      headers: {withCredentials: true}
    });
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Ошибка запроса к API" });
  }
});

// Получить инфу о стаанции
app.get("/api/schedule", cors(corsOptions), async (req, res) => {
  try {
    const { station } = req.query; // Данные из запроса
    const response = await axios.get(`${API_URL}schedule/`, {
      params: { apikey: KEY, station: station, format: "json", transport_subtype: 'train'},
    });
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Ошибка получения расписания" });
  }
});

// Получить расписание между двумя станциями
app.get("/api/search", cors(corsOptions), async (req, res) => {
  try {
    const { from, to} = req.query; // Данные из запроса
    const response = await axios.get(`${API_URL}search/`, {
      params: { apikey: KEY, format: "json", from, to, transport_subtype: 'train'},
    });
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Ошибка получения расписания" });
  }
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));