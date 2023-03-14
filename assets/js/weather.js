import { weather_data } from './data.js';

let findCity = function (ciudad) {
    for (let elemento of weather_data) {
        if (elemento["city"] == ciudad) {
            return elemento;
        }
    }
};

const loadDayForecastData = (ciudad = 'Guayaquil') => {
    const selectedCity = findCity(ciudad);
    for (let prop in selectedCity) {
        const elem = document.getElementById(prop);
        if (elem) {
            elem.innerHTML = selectedCity[prop];
        }
    }
    const forecastToday = selectedCity.forecast_today;
    for (let objeto of forecastToday) {
        const buscar = objeto.lapse;
        for (let clave in objeto) {
            const find = buscar + '_' + clave;
            const elem = document.getElementById(find);
            if (elem) {
                elem.innerHTML = objeto[clave];
            }
        }
    }
};

const loadWeekForecastData = (ciudad = 'Guayaquil') => {
    const selectedCity = findCity(ciudad);
    const prediccion = selectedCity.forecast_week;
    const padre = document.getElementsByClassName('list-group')[0];
    padre.innerHTML = '';
    for (let dia of prediccion) {
        const tmin = dia.temperature.min;
        const tmax = dia.temperature.max;
        const contenido = `<li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
      <div class="d-flex flex-column">
        <h6 class="mb-1 text-dark font-weight-bold text-sm">${dia.text}</h6>
        <span class="text-xs">${dia.date}</span>
      </div>
      <div class="d-flex align-items-center ">
        <span class="font-weight-bold text-dark mx-2">${tmax}</span> |  <span class="text-dark mx-2">${tmin}</span>
        <div class="ms-4"><i class="material-icons fs-2 me-1 rainy">${dia.icon}</i></div>
      </div>
    </li>`;
        padre.innerHTML += contenido;
    }
};

const cargarCiudades = () => {
    const element = document.getElementById('dropdownMenuButton');
    let contenido = '<option value="" selected disabled hidden>Seleccione una ciudad</option>';
    for (let item of weather_data) {
        const ciudad = item.city;
        contenido += `<option class="dropdown-item" value="${ciudad}">${ciudad}</option>`;
    }
    element.innerHTML = contenido;
};

document.addEventListener('DOMContentLoaded', (event) => {
    loadDayForecastData();
    cargarCiudades();

    const element = document.getElementById('loadinfo');

    element.addEventListener('click', (event) => {
        loadWeekForecastData();
    });

    const dropdown = document.getElementById('dropdownMenuButton');
    dropdown.addEventListener('change', (event) => {
        const ciudad = event.target.value;
        loadDayForecastData(ciudad);
        const padre = document.getElementsByClassName('list-group')[0];
        padre.innerHTML = '';
        element.addEventListener('click', (event) => {
            loadWeekForecastData(ciudad);
        });
    });
});






