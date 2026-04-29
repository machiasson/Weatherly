import { useState } from "react";
import "./styles.css";
const API_KEY = "2a80ebc30b1347c616af6bc52a553e7f"; 
export default function App() {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [weather1, setWeather1] = useState<any>(null);
  const [weather2, setWeather2] = useState<any>(null);
  const fetchWeather = async (city: string, setData: any) => {
    if (!city) return;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
    );
    const data = await res.json();
    setData(data);
  };
  return (
    <div className="app">
      <h1>Weatherly</h1>
      <p className="subtitle">Comparing locational and microclimate weather</p>
      <div className="search">
        <div>
          <input
            placeholder="Current Location"
            value={query1}
            onChange={(e) => setQuery1(e.target.value)}
          />
          <button onClick={() => fetchWeather(query1, setWeather1)}>
            Search
          </button>
        </div>
        <div>
          <input
            placeholder="Destination"
            value={query2}
            onChange={(e) => setQuery2(e.target.value)}
          />
          <button onClick={() => fetchWeather(query2, setWeather2)}>
            Search
          </button>
        </div>
      </div>
      <div className="weather">
        <WeatherCard data={weather1} />
        <WeatherCard data={weather2} />
      </div>
    </div>
  );
}
function WeatherCard({ data }: any) {
  if (data) {
    return (
      <div className="card">
        <h2>{data.name}</h2>
        <div className="temp">{Math.round(data.main.temp)}°F</div>
        <div className="grid">
          <p>Clouds: {data.clouds.all}%</p>
          <p>Rain: {data.rain?.["1h"] || 0} mm</p>
          <p>Wind: {data.wind.speed} mph</p>
          <p>Humidity: {data.main.humidity}%</p>
        </div>
      </div>
    );
  }
  return <div className="card empty">No data yet</div>;
}
