export class Forecast {
  public imgPath: string;
  public summary: string;
  public temperatureMax: number;
  public temperatureMin: number;
  public humidity: number;
  public precipitation: number;
  public wind: number;

  constructor(
    imgPath: string,
    summary: string,
    temperatureMax: number,
    temperatureMin: number,
    humidity: number,
    precipitation: number,
    wind: number
  ) {
    this.imgPath = imgPath;
    this.summary = summary;
    this.temperatureMax = temperatureMax;
    this.temperatureMin = temperatureMin;
    this.humidity = humidity;
    this.precipitation = precipitation;
    this.wind = wind;
  }
}
