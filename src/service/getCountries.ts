export const getCountries = async (setCountries: (data: { flag: string; name: { common: string } }[]) => void) => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => setCountries(data))
    .catch((err) => console.error(err));
};
