const inputBtn = document.getElementById('inp_btn');
const inpBox  = document.getElementById('inpBox');
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const place = document.getElementById("place");
const country = document.getElementById("country");
const icon = document.getElementById("icon_img");



inputBtn.addEventListener('click',function() {
    let cityName = inpBox.value;
    getApi(cityName);
    setTimeout(function() {
        document.getElementById("weather_section").style.display = "flex";

    },1000)
   
})

function getApi(city) {
    const KEY = "5578f70fa12be4ddaabcd86570f7a58f"
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`;
    fetchAPI(api);
}


function fetchAPI(url){
    fetch(url,{
        method: 'GET',
    })
    .then((response)=>{
       return response.json();
    })
    .then((weatherData)=> {
        fillWeatherDetails(weatherData);
    })
    .catch((error)=>{
        fillWeatherDetails(error);
    })
}

function fillWeatherDetails(weatherInfo){
    console.log(weatherInfo);
     let id = weatherInfo.weather[0].id;
     let weatherIcon = weatherInfo.weather[0].icon;

     if(id === 800){
         icon.src = "./img/weather-app-icons/Weather Icons/clear.svg";
     }else if(id >=800 && id <= 804){
         icon.src = `./img/weather-app-icons/Weather Icons/cloud.svg`;
     }else if(id >700 && id <= 781){
         icon.src = `./img/weather-app-icons/Weather Icons/haze.svg`;
     }else if(id >=500 && id <=531){
         icon.src = `./img/weather-app-icons/Weather Icons/rain.svg`;
     }else if(id >=600 && id <=632){
         icon.src = `./img/weather-app-icons/Weather Icons/snow.svg`;
     }else if(id >=200 && id <=232){
         icon.src = `./img/weather-app-icons/Weather Icons/storm.svg`;
     }
     
    
        temp.innerText = (weatherInfo.main.temp).toFixed(1);
        desc.innerText = weatherInfo.weather[0].description;
        place.innerText = `${weatherInfo.name},`;
        country.innerText = weatherInfo.sys.country;
        
    
}