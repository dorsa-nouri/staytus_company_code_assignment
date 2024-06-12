const BASE_URL = "https://swapi.dev/api";

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

// filter reptilian species
function filterReptilianSpecies(species) {
  return species.results.filter((specie) =>
    specie.classification.includes("reptile")
  );
}
// filter reptilian species for homeworld
function extractHomeworlds(reptilianSpecies) {
  return reptilianSpecies.map((specie) => specie.homeworld);
}
// fetch residents url list
async function fetchResidents(planet) {
  const residentsUrls = planet.residents;
  const residents = await Promise.all(
    residentsUrls.map(async (url) => await fetchData(url))
  );
  return residents;
}

// fetching films list from reptilian planets
async function fetchFilms(residents) {
  const filmUrls = residents.reduce(
    (acc, resident) => [...acc, ...resident.films],
    []
  );
  const films = await Promise.all(
    filmUrls.map(async (url) => await fetchData(url))
  );
  return films;
}

// main function to fetch and manipulate data
async function getReptilePlanets() {
  let url = `${BASE_URL}/species/`;
  let reptilianSpecies = [];

  // while the next page from responses exist it will check
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

  // fetching films titles from residents list
  for (const planet of reptilianPlanets) {
    const residents = await fetchResidents(planet);
    const films = await fetchFilms(residents);
    planet.films = films.map((film) => film.title);
  }

  return reptilianPlanets;
}

export default getReptilePlanets;
