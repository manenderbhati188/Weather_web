const input_box=document.querySelector(".search input");
const search_btn=document.querySelector(".search button");
const weather_img=document.querySelector(".weather_icon");

const apikey="1d99df8bbc7c72154518b2590cacc9ec";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
async function checkWeather(city){
    const response=await fetch(apiurl + city + `&appid=${apikey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else
    {
        var data=await response.json();
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
        document.querySelector(".wind").innerHTML=data.wind.speed + "Km/h";
        
        if(data.weather[0].main=="Clouds"){
            weather_img.src="images/clouds.png";
        }
        else if(data.weather[0].main=="Clear"){
            weather_img.src="images/clear.png";
        }
        else if(data.weather[0].main=="drizzle"){
            weather_img.src="images/drizzle.png";
        }
        else if(data.weather[0].main=="mist"){
            weather_img.src="images/mist.png";
        }
        else if(data.weather[0].main=="rain"){
            weather_img.src="images/rain.png";
        }
        document.querySelector(".weather").style.display="block"; 
        document.querySelector(".error").style.display="none";
        document.querySelector(".weather").style.display="block";
    }
   

}

search_btn.addEventListener('click', ()=>{
    checkWeather(input_box.value);
})