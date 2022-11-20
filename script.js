const getCity = document.querySelector('#search');
const searchIcon = document.querySelector('#search-icon');

searchIcon.addEventListener('click', () => {
  createWeatherCard();
});

const getWeather = async (city) => {
  try {
    let weather = await fetch(
      `https://goweather.herokuapp.com/weather/${city}`
    );
    let data = await weather.json();
    const weatherData = processData(data);

    return weatherData;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const processData = (data) => {
  let jsonData = {
    temperature: data.temperature,
    wind: data.wind,
    description: data.description,
    forecast: data.forecast,
  };
  return jsonData;
};

let createWeatherCard = () => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('weatherCard');
  document.querySelector('main').append(newDiv);
  // make it async and add an await
  let values = getWeather(getCity.value);
  console.log(values);
  // newDiv.innerHTML = `
  //    <div class='test'>The weather in ${getCity.value} is ${values}</div>
  //    <div class='test2'>The temperature is ${values}</div>
  //    <div class='test2'>Wind strength is ${values}</div>
  //   `;
};
