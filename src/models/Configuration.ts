import Pet from './Pet';

export default class Configuration {
  public static CorsEscape = "https://cors-escape.herokuapp.com/";
  public static MinCountValue = 1;
  public static MaxCountValue = 10;
  public static PictureHeight = "200px";
  public static RandomPet = { name: "losowe", endpointName: "random" };
  public static Pets: Pet[] = [
    { name: "psy", endpointName: "shibes" },
    { name: "koty", endpointName: "cats" },
    { name: "ptaki", endpointName: "birds" }];
}