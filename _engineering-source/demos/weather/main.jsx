import React, { useEffect, useId, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { cities, conditionKind, formatObservationTime, formatPeriodDate, loadWeather, numeric, searchCities, temperature } from './weather.js';
import './style.css';

const paths = {
  search: <><circle cx="11" cy="11" r="5.75"/><path d="m15.5 15.5 4 4"/></>,
  pin: <><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.25"/></>,
  wind: <><path d="M3 8h11a2 2 0 1 0-2-2M3 12h16a2 2 0 1 1-2 2M3 16h9a2 2 0 1 1-2 2"/></>,
  drop: <path d="M12 3c-1.6 3.5-6 6.7-6 11a6 6 0 0 0 12 0c0-4.3-4.4-7.5-6-11Z"/>,
  gauge: <><path d="M5 19a9 9 0 1 1 14 0M12 13l4-4"/><circle cx="12" cy="13" r="1"/></>,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.7 8a7 7 0 0 1 11-2L20 9M4 15l3.3 3a7 7 0 0 0 11-2"/></>,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
  external: <path d="M8 16 17 7m-7 0h7v7"/>,
  moon: <path d="M19.4 15A8 8 0 0 1 9 4.6 8 8 0 1 0 19.4 15Z"/>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2m15 0h2M5.3 5.3l1.4 1.4m10.6 10.6 1.4 1.4m0-13.4-1.4 1.4M6.7 17.3l-1.4 1.4"/></>,
  cloud: <path d="M6.8 18a4.8 4.8 0 1 1 1.3-9.4 5.4 5.4 0 0 1 10.2 2.5A3.5 3.5 0 0 1 18 18Z"/>,
  rain: <><path d="M6 15a4 4 0 1 1 1.2-7.8 5.5 5.5 0 0 1 10.4 1.6A3.1 3.1 0 0 1 18 15M8 16l-1.4 3m6.3-3-1.4 3m6.3-3-1.4 3"/></>,
  snow: <path d="M12 3v18M4.2 7.5l15.6 9m0-9-15.6 9M9.5 5l2.5 2 2.5-2m-5 14 2.5-2 2.5 2M4.7 10l2.9-1 .1-3.2m8.6 12.4.1-3.2 2.9-1m0-4-2.9-1-.1-3.2m-8.6 12.4-.1-3.2-2.9-1"/>,
  storm: <><path d="M7.5 15H6.3a4 4 0 1 1 1-7.9 5.5 5.5 0 0 1 10.4 1.7A3.1 3.1 0 0 1 18 15h-1.5"/><path d="m12 13-2 4h3l-2 4"/></>,
  fog: <path d="M6 12a3 3 0 0 1 2-5.3 4.8 4.8 0 0 1 9.1 1.8A2.7 2.7 0 0 1 20 11M3 14h18M5 18h14"/>,
};
function Icon({ name, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
function WeatherIcon({ description, day = true, size }) {
  const kind = conditionKind(description);
  return <Icon name={kind === 'sun' && !day ? 'moon' : kind} size={size} />;
}
function CitySearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const wrapper = useRef(null);
  const input = useRef(null);
  const listId = useId();
  const term = query.trim();
  const [remote, setRemote] = useState(null);
  const local = cities.filter(city => [city.name, city.region, city.code, city.country].filter(Boolean).join(' ').toLowerCase().includes(term.toLowerCase()));
  const options = [...local, ...(remote?.term === term ? remote.cities.filter(
    city => !local.some(item => item.name === city.name && Math.abs(item.lat - city.lat) < 0.15 && Math.abs(item.lon - city.lon) < 0.15)
  ) : [])];
  const finding = open && term.length >= 3 && remote?.term !== term;

  useEffect(() => {
    if (!open || term.length < 3) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      searchCities(term, controller.signal).then(found => {
        if (!controller.signal.aborted) setRemote({ term, cities: found });
      }).catch(() => {
        if (!controller.signal.aborted) setRemote({ term, cities: [], unavailable: true });
      });
    }, 275);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [open, term]);
  const active = options[index];
  function choose(city) {
    setQuery(''); setIndex(-1); setOpen(false); onSelect(city);
  }
  useEffect(() => {
    if (open && index >= 0) document.getElementById(`${listId}-${index}`)?.scrollIntoView({ block: 'nearest' });
  }, [index, listId, open]);
  function keyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); setOpen(true);
      if (options.length) setIndex(current => event.key === 'ArrowDown' ? (current + 1) % options.length : (current <= 0 ? options.length - 1 : current - 1));
    }
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false); setIndex(-1); }
  }
  return <div className="search-wrap" ref={wrapper} onBlur={event => { if (!wrapper.current?.contains(event.relatedTarget)) { setOpen(false); setIndex(-1); } }}>
    <form className="search" onSubmit={event => { event.preventDefault(); if (options.length && (open || term)) choose(active || options[0]); else { setOpen(true); input.current?.focus(); } }}>
      <Icon name="search" />
      <label className="sr-only" htmlFor="city-input">Search cities worldwide</label>
      <input id="city-input" ref={input} role="combobox" autoComplete="off" placeholder="Search a city" value={query} aria-autocomplete="list" aria-expanded={open} aria-controls={listId} aria-activedescendant={open && active ? `${listId}-${index}` : undefined} onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setOpen(true); setIndex(-1); }} onKeyDown={keyDown} />
      <button type="submit" aria-label="Select city"><Icon name="arrow" size={18} /></button>
    </form>
    <div className="options" hidden={!open}>
      <div role="listbox" id={listId} aria-label="Matching cities">{options.map((city, i) => <div role="option" aria-selected={i === index} className={i === index ? 'option active' : 'option'} id={`${listId}-${i}`} key={city.id} onMouseDown={event => event.preventDefault()} onClick={() => choose(city)}><span>{city.name}</span><small>{[city.region, city.country].filter(Boolean).join(', ')}</small></div>)}</div>
      {!options.length && <p role="status">{finding ? 'Searching cities…' : remote?.term === term && remote.unavailable ? 'City search is temporarily unavailable.' : 'No matching cities. Try another city name.'}</p>}
    </div>
  </div>;
}
function Temp({ value, from = 'C', unit, compact = false }) {
  const reading = temperature(value, from, unit);
  return reading === null ? <span className="missing">—</span> : <>{Math.round(reading)}°{!compact && <span className="temp-unit">{unit}</span>}</>;
}
function Current({ city, data, unit, onRefresh }) {
  const observation = data.observation;
  const wind = observation?.wind;
  const metrics = [
    { name: 'Humidity', icon: 'drop', value: observation?.humidity == null ? '—' : `${Math.round(observation.humidity)}%` },
    { name: 'Wind speed', icon: 'wind', value: wind == null ? '—' : `${Math.round(unit === 'F' ? wind * .621371 : wind)} ${unit === 'F' ? 'mph' : 'km/h'}` },
    { name: 'Pressure', icon: 'gauge', value: observation?.pressure == null ? '—' : `${Math.round(observation.pressure)} hPa` },
  ];
  return <section className="current panel" aria-labelledby="current-heading">
    <div className="panel-top"><h2 id="current-heading"><span className={observation ? 'dot' : 'dot muted'}></span>Current conditions</h2><button className="icon-button" type="button" onClick={onRefresh} aria-label="Refresh weather" title="Refresh weather"><Icon name="refresh" size={17}/></button></div>
    <div className="current-content">
      <div><p className="location"><Icon name="pin" size={15}/>{[city.name, city.id === 'washington' ? '' : city.code || city.country].filter(Boolean).join(', ')}</p>
      {observation ? <><div className="big-temp"><Temp value={observation.temperature} unit={unit}/></div><p className="conditions">{observation.description}</p></> : <p className="conditions unavailable">Current readings are unavailable. The forecast is still available below.</p>}</div>
      {observation && <div className="hero-icon"><WeatherIcon description={observation.description} day={observation.isDaytime ?? data.periods[0]?.isDaytime} size={84}/></div>}
    </div>
    <div className="metrics">{metrics.map(metric => <div className="metric" key={metric.name}><p><Icon name={metric.icon} size={16}/>{metric.name}</p><strong>{metric.value}</strong></div>)}</div>
    <p className="data-time">{observation?.timestamp ? <>{city.station ? 'Observed' : 'Model estimate for'} {formatObservationTime(observation.timestamp, data.timeZone)} · <a href={data.observationURL} target="_blank" rel="noreferrer">{city.station ? `Station ${city.station}` : 'Open-Meteo'}<Icon name="external" size={13}/></a></> : city.station ? <>Reporting station: {city.station}</> : null}</p>
  </section>;
}
function Forecast({ data, unit }) {
  return <section className="forecast panel" aria-labelledby="forecast-heading">
    <div className="panel-top"><h2 id="forecast-heading">Extended forecast</h2><span className="tag">{data.periods.length} periods</span></div>
    <p className="forecast-note">Select any period for the full outlook.</p>
    <div className="periods">{data.periods.map((period, index) => {
      const chance = numeric(period.probabilityOfPrecipitation?.value);
      return <details className="period" key={period.number ?? `${period.startTime}-${index}`}>
        <summary><span className="period-icon"><WeatherIcon description={period.shortForecast} day={period.isDaytime} size={24}/></span><span className="period-name"><strong>{period.name}</strong><small>{formatPeriodDate(period.startTime, data.timeZone)}</small></span><span className="period-description">{period.shortForecast}</span><span className="period-rain" title="Chance of precipitation"><Icon name="drop" size={14}/>{chance === null ? '—' : `${chance}%`}</span><strong className="period-temp"><Temp value={period.temperature} from={period.temperatureUnit || 'F'} unit={unit} compact/></strong><span className="chevron" aria-hidden="true">⌄</span></summary>
        <p className="period-detail">{period.temperatureUnit === 'C' && period.lowTemperature != null ? <>High <Temp value={period.temperature} unit={unit}/> · Low <Temp value={period.lowTemperature} unit={unit}/></> : period.detailedForecast || period.shortForecast || 'No detailed forecast available.'}</p>
      </details>;
    })}</div>
    <p className="data-time">{data.forecastUpdated ? `Updated ${formatObservationTime(data.forecastUpdated, data.timeZone)} · ` : ''}<a href={data.forecastURL} target="_blank" rel="noreferrer">Forecast source<Icon name="external" size={13}/></a></p>
  </section>;
}
function App() {
  const [city, setCity] = useState(cities[0]);
  const [unit, setUnit] = useState('C');
  const [refresh, setRefresh] = useState(0);
  const [result, setResult] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    loadWeather(city, controller.signal, { force: refresh > 0 }).then(data => {
      if (!controller.signal.aborted) setResult({ city, refresh, data });
    }).catch(error => {
      if (!controller.signal.aborted) setResult({ city, refresh, error: ['AbortError', 'TimeoutError'].includes(error.name) || error instanceof TypeError ? 'Could not reach the weather service. Check your connection and try again.' : error.message });
    });
    return () => controller.abort();
  }, [city, refresh]);
  const pending = result?.city !== city || result?.refresh !== refresh;
  const data = pending ? null : result.data;
  const error = pending ? null : result.error;
  function chooseCity(nextCity) { if (nextCity !== city) { setRefresh(0); setCity(nextCity); } }
  function reload() { setRefresh(value => value + 1); }
  return <div className="site">
    <header className="masthead"><div className="page masthead-inner"><a className="brand" href="./" aria-label="Weather Explorer home"><span className="brand-icon"><Icon name="sun" size={21}/></span><span>Weather Explorer</span></a><a className="back-link" href="../../">← <span>Engineering portfolio</span></a></div></header>
    <main className="page">
      <div className="intro"><p className="eyebrow"><span></span>Weather dashboard</p><h1>Weather Explorer</h1><p>Current conditions and forecasts for cities worldwide.</p></div>
      <div className="toolbar"><CitySearch onSelect={chooseCity}/><div className="unit-toggle" role="group" aria-label="Temperature unit"><button type="button" aria-pressed={unit === 'F'} onClick={() => setUnit('F')}>°F</button><button type="button" aria-pressed={unit === 'C'} onClick={() => setUnit('C')}>°C</button></div></div>
      <div className="quick" aria-label="Popular cities"><span>Quick pick</span>{cities.slice(0, 5).map(item => <button key={item.id} type="button" aria-pressed={item === city} onClick={() => chooseCity(item)}>{item.name}</button>)}</div>
      {pending && <section className="panel status" role="status"><span className="spinner" aria-hidden="true"/><div><h2>Loading {city.name}</h2><p>Getting the latest conditions and forecast.</p></div></section>}
      {error && <section className="panel status" role="status"><span className="status-icon"><Icon name="cloud" size={27}/></span><div><h2>Weather unavailable for {city.name}</h2><p>{error}</p><button type="button" className="retry" onClick={reload}>Try again <Icon name="refresh" size={15}/></button></div></section>}
      {data && <div className="weather-grid"><Current city={city} data={data} unit={unit} onRefresh={reload}/><Forecast data={data} unit={unit}/></div>}
    </main>
    <footer className="page footer"><span>Weather data from the <a href="https://www.weather.gov/documentation/services-web-api" target="_blank" rel="noreferrer">US National Weather Service <Icon name="external" size={13}/></a> and <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo <Icon name="external" size={13}/></a></span><span>Built by Yash Roushan</span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
