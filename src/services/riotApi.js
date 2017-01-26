import Axios from 'axios';

function onError(error) {
    if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else {
        console.log('Error', error.message);
    }
}

function get(remoteApiUrl, params, responseHandler, errorHandler = onError) {
    return Axios.get(remoteApiUrl, params)
        .then(responseHandler)
        .catch(errorHandler);
}

module.exports = {
    get
}
