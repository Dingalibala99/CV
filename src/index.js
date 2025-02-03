const axios = require("axios");

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("location").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const locationURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
  let location;

  axios.get(locationURL).then((res) => {
    location = {
      country: res.data.address.country,
      province: res.data.address.state,
      surburb: res.data.address.town,
    };
  });

  axios.get(`https://wttr.in/?format=j1&geoip=true`).then((data) => {
    if (data) {
      data = data.data;
      const currentWeatherTempC = data.weather[0].avgtempC;

      document.getElementById(
        "location"
      ).innerHTML = `location: ${location.country} ${location.province}, ${location.surburb}`;
      document.getElementById(
        "weather"
      ).innerHTML = `Weather: ${currentWeatherTempC} &#176;C`;
    } else {
      document.getElementById("location").innerHTML =
        "Error fetching location.";
    }
  });
}

getUserLocation();
