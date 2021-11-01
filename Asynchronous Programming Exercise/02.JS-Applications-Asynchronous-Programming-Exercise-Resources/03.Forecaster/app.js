function attachEvents() {
    let forecastOuput = document.querySelector('#forecast');
    document.querySelector('#submit').addEventListener('click', getWeather);

    function getWeather(e) {
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(res => res.json())
            .then(data => {
                let currentOutput = forecastOuput.querySelector('#current');
                let upcomingOutput = forecastOuput.querySelector('#upcoming');
                let errorCheck = document.querySelector('.error');

                if (errorCheck) {
                    errorCheck.remove();
                }

                clearWeatherInfo(currentOutput);
                clearWeatherInfo(upcomingOutput);

                let conditions = {
                    'Sunny': '☀',
                    'Partly sunny': '⛅',
                    'Overcast': '☁',
                    'Rain': '☂',
                    degrees: '°',
                };

                let location = document.querySelector('#location');
                let foundLocation = data.find(obj => obj.name === location.value);

                let currentWeatherPromise = fetch(`http://localhost:3030/jsonstore/forecaster/today/${foundLocation.code}`)
                    .then(res => res.json())
                    .then(currWeather => {
                        let currentWeatherDiv = createCurrWeather(currWeather, conditions);
                        currentOutput.appendChild(currentWeatherDiv);
                    });

                let upcomingWeatherPromise = fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${foundLocation.code}`)
                    .then(res => res.json())
                    .then(upcomingWeather => {
                        let upcomingWeatherDiv = createUpcommingWeather(upcomingWeather, conditions);
                        upcomingOutput.appendChild(upcomingWeatherDiv);
                    });


                Promise.all([currentWeatherPromise, upcomingWeatherPromise]).then(f => {
                    forecastOuput.style.display = 'block';
                });

                function createCurrWeather(currWeatherObj, conditions) {
                    let currentForecastDiv = document.createElement('div');
                    currentForecastDiv.classList.add('forecasts');

                    let symbolSpan = document.createElement('span');
                    symbolSpan.classList.add('condition', 'symbol');
                    symbolSpan.textContent = conditions[currWeatherObj.forecast.condition];

                    let conditionSpanWrapper = document.createElement('span');
                    conditionSpanWrapper.classList.add('condition');

                    let nameSpan = document.createElement('span');
                    nameSpan.classList.add('forecast-data');
                    nameSpan.textContent = currWeatherObj.name;

                    let tempSpan = document.createElement('span');
                    tempSpan.classList.add('forecast-data');
                    tempSpan.textContent = `${currWeatherObj.forecast.low}${conditions.degrees}/${currWeatherObj.forecast.high}${conditions.degrees}`;

                    let conditionSpan = document.createElement('span');
                    conditionSpan.classList.add('forecast-data');
                    conditionSpan.textContent = currWeatherObj.forecast.condition;

                    conditionSpanWrapper.appendChild(nameSpan);
                    conditionSpanWrapper.appendChild(tempSpan);
                    conditionSpanWrapper.appendChild(conditionSpan);

                    currentForecastDiv.appendChild(symbolSpan);
                    currentForecastDiv.appendChild(conditionSpanWrapper);

                    return currentForecastDiv;
                }

                function createUpcommingWeather(upcomingWeatherObj, conditions) {
                    let upcomingForecastDiv = document.createElement('div');
                    upcomingForecastDiv.classList.add('forecast-info');

                    upcomingWeatherObj.forecast.forEach(obj => {
                        let upcomingSpanWrapper = document.createElement('span');
                        upcomingSpanWrapper.classList.add('upcoming');

                        let symbolSpan = document.createElement('span');
                        symbolSpan.classList.add('symbol');
                        symbolSpan.textContent = conditions[obj.condition];

                        let tempSpan = document.createElement('span');
                        tempSpan.classList.add('forecast-data');
                        tempSpan.textContent = `${obj.low}${conditions.degrees}${obj.high}${conditions.degrees}`;

                        let weatherInfoSpan = document.createElement('span');
                        weatherInfoSpan.classList.add('forecast-data');
                        weatherInfoSpan.textContent = upcomingWeatherObj.name;

                        upcomingSpanWrapper.appendChild(symbolSpan);
                        upcomingSpanWrapper.appendChild(tempSpan);
                        upcomingSpanWrapper.appendChild(weatherInfoSpan);
                        upcomingForecastDiv.appendChild(upcomingSpanWrapper);
                    });

                    return upcomingForecastDiv;
                }

                function clearWeatherInfo(input) {
                    Array.from(input.children).forEach((el, i) => {
                        if (i !== 0) {
                            el.remove();
                        }
                    });
                }
            })
            .catch(err => {
                let error = document.createElement('div');
                error.classList.add('label', 'error');
                error.textContent = 'Error';
                error.style.textAlign = 'center';
                forecastOuput.appendChild(error);
                forecastOuput.style.display = 'block';
            });
    }
}

attachEvents();