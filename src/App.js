import React, {useState} from 'react';

const api = {
  key: "409f7729f91e4da519ffd813469e57fb",
  base: "http://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  let checkUndefined;
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(api.base+"weather?q="+query+"&units=metric&APPID="+api.key)
      .then(res => res.json())
      .then(result =>{
          setQuery('');
          setWeather(result);
          console.log("i is here dog");
          checkUndefined = result;
        });
        
    }
  }
  

  const dateBuilder= (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return day + " " + date + " " + month + " " + year
  }

  const sunrisebuilder = (w) => {
    var theDate = new Date((weather.sys.sunrise) * 1000);
    var dateString = theDate.toTimeString();
    
    return "\n" + dateString;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? 
    ((weather.main.temp > 30) ? 'app warm'
    :(weather.weather[0].main === "Clear") ? 'app clear' 
    :(weather.weather[0].main === "Clouds") ? 'app cloudy' 
    :(weather.weather[0].main === "Rain") ? 'app rainy'
    :(weather.weather[0].main === "Snow") ? 'app snow'
    :(weather.weather[0].main === "Wind") ? 'app windy'
    :(weather.weather[0].main === "Smoke") ? 'app smoke'
    :(weather.weather[0].main === "Mist") ? 'app mist'
    :(weather.weather[0].main === "Fog") ? 'app mist'  
    : 'app') 
    : 'app'}>
      <main>
        <div className="search-box">
          <input type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
            {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather-main">{weather.weather[0].main}</div>
            <div className="weather-des">{weather.weather[0].description}</div>
          </div>
          <div className="extra-info">
            <div className="humidity">Humidity: {weather.main.humidity}%</div>
            <div className="feels-like">Feels like: {Math.round(weather.main.feels_like)}°c</div>
            <div className="sunrise">{`Sunrise: ${sunrisebuilder()}`}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
