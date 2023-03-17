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
      // establishing array if it is in local storage
      var storage = JSON.parse(localStorage.getItem("cities"))||[]
      // adds new city to storage
      storage.push(city)
      // takes city in local storage, turns it from an array into a string
      localStorage.setItem ("cities", JSON.stringify(storage))
      containerEl.innerHTML=""
      // below is main weather
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
        document.getElementById("daysWeather").innerHTML = "";
        for (let i = 7; i < fiveWeather.list.length; i+=8) {
          let div_el = document.createElement("div")
          let dateEl = document.createElement("span");
          dateEl.innerText = dataWeather.dt;
          div_el.appendChild(dateEl);
          let imageEl = document.createElement("img");
          imageEl.src = `https://openweathermap.org/img/wn/${fiveWeather.list[i].weather[0].icon}@2x.png`;
          div_el.appendChild(imageEl);
          let tempEl = document.createElement("h2");
          tempEl.innerText = fiveWeather.list[i].main.temp;
          div_el.appendChild(tempEl);
          let windEl = document.createElement("h2");
          windEl.innerText = fiveWeather.list[i].wind.speed;
          div_el.appendChild(windEl);
          let humidityEl = document.createElement("h2");
          humidityEl.innerText = fiveWeather.list[i].main.humidity;
          div_el.appendChild(humidityEl);
          // must come last (below)
          document.getElementById("daysWeather").appendChild(div_el);
        }


    })
    })


});

