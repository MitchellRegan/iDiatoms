import APIData from './apiData';
import ErrorAlertLibrary from '../functions/ErrorAlertLibrary';

/**
 * API to send image data to our server and retrieve an image analysis
 */
const AnalyzeImageAPI = {
    apiCall: async function (image_) {
        let callData = await fetch(APIData.server, {
            method: 'POST',
            body: JSON.stringify({
                "action": "user-analyze",
                "data": {
                    "image": image_
                }
            })
        })
            .then((response) => response.json())
            .then((data) => {
                //data = JSON.parse(data);

                return data;
            })
            .catch((error) => {
                ErrorAlertLibrary.DisplayError("AnalyzeImage API Call ERROR", error);
            });

        return callData;
    }
}

export default AnalyzeImageAPI;