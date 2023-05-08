import {Country} from "./pais.interface";
import {Region} from "./region.type";

export interface CacheStore {
  byCapital: TermCountries;
  byPais: TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries {
  term: string;
  paises: Country[];
}

export interface RegionCountries {
  region?: Region;
  paises: Country[];
}
