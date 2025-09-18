export const getDataByQueryParams = (data, queryObj) => {
  const { name, location, country, continent, is_open_to_public } = queryObj;

  if (name) {
    data = data.filter(
      (destination) => destination.name.toLowerCase() === name.toLowerCase()
    );
  }

  if (location) {
    data = data.filter(
      (destination) =>
        destination.location.toLowerCase() === location.toLowerCase()
    );
  }

  if (continent) {
    data = data.filter(
      (destination) =>
        destination.continent.toLowerCase() === continent.toLowerCase()
    );
  }

  if (country) {
    data = data.filter(
      (destination) =>
        destination.country.toLowerCase() === country.toLowerCase()
    );
  }

  if (is_open_to_public) {
    data = data.filter(
      (destination) =>
        destination.is_open_to_public ===
        JSON.parse(is_open_to_public.toLowerCase())
    );
  }
  return data;
};
