const axios = require("../utils/axios");
const { updateIfExists } = require("../src/main");

describe("Assignment", () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockImplementation((url) => {
      if (url.includes("error")) {
        const message = "Request failed with status code 404";
        return Promise.reject(new Error(message));
      }
      return Promise.resolve({
        data: {
          id: "dFBbdkr",
          name: "Vela",
          meaning: "Sails",
          starsWithPlanets: 7,
          quadrant: "SQ2",
        },
      });
    });
    axios.put = jest.spyOn(axios, 'put').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("updateIfExists()", () => {
    const data = {
      id: "dFBbdkr",
      name: "Vela",
      meaning: "Sails",
      starsWithPlanets: 7,
      quadrant: "SQ2",
    };

    beforeEach(() => {
      axios.put.mockImplementation(() => Promise.resolve({data}));
      const spy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should check if the constellation exists and update it if it does", async () => {
      const actual = await updateIfExists(data.id, data);
      expect(actual).toEqual(data);
    });

    it("should return the error message if there is one", async () => {
      const actual = await updateIfExists("error", data);
      expect(actual).toContain("404");
    });

    it("should not use console.log()", async () => {
      await updateIfExists(data.id, data);
      expect(console.log).toHaveBeenCalledTimes(0);
    });
  });
});
