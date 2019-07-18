export class WeatherDetail {
  public summary: string;
  public temperatureMax: number;
  public temperatureMin: number;
  public humidity: number;
  public precipitation: number;

  constructor(
    summary: string,
    temperatureMax: number,
    temperatureMin: number,
    humidity: number,
    precipitation: number
  ) {
    this.summary = summary;
    this.temperatureMax = temperatureMax;
    this.temperatureMin = temperatureMin;
    this.humidity = humidity;
    this.precipitation = precipitation;
  }
}
