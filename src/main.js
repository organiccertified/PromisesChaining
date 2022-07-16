const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function updateIfExists(id, body) {
  const url = `${BASE_URL}/constellations/${id}`;
  return axios
    .get(url)
    .then(({ data }) => {
      return data;
      })
    .then((exists) => {
      if (exists) throw `Constallation with "${id}" already exists`;
      return axios
        .put(url, body)
        .then(({ data }) => console.log(data));
      })
    .catch(({message}) => {
      console.error(message);    
    })
}

const leo = {
  name: "Columba",
  meaning: "Dove",
  starsWithPlanets: 3,
  quadrant: "SQ1"
};

console.log(updateIfExists("xxx", leo))

module.exports = {
  updateIfExists,
};

// REFACTOR: NO NEED TO NEST THENs
// axios
//   .get(constellationsUrl)
//   .then(({ data }) => {
//     return data.find(( { name }) => name === leo.name);
//   })
//   .then((exists) => {
//     if (exists) throw `Constellation "${leo.name}" already exists.`;
//     return axios
//       .post(constellationsUrl, leo)
//       .then(({ data }) => console.log(data));
//   })
//   .catch(console.log);