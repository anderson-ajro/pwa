
const obtenerClima=()=>{
  let ciudad=document.querySelector("#ciudad").value;


  if(ciudad.trim()===''){
      mostrarError("#msg-error","Debe completar el nombre de la ciudad");
      return;
  }

  consultarAPI(ciudad);

}

const consultarAPI=async(ciudad)=>{


const apiKey ='cdc048a2231b62725e4ac20811b5551c';
const url=`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

const respuesta=await fetch(url);
const resultado=await respuesta.json();
console.log(resultado);

if(resultado.cod=="404"){
  mostrarError("#msg-error",`No hay resultados para ${ciudad}`);
  return;
}
const {  main,
  name,
  sys,
  weather,
  wind}=resultado;
if (!name) return null;

const icon = `https://openweathermap.org/img/wn/${
  weather[0]["icon"]
}@2x.png`;

let main2=document.querySelector("#main2");

main2.innerHTML=`

<div class="city col-12" >
  <h2 class="city-name" data-name="${name},${sys.country}">
    <span>${name}</span>
    <sup>${sys.country}</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
  <ul>
  <li><span>Temp. Mín: ${Math.round(main.temp_min)}<sup>°C</sup></span></li>
  <li><span>Temp. Máx: ${Math.round(main.temp_max)}<sup>°C</sup></span></li>
  <li><span>Humedad: ${Math.round(main.humidity)}<sup>%</sup></span></li>
  <li><span>Sensación Termica: ${Math.round(main.feels_like)}<sup>°C</sup></span></li>
  <li><span>Presión Atmosferica: ${Math.round(main.pressure)}<sup>hPa</sup></span></li>
  <li><span>Velocidad del viento: ${(wind.speed)}<sup>m/Seg</sup></span></li>
  </ul>
  <figure>
    <img class="city-icon" src=${icon} alt=${weather[0]["main2"]}>
  </figure>
  </div>`;
  
}


const mostrarError=(elemento, mensaje)=>{
  divError = document.querySelector(elemento);
  divError.innerHTML= `<p>${mensaje}</p>`;
  setTimeout(()=> {divError.innerHTML=``;},2000);
} 