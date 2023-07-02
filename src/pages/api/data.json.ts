import type { APIRoute } from 'astro';
import data from './_data.json';

export interface CardData {
  name: string;
  flag: string;
  population: number;
  region: string;
  nativeName: string;
  subRegion: string;
  topLevelDomain: string[];
  languages: string[];
  currencies?: string[];
  borderCountries?: string[];
  capital?: string;
}

/* <Card
        className="mx-14 mb-10"
        client:visible
        country={e.name}
        flagImage={e.flags.svg}
        flagAlt={`${e.name} Flag`}
        population={e.population}
        region={e.region}
        capital={e.capital}
      /> */

export const get: APIRoute = async function get({ params, request, props }) {
  const allCardData: CardData[] = data.map(country => {
    return {
      name: country.name,
      flag: country.flags.svg,
      population: country.population,
      region: country.region,
      nativeName: country.nativeName,
      subRegion: country.subregion,
      topLevelDomain: country.topLevelDomain,
      currencies: country.currencies?.map(currency => currency.name),
      languages: country.languages?.map(language => language.name),
      borderCountries: country.borders?.map(
        border => data.find(e => e.alpha3Code === border)?.name,
      ),
      capital: country.capital,
    };
  });
  return {
    body: JSON.stringify(allCardData),
  };
};
