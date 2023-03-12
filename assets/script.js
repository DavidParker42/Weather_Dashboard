var button = document.querySelector("#search");
var input = document.querySelector("#area");

let containerEl = document.querySelector("#currentWeather");

button.addEventListener("click", function(){
    let city = input.value 
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c325d6aef2a68c4a92f8adac2d88149f&units=imperial`;
    fetch(api)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (dataWeather){
        console.log(dataWeather)
        let nameEl = document.createElement("h2")
        nameEl.innerText = dataWeather.name 
        containerEl.appendChild (nameEl)
        let dateEl = document.createElement("span")
        dateEl.innerText = dataWeather.dt 
        containerEl.appendChild (dateEl)
        let imageEl = document.createElement("img");
        imageEl.src = `https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`;
        containerEl.appendChild(imageEl)
        let tempEl = document.createElement("h2");
        tempEl.innerText = dataWeather.main.temp;
        containerEl.appendChild(tempEl);
        let windEl = document.createElement("h2");
        tempEl.innerText = dataWeather.wind.speed;
        containerEl.appendChild(windEl);
        let humidityEl = document.createElement("h2");
        humidityEl.innerText = dataWeather.main.humidity;
        containerEl.appendChild(humidityEl);

        let fiveDayApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c325d6aef2a68c4a92f8adac2d88149f&units=imperial`;
        fetch(fiveDayApi)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (fiveWeather){
        console.log(fiveWeather)
    })
    })


});

