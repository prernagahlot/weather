/*
async function showweather()
{
   let city= "london";
   let API_key= "b7ae1389d1b9422bdddafaea7dca9698";
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
    const data = await api.json();
    console.log(data);

    let newp= document.createElement('p');
    newp.textContent= `${data?.main?.temp.toFixed(2)} °C` ;
document.body.appendChild(newp);
}

showweather();

function getlocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    else
    {
       console.log('no geolocation support') ;
    }


}

function showPosition(position)
{
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;

    console.log(lat);
    console.log(longi);
}
getlocation();
*/
const usertab = document.querySelector("[data-userWeather]");
const searchtab= document.querySelector("[data-searchWeather]");
const usercontainer= document.querySelector(".weather-container");
const grantAccessContainer= document.querySelector(".grant-location-container");
const searchform = document.querySelector("[data-search-form]");
const loadingscreen = document.querySelector(".loading-container");
const userWeatherInfo = document.querySelector(".userWeatherInfo")

let current_tab = usertab;     



current_tab.classList.add("current-tab");  
getfromsessionstorage();
function switchtab(clickedtab)
{
    if(clickedtab != current_tab)
    {
          current_tab.classList.remove("current-tab");
          current_tab = clickedtab;
          current_tab.classList.add("current-tab");
          console.log("success");


         if(!searchform.classList.contains("active"))
          {
            userWeatherInfo.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchform.classList.add("active");
          }
          else{
            grantAccessContainer.classList.remove("active");
            searchform.classList.remove("active");
            userWeatherInfo.classList.remove("active");
            getfromsessionstorage();
          }
          
    }

}
                                 
usertab.addEventListener("click",()=>
{
    switchtab(usertab);
});

searchtab.addEventListener("click",()=>
{
    switchtab(searchtab);
});

function getfromsessionstorage()
{
    const localcoordinates = sessionStorage.getItem("user-coordinates");
    if(!localcoordinates)
    {
        grantAccessContainer.classList.add("active");
    }
    else
    {
        const coordinates = JSON.parse(localcoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates)
{
    let API_key= "b7ae1389d1b9422bdddafaea7dca9698";
    const {lat,lon} = coordinates;
grantAccessContainer.classList.remove("active");
loadingscreen.classList.add("active");

        try
        {   const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);
            
        const data =  await api.json();

        loadingscreen.remove("active");

        userWeatherInfo.classList.add("active");

           renderUserInfo(data);

        }

        catch(err)
        { 

                 console.log(err)
        }
    
                                             
  
    }         
    
    function renderUserInfo(weatherInfo)
    {

        const cityname= document.querySelector("[data-city-name]");
        cityname.innerText= weatherInfo?.name;

        const countryIcon = document.querySelector("[data-country-icon]")     
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

    const weatherIcon = document.querySelector("[weatherIcon]")

    const desc = document.querySelector("[data-weather-disc]");

    desc.innerText= weatherInfo?.weather?.[0]?.description;

    const windsp= document.querySelector("[data-windspeed]");
    windsp.innerText = weatherInfo?.wind?.speed;

    const humidity= document.querySelector("[data-humity]");
    humidity.innerText= weatherInfo?.main?.humidity;

    const clouds = document.querySelector("[data-clouds]");
    clouds.innerText= weatherInfo?.clouds?.all;
    }  

    function getlocation()
    {
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(showPosition);

        }

        else
        {
            console.log(err);
        }
    }

    function showPosition(position)
    {
const usercoordinates= 
{
    lat : position.coords.latitude,
    lon : position.coords.longitude,
}

sessionStorage.setItem("user-coordinates",JSON.stringify(usercoordinates));
    
fetchUserWeatherInfo(usercoordinates);
    }


    const grantaccessbtn = document.querySelector("[ data-grant-access-btn]");
    grantaccessbtn.addEventListener("click",getlocation);

    const searchinput= document.querySelector("[data-search-input]");

    searchform.addEventListener("submit",(e)=>
    {
        e.preventDefault();
        let citname = searchinput.value;

        if(citname === "")
    return;
else{
    fetchSearchUserWeatherInfo(citname);
}

    })

    async function fetchSearchUserWeatherInfo(city)
    {     
        userWeatherInfo.classList.add("active");
        try
        {
            let API_key= "b7ae1389d1b9422bdddafaea7dca9698";
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
            const data= await res.json();
            renderUserInfo(data);
        }

        catch(err)
        {
                  console.log(err);
        }
        
    }

    
