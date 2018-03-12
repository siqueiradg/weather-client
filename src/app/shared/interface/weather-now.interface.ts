export interface WeatherNow {
  id: number;
  name: string;
  state: string;
  country: string;
  data: Data;
}

interface Data {
  temperature: number;
  wind_direction: string;
  wind_velocity: number;
  humidity: number;
  condition: string;
  pressure: number;
  icon: string;
  sensation: number;
  date: string;
}
