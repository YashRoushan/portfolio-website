export const cities = [
  { id: 'halifax', name: 'Halifax', region: 'Nova Scotia', code: 'NS', country: 'Canada', lat: 44.6476, lon: -63.5728 },
  { id: 'boston', name: 'Boston', region: 'Massachusetts', code: 'MA', lat: 42.3601, lon: -71.0589, station: 'KBOS' },
  { id: 'new-york', name: 'New York', region: 'New York', code: 'NY', lat: 40.7128, lon: -74.0060, station: 'KJFK' },
  { id: 'seattle', name: 'Seattle', region: 'Washington', code: 'WA', lat: 47.6062, lon: -122.3321, station: 'KSEA' },
  { id: 'san-francisco', name: 'San Francisco', region: 'California', code: 'CA', lat: 37.7749, lon: -122.4194, station: 'KSFO' },
  { id: 'chicago', name: 'Chicago', region: 'Illinois', code: 'IL', lat: 41.8781, lon: -87.6298, station: 'KORD' },
  { id: 'austin', name: 'Austin', region: 'Texas', code: 'TX', lat: 30.2672, lon: -97.7431, station: 'KAUS' },
  { id: 'denver', name: 'Denver', region: 'Colorado', code: 'CO', lat: 39.7392, lon: -104.9903, station: 'KDEN' },
  { id: 'miami', name: 'Miami', region: 'Florida', code: 'FL', lat: 25.7617, lon: -80.1918, station: 'KMIA' },
  { id: 'los-angeles', name: 'Los Angeles', region: 'California', code: 'CA', lat: 34.0522, lon: -118.2437, station: 'KLAX' },
  { id: 'atlanta', name: 'Atlanta', region: 'Georgia', code: 'GA', lat: 33.7490, lon: -84.3880, station: 'KATL' },
  { id: 'washington', name: 'Washington, DC', region: 'District of Columbia', code: 'DC', lat: 38.9072, lon: -77.0369, station: 'KDCA' },
  { id: 'phoenix', name: 'Phoenix', region: 'Arizona', code: 'AZ', lat: 33.4484, lon: -112.0740, station: 'KPHX' },
];
const cache = new Map();
export function numeric(value) { return typeof value === 'number' && Number.isFinite(value) ? value : null; }
export function temperature(value, sourceUnit = 'C', targetUnit = 'C') {
  const n = numeric(value); if (n === null) return null; if (sourceUnit === targetUnit) return n;
  return targetUnit === 'C' ? (n - 32) * 5 / 9 : n * 9 / 5 + 32;
}
export function observationValues(properties) {
  const celsius = q => temperature(q?.value, q?.unitCode?.endsWith('degF') ? 'F' : 'C', 'C');
  let wind = numeric(properties.windSpeed?.value);
  if (wind !== null && properties.windSpeed?.unitCode?.endsWith('m_s-1')) wind *= 3.6;
  let pressure = numeric(properties.barometricPressure?.value);
  if (pressure !== null && properties.barometricPressure?.unitCode?.endsWith(':Pa')) pressure /= 100;
  return { temperature: celsius(properties.temperature), wind, pressure, humidity: numeric(properties.relativeHumidity?.value), description: properties.textDescription || 'Conditions unavailable', timestamp: properties.timestamp || null };
}
export function conditionKind(description = '') {
  const value = description.toLowerCase();
  if (/thunder|storm/.test(value)) return 'storm'; if (/snow|sleet|ice|flurr/.test(value)) return 'snow'; if (/rain|drizzle|shower/.test(value)) return 'rain'; if (/fog|haze|mist/.test(value)) return 'fog'; if (/cloud|overcast/.test(value)) return 'cloud'; return 'sun';
}
export function formatPeriodDate(iso, timeZone) {
  if (!iso || Number.isNaN(Date.parse(iso))) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-CA', { weekday: 'short', month: 'short', day: 'numeric', timeZone }).format(new Date(iso));
}
export function formatObservationTime(iso, timeZone) {
  if (!iso || Number.isNaN(Date.parse(iso))) return 'Time unavailable';
  return new Intl.DateTimeFormat('en-CA', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone, timeZoneName: 'short' }).format(new Date(iso));
}
export async function requestJSON(url, signal, fetcher = fetch) {
  if (new URL(url).origin !== 'https://api.weather.gov') throw new Error('Unsupported weather source.');
  const controller = new AbortController(); const relay = () => controller.abort(signal?.reason);
  if (signal?.aborted) relay(); signal?.addEventListener('abort', relay, { once: true });
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetcher(url, { headers: { Accept: 'application/geo+json' }, signal: controller.signal });
    if (!response.ok) throw new Error(response.status === 429 ? 'The weather service is busy. Try again shortly.' : 'The National Weather Service could not return this forecast. Please retry.');
    const result = await response.json(); if (!result.properties) throw new Error('The weather service returned incomplete data. Please retry.'); return result.properties;
  } finally { clearTimeout(timer); signal?.removeEventListener('abort', relay); }
}
export async function loadWeather(city, signal, { force = false, fetcher = fetch, now = Date.now } = {}) {
  if (!city.station) return loadGlobalWeather(city, signal, { force, fetcher, now });
  const saved = cache.get(city.id); if (!force && saved && now() - saved.fetchedAt < 5 * 60 * 1000) return saved;
  const pointURL = `https://api.weather.gov/points/${city.lat.toFixed(4)},${city.lon.toFixed(4)}`;
  const observationURL = `https://api.weather.gov/stations/${city.station}/observations/latest`;
  const [point, observationResult] = await Promise.all([requestJSON(pointURL, signal, fetcher), requestJSON(observationURL, signal, fetcher).then(value => ({ value }), error => ({ error }))]);
  if (typeof point.forecast !== 'string' || !point.timeZone) throw new Error('Forecast location is temporarily unavailable. Please retry.');
  const forecast = await requestJSON(point.forecast, signal, fetcher);
  if (!Array.isArray(forecast.periods) || !forecast.periods.length) throw new Error('No forecast periods are available. Please retry.');
  const data = { city, timeZone: point.timeZone, periods: forecast.periods.slice(0, 14), forecastUpdated: forecast.updated || forecast.generatedAt, observation: observationResult.value ? observationValues(observationResult.value) : null, observationURL, forecastURL: point.forecast, fetchedAt: now() };
  cache.set(city.id, data); return data;
}

const globalForecast = 'https://api.open-meteo.com/v1/forecast';
const geocoding = 'https://geocoding-api.open-meteo.com/v1/search';

async function openMeteoJSON(endpoint, params, signal, fetcher) {
  const url = new URL(endpoint);
  url.search = new URLSearchParams(params);
  const timeout = AbortSignal.timeout(15000);
  const response = await fetcher(url.href, {
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  });
  if (!response.ok) throw new Error('Open-Meteo is temporarily unavailable. Please retry.');
  return response.json();
}

export async function searchCities(query, signal, fetcher = fetch) {
  const data = await openMeteoJSON(geocoding, { name: query, count: 8, language: 'en' }, signal, fetcher);
  return (data.results || []).filter(item =>
    Number.isFinite(item.latitude) && Number.isFinite(item.longitude)
  ).map(item => ({
    id: String(item.id), name: item.name, region: item.admin1, country: item.country,
    lat: item.latitude, lon: item.longitude,
  }));
}

function description(code) {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mostly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorms';
  return 'Conditions unavailable';
}

async function loadGlobalWeather(city, signal, { force, fetcher, now }) {
  const key = String(city.lat) + ',' + String(city.lon);
  const saved = cache.get(key);
  if (!force && saved && now() - saved.fetchedAt < 5 * 60 * 1000) return saved;

  const payload = await openMeteoJSON(globalForecast, {
    latitude: city.lat,
    longitude: city.lon,
    current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,weather_code,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    timeformat: 'unixtime',
    forecast_days: 7,
  }, signal, fetcher);
  const { daily, current, timezone: timeZone } = payload;
  if (!daily?.time?.length || !timeZone) throw new Error('No forecast periods are available. Please retry.');
  const periods = daily.time.map((start, index) => {
    const high = numeric(daily.temperature_2m_max?.[index]);
    const low = numeric(daily.temperature_2m_min?.[index]);
    return {
      number: index,
      name: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : 'Day ' + (index + 1),
      startTime: new Date((start + 12 * 3600) * 1000).toISOString(),
      shortForecast: description(daily.weather_code?.[index]),
      lowTemperature: low,
      temperature: high,
      temperatureUnit: 'C',
      isDaytime: true,
      probabilityOfPrecipitation: { value: daily.precipitation_probability_max?.[index] },
    };
  });
  const observation = current && {
    timestamp: Number.isFinite(current.time) ? new Date(current.time * 1000).toISOString() : null,
    temperature: numeric(current.temperature_2m),
    wind: numeric(current.wind_speed_10m),
    pressure: numeric(current.surface_pressure),
    humidity: numeric(current.relative_humidity_2m),
    isDaytime: current.is_day === 1,
    description: description(current.weather_code),
  };
  const data = {
    city, timeZone, periods, observation, fetchedAt: now(),
    observationURL: 'https://open-meteo.com/', forecastURL: 'https://open-meteo.com/en/docs',
  };
  if (cache.size >= 64) cache.delete(cache.keys().next().value);
  cache.set(key, data);
  return data;
}
