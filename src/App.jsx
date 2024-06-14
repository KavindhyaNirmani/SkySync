import { useState } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

function App() {
  const [input, setInput] = useState('');
  const { weather, thisLocation, values, setPlace } = useStateContext();

  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input 
            type="text" 
            placeholder='Search city' 
            className='focus:outline-none w-full text-[#212121] text-lg' 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity();
              }
            }} 
          />
        </div>
      </nav>
      <BackgroundLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        {weather && (
          <WeatherCard
            place={thisLocation}
            windspeed={weather.wind?.speed}
            humidity={weather.main?.humidity}
            temperature={weather.main?.temp}
            heatIndex={weather.main?.feels_like}
            iconString={weather.weather?.[0]?.icon}
            conditions={weather.weather?.[0]?.description}
          />
        )}
        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {values.slice(1, 7).map((curr, index) => (
            <MiniCard
              key={index}
              time={curr.dt_txt}
              temp={curr.main?.temp}
              iconString={curr.weather?.[0]?.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;