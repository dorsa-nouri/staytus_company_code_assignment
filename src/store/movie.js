const BASE_URL = "https://swapi.dev/api";

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

function filterReptilianSpecies(species) {
  return species.results.filter((specie) =>
    specie.classification.includes("reptile")
  );
}

function extractHomeworlds(reptilianSpecies) {
  return reptilianSpecies.map((specie) => specie.homeworld);
}

async function fetchResidents(planet) {
  const residentsUrls = planet.residents;
  const residents = await Promise.all(
    residentsUrls.map(async (url) => await fetchData(url))
  );
  return residents;
}

async function fetchFilms(residents) {
  const filmUrls = residents.flatMap((resident) => resident.films);
  const films = await Promise.all(
    filmUrls.map(async (url) => await fetchData(url))
  );
  return films;
}

async function getReptilePlanets() {
  let url = `${BASE_URL}/species/`;
  let reptilianSpecies = [];

  while (url) {
    const speciesData = await fetchData(url);
    reptilianSpecies = [
      ...reptilianSpecies,
      ...filterReptilianSpecies(speciesData),
    ];
    url = speciesData.next;
  }

  const homeworldUrls = extractHomeworlds(reptilianSpecies);
  const reptilianPlanets = await Promise.all(
    homeworldUrls.map(async (url) => await fetchData(url))
  );

  for (const planet of reptilianPlanets) {
    const residents = await fetchResidents(planet);
    const films = await fetchFilms(residents);
    planet.films = films.map((film) => film.title);
  }

  return reptilianPlanets;
}

export default getReptilePlanets;
