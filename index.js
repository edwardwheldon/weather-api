"use strict";

let loc = document.querySelector(".location");
let proxy = "https://cors-anywhere.herokuapp.com/";
let long;
let lat;
let weatherDescription = document.querySelector(".weather-description");
let weatherTimezone = document.querySelector(".weather-location");
let weatherTemp = document.querySelector(".weather-temperature");
let weatherUnit = document.querySelector(".weather-unit");
let weatherTempContainer = document.querySelector(".temperature-container");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    long = position.coords.longitude;
    lat = position.coords.latitude;

    const api =
      proxy +
      `https://api.darksky.net/forecast/fe1f018cf2094963b2715680b6e009c5/${lat},${long}`;

    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        let { temperature, summary, icon } = data.currently;
        let temperatureCelcius = (temperature - 32) / 1.8;
        let temperatureFahrenheit = temperature;
        temperatureCelcius = temperatureCelcius.toFixed(2);
        weatherTemp.textContent = temperatureCelcius;
        weatherUnit.textContent = "\u00B0C";
        weatherDescription.textContent = summary;
        weatherTimezone.textContent = data.timezone;

        setIcons(icon, document.querySelector(".weather-icon"));

        // toggle temperature unit
        let toggleTempUnit = () => {
          if (weatherUnit.innerHTML.includes("C")) {
            weatherTemp.innerHTML = temperatureFahrenheit;
            weatherUnit.textContent = "\u00B0F";
          } else if (weatherUnit.innerHTML.includes("F")) {
            weatherTemp.innerHTML = temperatureCelcius;
            weatherUnit.textContent = "\u00B0C";
          }
        };
        weatherTempContainer.addEventListener("click", toggleTempUnit);
      });
  });
}

function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: "white" });
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}
