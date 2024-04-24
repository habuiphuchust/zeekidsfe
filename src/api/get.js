import token from "@/until/token";

async function get(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token.getSessionToken()
            }
        })
        return response

    } catch (error) {
        console.log(error);
    }

}
export default get;