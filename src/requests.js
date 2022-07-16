const axios = require("axios");
const BASE_URL = "http://localhost:5000";
const constellationsUrl = `${BASE_URL}/constellations`;



const leo = {
    name: "Leo",
    meaning: "Lion",
    starsWithPlanets: 19,
    quadrant: "NQ2",
  };
  
  //INSTEAD OF GETTING THE DATA TWICE WE CHAIN IT
//   axios
//   .get(constellationsUrl)
//   .then(({ data }) => console.log(data));
  
//   axios
//   .post(constellationsUrl, leo)
//   .then(({ data }) => console.log(data));

  //CHAINING EXAMPLE:
  axios
  .get(constellationsUrl)
 
  .catch(console.log);

  
// REFACTOR: NO NEED TO NEST THENs
axios
  .get(constellationsUrl)
  .then(({ data }) => {
    return data.find(( { name }) => name === leo.name);
  })
  .then((exists) => {
    if (exists) throw `Constellation "${leo.name}" already exists.`;
    return axios
      .post(constellationsUrl, leo)
      .then(({ data }) => console.log(data));
  })
  .catch(console.log);


