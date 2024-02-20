// Function to send data to a specified URL
export async function sendData(URL: string, data?: any) {
    try {
        // Make a POST request to the specified URL
        const response = await fetch("http://localhost:5500" + URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        // Parse the response data as JSON
        const responseData = await response.json();

        // Making sure that the server returns data
        if(responseData === null || responseData === undefined){
            throw new Error('Response data is null or undefined');
        }

        // Return the response status, success status, and data
        return {
            status: response.status,
            success: response.ok,
            data: responseData,
        };
    } catch (error) {
        // Log and return an error message if the request fails
        console.error('Error in sendData:', error);
        return {
            status: 500,
            ok: false,
            data: null,
        };
    }
}

// Function to get data from a specified URL
export async function getData(URL: string, query? : {[key:string]:string}){
    try {
        // Make a GET request to the specified URL
        const response = await fetch(query ? `http://localhost:5500${URL}/${query.data}` : `http://localhost:5500${URL}`, 
        {
            method: 'GET', 
            credentials: 'include',
        });

        // Parse the response data as JSON
        const data = await response.json();
        
        // If the request is successful or returns a 400 status, return the response data
        if(response.ok || response.status === 400){
            return data;
        }

        // If the request fails, throw an error
        throw new Error("Error while fetching data");
    } catch (error) {
        // Log and return an error message if the request fails
        console.error('Error in getData:', error);
        return "Error while fetching data";
    }
}