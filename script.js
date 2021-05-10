const input = document.querySelector("input");
const button = document.querySelector("button");
const openModal = document.querySelector("#city");
const closeModal = document.querySelector(".close-modal");

let city;

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
        city = response.results
        input.style.border = "1px solid rgba(0,0,0,0.1)";
      } else {
        alert("Cidade não cadastrada no sistema");
      }
    });

    DOM.updateDegress();
  },
}

const DOM = {
  degress: document.querySelector("#degress"),
  region: document.querySelector("#region"), 
  image: document.querySelector("#dayOrNight"),

  updateDegress(){
    DOM.degress.innerHTML = `${city.temp}º`;
    DOM.region.innerHTML = `${city.city}`;

    DOM.image.src = `assets/${city.currently}.png`;
  }
}

const Modal = {
  modal: document.querySelector(".modal-overlay"),

  toggleModal(){
    Modal.modal.classList.toggle("active");
  },
}

button.addEventListener("click", SearchCity.showCity);
openModal.addEventListener("click", Modal.toggleModal);
closeModal.addEventListener("click", Modal.toggleModal);
