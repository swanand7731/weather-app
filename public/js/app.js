const weatherForm = document.querySelector("form");
let locationMessage = document.querySelector("#location");
let forecastMessage = document.querySelector("#forecast");
let addressMessage = document.querySelector("#address");
let errorMessage = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let address = e.target[0].value;
  if (address) {
    fetch(`http://localhost:3000/weather?address=${address}`).then(
      (response) => {
        //After we get the response, try to parse it to an object
        response.json().then((data) => {
          if (data.error) {
            errorMessage.textContent = data.error;
            locationMessage.textContent = "";
            forecastMessage.textContent = "";
            addressMessage.textContent = "";
          } else {
            errorMessage.textContent = "";
            locationMessage.textContent = data.location;
            forecastMessage.textContent = data.forecast;
            addressMessage.textContent = data.address;
          }
        });
      }
    );
  } else {
      errorMessage.textContent = "Enter a valid address";
  }
});
