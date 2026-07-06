import { useState } from 'react'
import './App.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [hour, setHour] = useState(0)
  const [unit, setUnit] = useState("F")
  

  const PhillyHourlyWeatherData = [
    { time: "now", temp: 95, condition: "Sunny", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "10am", temp: 96, condition: "Sunny", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "11am", temp: 96, condition: "Sunny", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "12pm", temp: 98, condition: "Sunny", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "1pm", temp: 99, condition: "Sunny", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "2pm", temp: 100, condition: "Sunny", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "3pm", temp: 98, condition: "Sunny", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "4pm", temp: 96, condition: "Sunny", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "5pm", temp: 95, condition: "Sunny", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "6pm", temp: 93, condition: "Sunny", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "7pm", temp: 91, condition: "Rainy", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "8pm", temp: 89, condition: "Rainy", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "9pm", temp: 87, condition: "Cloudy", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "10pm", temp: 85, condition: "Cloudy", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "11pm", temp: 85, condition: "Cloudy", humidity: 88, windspeed: 4, uvindex: 9 },
    { time: "12am", temp: 85, condition: "Foggy", humidity: 88, windspeed: 4, uvindex: 9 },
  ];
  /* Hourly Array above for Philadelphia + hour constant */

  const temps = PhillyHourlyWeatherData.map(data => data.temp)
  const highTemp = Math.max(...temps)
  const lowTemp = Math.min(...temps)

  function ToggleUnit() {
    setUnit(unit === "F" ? "C" : "F");
  }

  function FahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5 / 9).toFixed(1);
  }

  function ConvertTemp(temp) {
    if (unit === "F") {
      return temp + '°F';
    } else {
      return `${FahrenheitToCelsius(temp)}°C`;
    }
  }
 /* installed recharts: https://recharts.github.io/en-US/examples/SimpleLineChart/*/
  function DailyGraph({data, unit, ConvertTemp}) {
    const graphData = data.map((item) => ({
      time: item.time,
      temp: unit === "F" ? item.temp : FahrenheitToCelsius(item.temp),
    }));
  /* WHY IS IS NOT FITTING? any way to make it resizable on screen size? */
    return (
      <LineChart width={900} height={300} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      
    );
  }
  
  function SevereWeatherWarning({condition, temp}) {
    if (temp < 80) return null;
    else
    return ( 
            <section id="warning" className="bg-linear-to-b from-pink-300 to-blue-500 text-white py-4">
        <div className="warning flex justify-center items-center">
          <h2 className="text-xl font-bold">Weather Warning</h2>
        </div>
        <div>
          <p>Heat Advisory in effect until 8:00 PM EDT</p>
          <p>Excessive heat can cause heat exhaustion or heat stroke.</p>
        </div>
      </section>
    );
  }
   /* if (condition === "Rainy") {
      return (
        <section id="warning" className="bg-linear-to-b from-pink-300 to-blue-500 text-white py-4">
          <div className="warning flex justify-center items-center">
            <h2 className="text-xl font-bold">Weather Warning</h2>
          </div>
          <div>
            <p>Rain Advisory in effect until 8:00 PM EDT</p>
            <p>Heavy rain can cause flooding and dangerous driving conditions.</p>
          </div>
        </section>
      );
    }
    
  }
   Prop Destructuring with the cityweather function, maybe ideally import data and have these variables all be placeholders */
 
  function CityWeather({ time, temp, condition, humidity, windspeed, uvindex, onClick }) {
    let conditionicon = "";
    if (condition === "Sunny") 
      {
        conditionicon = "☀️"; 
      }
    else if (condition === "Cloudy") {
      conditionicon = "☁️";
    }
    else if (condition === "Rainy") 
      {
        conditionicon = "🌧️";
      }
    else if (condition === "Snowy") 
      {
        conditionicon = "❄️";
      }
    else if (condition === "Windy") {
      conditionicon = "💨";
    }
    else if (condition === "Stormy") {
      conditionicon = "⛈️";
    }
    else if (condition === "Foggy") {
      conditionicon = "🌫️";
    }

    return (
      <div
        onClick={onClick}
        className="flex flex-col items-center justify-center shrink-0 w-16 h-auto bg-purple-400 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition duration-300"
      >
        <h3 className="text-md font-bold">{time}</h3>
        <p className="text-xl">{conditionicon}</p>
        <p className="text-md">{ConvertTemp(temp)}</p>
      </div>
    );
  }

  return (
    <>
      <section id="top" className="bg-orange-500">
        <div className="top flex right-0 justify-end items-center">
          <button
            onClick={ToggleUnit}
            className="bg-white font-bold text-black py-2 px-4 rounded hover:bg-gray-200"
          >
            °{unit === "F" ? "C" : "F"}
          </button>
        </div>
      </section>

      <section id="center" className="bg-linear-to-b from-orange-500 via-yellow-400 to-pink-300">
        <div className="hero flex justify-center items-center"></div>
        <div>
          <h1>Weather in Philadelphia</h1>
          <p>Local Weather Forecast for Philly, PA</p>
          <h1 className="text-5xl text-red-500">{ConvertTemp(PhillyHourlyWeatherData[hour].temp)}</h1>
          <h3 className="text-md">{PhillyHourlyWeatherData[hour].condition}</h3>
          <p className="text-md">H: {ConvertTemp(highTemp)} L: {ConvertTemp(lowTemp)}</p>
        </div>
      </section>

<SevereWeatherWarning condition={PhillyHourlyWeatherData[hour].condition} temp={PhillyHourlyWeatherData[hour].temp} />

      <h2 className="m-0 bg-gradient-to-b from-blue-500 to-blue-400 text-white">Hourly Forecast</h2>
      <section id="weathercast" className="bg-gradient-to-b from-blue-400 to-purple-500">
        <div id="weathercast1" className="text-white flex gap-4 overflow-x-auto px-6 py-4">
          {PhillyHourlyWeatherData.map((data, index) => (
            <CityWeather key={index} {...data} onClick={() => setHour(index)} />
          ))}
        </div>
      </section>
      {/* Displaying the hourly data using .map to loop through array.
          {...data} was autcompleted by intellisense and is useful so i do not have to write all the props.
          onclick helps change the shown temperature to the selected hour
          i want it to display more like UV or humidity. */}
     <section id="graph" className="bg-gradient-to-b from-purple-500 to-pink-500">
        <div className="flex justify-center items-center py-4">
          {DailyGraph({ data: PhillyHourlyWeatherData, unit, ConvertTemp })}
        </div>
      </section>
  </>
)
}
export default App