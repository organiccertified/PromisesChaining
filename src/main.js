const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function updateIfExists(id, body) {
  const url = `${BASE_URL}/constellations/${id}`; //looks for id -OK
  return axios
    .get(url)
    .then(({ data }) => {
      return data;          //returns data - ok
      })
    .then((exists) => {                               //this fails
      if (exists) throw `Constallation with "${id}" already exists`;
      return axios
        .put(url, body)                               // because 11 fails this fails
        .then(({ data }) => console.log(data));
      })
    .catch(({message}) => {         // if ln 11 fails why msg nto gets printed correctly?
      console.error(message);    
    })
}

// test data
const leo = {
  name: "Columba",
  meaning: "Dove",
  starsWithPlanets: 3,
  quadrant: "SQ1"
};
//local test
console.log(updateIfExists("xxx", leo))
//finish test block

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