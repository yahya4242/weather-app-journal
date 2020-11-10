/* Global Variables */
/*baseURL and APIkey*/
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e6e1b15af6ab7720d05ade867b535cfb';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/*add event listener to the generate button*/
document.getElementById('generate').addEventListener('click', performAction);
/*function for the event listener*/
function performAction(e) {
    /*get the entries from the user*/
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    /*call the weatherNow func to get weather data*/
    weatherNow(baseURL, zip, apiKey)
        .then(function(data) {
            console.log(data);
            /* add data to POST request*/
            sendData('http://localhost:3000/add', { date: newDate, temp: data.main.temp, content: content })

        })
        /*call the function to change the text on the page*/
        .then(function() { showText() })
};

/* get the current weather from the API*/
const weatherNow = async(baseURL, zip, apiKey) => {
    const res = await fetch(baseURL + zip + apiKey);
    console.log(res);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    // if there is any errors
    catch (error) {
        console.log("error", error);
    };
};

/*send data*/
const sendData = async(url = '', data = {}) => {
    console.log(data);
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        /*convert json into string*/
        body: JSON.stringify(data),
    });
    /*if ok*/
    try {
        const newData = await res.json();
        return newData;
    }
    /* if error*/
    catch (error) {
        console.log('error', error);
    };
};
/*change the textarea values*/
const showText = async() => {
    const request = await fetch('http://localhost:3000/all');
    try {
        const fullData = await request.json()
            /*update the values*/
        document.getElementById('date').innerHTML = 'Date: ' + fullData.date;
        document.getElementById('temp').innerHTML = 'Temprature: ' + fullData.temp;
        document.getElementById('content').innerHTML = 'You feel: ' + fullData.content;
    }
    /*if error*/
    catch (error) {
        console.log("error", error);
    };
};