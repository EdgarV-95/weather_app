const city = document.querySelector('#search');
const searchIcon = document.querySelector('#search-icon');

searchIcon.addEventListener('click', () => {
  resetContent();
  getWeather(city.value);
});

const getWeather = async (city) => {
  if (city.length === 0) {
    alert('Please enter a city name.');
  } else {
    try {
      const weather = await fetch(
        `https://goweather.herokuapp.com/weather/${city}`
      );
      const weatherData = await weather.json();
      createWeatherCard(weatherData);
    } catch (err) {
      console.log(err);
    }
  }
};

const createWeatherCard = (weatherData) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('weatherCard');
  document.querySelector('main').append(newDiv);
  newDiv.innerHTML = `
  <div class="today">
    <div class="w-today">Today: ${
      weekdays[day]
    } - ${dd}/${mm}/${yyyy}</div>
    <div class="w-description">The weather in ${city.value}: ${
    weatherData.description
  }</div>
    <div class="w-temperature">The temperature: ${
      weatherData.temperature
    }</div>
    <div class="w-wind">Wind strength: ${weatherData.wind}</div>
  </div>
  <div class="forecast"> 
    <div class="forecast-day">${weekdays[day + 1]}: ${
    weatherData.forecast[0].temperature
  } <br>Wind strength: ${weatherData.forecast[0].wind}</div>
    <div class="forecast-day">${weekdays[day + 2]}: ${
    weatherData.forecast[1].temperature
  } <br>Wind strength: ${weatherData.forecast[1].wind}</div>
    <div class="forecast-day">${weekdays[day + 3]}: ${
    weatherData.forecast[2].temperature
  } <br>Wind strength: ${weatherData.forecast[2].wind}</div>
  </div>`;
};

const resetContent = () => {
  if (document.querySelector('.weatherCard')) {
    document.querySelector('.weatherCard').remove();
  } else return;
};

const date = new Date();
var weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let day = date.getDay();
let dd = date.getDate();
let mm = date.getMonth() + 1;
let yyyy = date.getFullYear();
