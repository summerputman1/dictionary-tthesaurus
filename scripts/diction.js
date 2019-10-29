const base = 'https://wordsapiv1.p.rapidapi.com/words/';
const headers = {
    "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "6b4acc164amsh75b2e3f133ccfccp17dcc6jsn9ba6be72cc7a"
}};
function getResponseJson(response){
    return response.json();
};

function checkForErrors(response){
    if(!response.ok){
        throw new Error(response.statusText);
    } 
    return response;
};

function getWord(word) {
    const query = `${word}`;

    return fetch(base + query, headers)
        .then(checkForErrors)
        .then(getResponseJson);
};

function getSyn(word) {
    const query = `${word}/synonyms`;

    return fetch(base + query, headers)
        .then(checkForErrors)
        .then(getResponseJson)
        .then(data => {
            return data.synonyms});
};

function getType(word) {
    const query = `${word}/partOfSpeech`;

    return fetch(base + query, headers)
        .then(checkForErrors)
        .then(getResponseJson)
        .then(data => {
            return data.partOfSpeech});
};
