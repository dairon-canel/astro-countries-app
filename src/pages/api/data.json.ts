import type { APIRoute } from 'astro';
import data from './_data.json';

export interface CardData {
  name: string;
  flag: string;
  population: number;
  region: string;
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

export const get: APIRoute = async function get({ params, request }) {
  const allCardData: CardData[] = data.map(country => {
    return {
      name: country.name,
      flag: country.flags.svg,
      population: country.population,
      region: country.region,
      capital: country.capital,
    };
  });
  return {
    body: JSON.stringify(allCardData),
  };
};
