const weatherForm = document.querySelector("form");
let locationMessage = document.querySelector("#location");
let forecastMessage = document.querySelector("#forecast");
let addressMessage = document.querySelector("#address");
let errorMessage = document.querySelector("#error");
let cloudcoverMessage = document.querySelector("#cloudcover");
let humidityMessage = document.querySelector("#humidity");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let address = e.target[0].value;
  if (address) {
    fetch(`/weather?address=${address}`).then(
      (response) => {
        //After we get the response, try to parse it to an object
        response.json().then((data) => {
          if (data.error) {
            errorMessage.textContent = data.error;
            locationMessage.textContent = "";
            forecastMessage.textContent = "";
            addressMessage.textContent = "";
            humidityMessage.textContent = "";
            cloudcoverMessage.textContent = "";
          } else {
            errorMessage.textContent = "";
            locationMessage.textContent = data.location;
            forecastMessage.textContent = data.forecast;
            addressMessage.textContent = data.address;
            humidityMessage.textContent = data.humidity + "%";
            cloudcoverMessage.textContent = data.cloudcover + "%";
          }
        });
      }
    );
  } else {
      errorMessage.textContent = "Enter a valid address";
  }
});
