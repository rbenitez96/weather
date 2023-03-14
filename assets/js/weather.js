import { weather_data } from './data.js';

let findCity = function(ciudad) {
    for (let elemento of weather_data) {
      if (elemento["city"] == ciudad) {
        return elemento;
      }
    }
  };

let loadDayForecastData = (ciudad = "Guayaquil") => {
    let selectedCity = findCity(ciudad);

    for (let prop in selectedCity){
        let elem = document.getElementById(prop);
        if (elem!=null){
            elem.innerHTML=selectedCity[prop]
        }
    }

    let forecast_today = selectedCity["forecast_today"];
    

    for (let objeto of forecast_today){
        let buscar =objeto["lapse"]
        for (let clave in objeto){
            find = buscar + "_" + clave;
            let elem = document.getElementById(find);
            if (elem!=null){
                elem.innerHTML=objeto[clave]
            }
        }
    }
}




let loadWeekForecastData = (ciudad = 'Guayaquil') => {

    let selectedCity = findCity(ciudad)

    let prediccion =selectedCity["forecast_week"];

    let padre = document.getElementsByClassName("list-group")
    padre = padre[0]
    padre.innerHTML = " "
    for (let dia of prediccion){
        let tmin = dia["temperature"]["min"];
        let tmax = dia["temperature"]["max"];
        
        let contenido = `<li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
    <div class="d-flex flex-column">
      <h6 class="mb-1 text-dark font-weight-bold text-sm">${dia["text"]}</h6>
      <span class="text-xs">${dia["date"]}</span>
    </div>
    <div class="d-flex align-items-center ">
      <span class="font-weight-bold text-dark mx-2">${tmax}</span> |  <span class="text-dark mx-2">${tmin}</span>
      <div class="ms-4"><i class="material-icons fs-2 me-1 rainy">${dia["icon"]}</i></div>
    </div>
  </li>`
    padre.innerHTML += contenido;
    }
    
	
	
}


let cargarCiudades =() => {
    let element = document.getElementById('dropdownMenuButton');
    for (let item of weather_data){
        let ciudad = item["city"]
        let contenido = `<option value="" selected disabled hidden>Seleccione una ciudad</option>
        <option class="dropdown-item" value="${ciudad}">${ciudad}</option>`
        element.innerHTML+=contenido;
    }
}


document.addEventListener("DOMContentLoaded", (event) => {
    
    loadDayForecastData();
    cargarCiudades();

    let element = document.getElementById('loadinfo');

    element.addEventListener('click', (event) => {
    
        loadWeekForecastData();
    
    });
});

let element = document.getElementById("dropdownMenuButton");

    element.addEventListener('change', (event) => {
    //Código a ejecutar
    //El event contiene la información del elemento seleccionado
    let ciudad = event.target.value
    loadDayForecastData(ciudad);
    
    let padre = document.getElementsByClassName("list-group")
    padre = padre[0]
    padre.innerHTML = " "
    
    
    let element = document.getElementById('loadinfo');

    element.addEventListener('click', (event) => {
    
        loadWeekForecastData(ciudad);
    });


});





