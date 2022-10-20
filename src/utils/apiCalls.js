const axios = require("axios");


export function getAll() {
    return axios({
        "method": "GET",
        "url": "https://restcountries.com/v3.1/all",
    })
}

export function getByCountryName(countryName) {
    return axios({
        "method": "GET",
        "url": `https://restcountries.com/v3.1/name/${countryName}`,
    })
}

export function getImagesByCountry(countryName) {
    return axios({
        "method": "GET",
        "url": `https://api.unsplash.com/search/photos?page=1&client_id=${process.env.REACT_APP_API_ACCESS_KEY}&query=${countryName}`,
    }).then((response) => {
        let imgsUrl = [];
        response.data.results.map((data) => {
            return imgsUrl.push(data.urls.regular);
        });
        return imgsUrl;
    });

}


