export const getDataByPathParams = (req, data, locationType) => {
  const continent = req.url.split("/").pop();
  return data.filter((destination) => {
    return destination[locationType].toLowerCase() === continent.toLowerCase();
  });
};
