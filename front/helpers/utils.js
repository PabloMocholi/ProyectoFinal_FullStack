/**
 * 
 *  Función que se encarga de realizar el fetch a la url proporcionada
 *  
 *  @param {String} url Url a la que realizar la request
 *  @param {String} method Método que usa la llamada
 *  @param {Object} url Cuerpo de la petición 
 *  @param {Number} timeout Tiempo en ms que la petición está activa
 *  @param {Function} callback función de callback que se ejecuta al completar la petición
 * 
 */


export const easyFetch = async ({
    url, method = "GET", body = null, timeout = 5000, callback = null
}) => {
    const controller = new AbortController();
    const abortTimeout = setTimeout(() => controller.abort(), timeout)

    const fetchOptions = {
        method,
        headers: {
            'Content-Type': "application/json",
        },
        signal: controller.signal
    }

    if (body)
        fetchOptions.body = JSON.stringify(body);

    try {
        const response = await fetch(url, fetchOptions);
        clearTimeout(abortTimeout);

        if (!response.ok)
            throw new Error(response.statusTexts);

        const data = await response.json()

        if (callback)
            callback(data);
        else
            return data;

    } catch (error) {
        console.log(error)
    }


}