const API_DOMAIN = "https://to-do-list-7387.onrender.com/";

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const result = await response.json();
  return result;
};

export const patch = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    body: JSON.stringify(options),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const result = await response.json();
  return result;
};
