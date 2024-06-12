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

  return reptilianPlanets;
}

export default getReptilePlanets;
