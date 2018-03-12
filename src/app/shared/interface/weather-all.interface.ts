export interface WeatherAll {
  id: number;
  name: string;
  state: string;
  country: string;
  data: Data[];
}

interface Data {
  date: string;
  date_br: string;
  humidity: Humidity;
  rain: Rain;
  wind: Wind;
  uv: Uv;
  thermal_sensation: Humidity;
  text_icon: Texticon;
  temperature: Temperature;
}

interface Temperature {
  min: number;
  max: number;
  morning: Humidity;
  afternoon: Humidity;
  night: Humidity;
}

interface Texticon {
  icon: Icon;
  text: Text;
}

interface Text {
  pt: string;
  en: string;
  es: string;
  phrase: Phrase;
}

interface Phrase {
  reduced: string;
  morning: string;
  afternoon: string;
  night: string;
  dawn: string;
}

interface Icon {
  dawn: string;
  morning: string;
  afternoon: string;
  night: string;
  day: string;
}

interface Uv {
  max: number;
}

interface Wind {
  velocity_min: number;
  velocity_max: number;
  velocity_avg: number;
  gust_max: number;
  direction_degrees: number;
  direction: string;
}

interface Rain {
  probability: number;
  precipitation: number;
}

interface Humidity {
  min: number;
  max: number;
}
