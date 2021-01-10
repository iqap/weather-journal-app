// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip='
const apiKey = '&appid=07362f0275146db7e0743d166e3e4afb';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);

    if (!isValidZip) {
        alert("Not valid zip code!");
        return;
    }

    getWeather(baseURL, zip, apiKey)
        .then(function (data) {
            postData('/add', { date: data.dt, temp: data.main.temp, content: feelings });
        })
        .then(function () {
            getData()
        });

}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + key)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const getData = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        var date = new Date(data.date * 1000);
        document.getElementById('date').innerHTML = 'Date: ' + date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + data.temp + '℃';
        document.getElementById('content').innerHTML = 'Feeling: ' + data.content;

    } catch (error) {
        console.log("error", error);
    }
}
