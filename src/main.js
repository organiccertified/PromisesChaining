const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function updateIfExists(id, body) {
  const url = `${BASE_URL}/constellations/${id}`;
  return axios
    .get(url)
    .then(({ data }) => {
      return data.find(( { data }) => data.id == id); 
       })
    .then((exists) => {
      if (exists)
      return axios
        .put(url, body)
        .then(({ data }) => console.log(data));
      })
    .catch((error) => {
      console.log(error.message);
    })
}

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