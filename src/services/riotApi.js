import Axios from 'axios';

function get(remoteApiUrl, params, responseHandler) {
    Axios.get(remoteApiUrl, params)
        .then(responseHandler)
        .catch(function(error) {
            if(error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error', error.message);
            }
        });
}

module.exports = {
    get
}
