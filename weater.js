const input_box=document.querySelector(".search input");
const search_btn=document.querySelector(".search button");
const weather_img=document.querySelector(".weather_icon");
const currentlocation=document.querySelector(".current-loc");

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
            weather_img.src="https://images.unsplash.com/photo-1569428034239-f9565e32e224?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D";
        }
        else if(data.weather[0].main=="Clear"){
            weather_img.src="https://t4.ftcdn.net/jpg/01/25/86/35/360_F_125863509_jaISqQt7MOfhOT3UxRTHZoEbMmmFYIr8.jpg";
        }
        else if(data.weather[0].main=="drizzle"){
            weather_img.src="https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=";
        }
        else if(data.weather[0].main=="mist"){
            weather_img.src="https://images5.alphacoders.com/387/387477.jpg";
        }
        else if(data.weather[0].main=="rain"){
            weather_img.src="https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?cs=srgb&dl=pexels-chetanvlad-1529360.jpg&fm=jpg";
        }
        document.querySelector(".weather").style.display="block"; 
        document.querySelector(".error").style.display="none";
        document.querySelector(".weather").style.display="block";
    }
   

}

search_btn.addEventListener('click', ()=>{
    checkWeather(input_box.value);
})
async function findlocation(lat,long)
{
    const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`);
    return await res.json();
}
async function getlocation(location){
    const data=await findlocation(
        location.coords.latitude,
        location.coords.longitude
    )   
    checkWeather(data.name);
    
}
async function notgetlocation(){
    console.log("Location Not Found");
}
currentlocation.addEventListener('click',async()=>{
    currlocation=navigator.geolocation.getCurrentPosition(getlocation,notgetlocation);
});
