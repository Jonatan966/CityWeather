const input = document.querySelector("input");
const button = document.querySelector("button");
const cityInfo = document.getElementById("city");
const closeModal = document.querySelector(".close-modal");

let cityWeatherProps;
let map = L.map('map');
let cityProps;

const SearchCity = {
  async showCity(){
    if(!input.value) {
      input.style.border= "1px solid red";
      return;
    };

    await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=d13978d5&city_name=${input.value}`)
    .then(response => response.json())
    .then(response => {
      if(response.results.city_name === input.value){
        cityWeatherProps = response.results
        input.style.border = "1px solid rgba(0,0,0,0.1)";
      } else {
        alert("Cidade não cadastrada no sistema");
      }
    });

    await fetch(`https://city-weather-api.herokuapp.com/place-details?input=${cityWeatherProps.city}`)
    .then(response => response.json())
    .then(response => cityProps = response );

    cityInfo.style.background = `url(${cityProps.imageURL})`;

    DOM.updateDegress();
    Modal.showMap();
  },
}

const DOM = {
  degress: document.querySelector("#degress"),
  region: document.querySelector("#region"), 
  image: document.querySelector("#dayOrNight"),

  updateDegress(){
    DOM.degress.innerHTML = `${cityWeatherProps.temp}º`;
    DOM.region.innerHTML = `${cityWeatherProps.city}`;

    DOM.image.src = `assets/${cityWeatherProps.currently}.png`;
  }
}

const Modal = {
  modal: document.querySelector(".modal-overlay"),

  toggleModal(){
    Modal.modal.classList.toggle("active");
  },

  reloadMyMap(){
    let mymap = cityProps ?
    map.setView([cityProps.coordinates.lat, cityProps.coordinates.lng], 15) : 
    map.setView([-23.1697205, -47.1473495], 11);

    return mymap;
  },

  showMap(){
    let mymap = Modal.reloadMyMap();

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZGFtYXNvbWFnbm8iLCJhIjoiY2tnNnh4OHIzMDIwYjJwbndjZXJwdzJlYiJ9.kVuWDJS8DvJgmtDyqr1ujQ'
    }).addTo(mymap);
  },
}

Modal.showMap();

button.addEventListener("click", SearchCity.showCity);
cityInfo.addEventListener("click", Modal.toggleModal);
closeModal.addEventListener("click", Modal.toggleModal);