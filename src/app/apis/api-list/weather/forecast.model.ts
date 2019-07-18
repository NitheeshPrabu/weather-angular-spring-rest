export class Forecast {
  public icon: string;
  public temperatureMax: number;
  public temperatureMin: number;
  public humidity: number;
  public precipitation: number;
  public wind: number;

  constructor(
    icon: string,
    temperatureMax: number,
    temperatureMin: number,
    humidity: number,
    precipitation: number,
    wind: number
  ) {
    this.icon = icon;
    this.temperatureMax = temperatureMax;
    this.temperatureMin = temperatureMin;
    this.humidity = humidity;
    this.precipitation = precipitation;
    this.wind = wind;
  }
}
