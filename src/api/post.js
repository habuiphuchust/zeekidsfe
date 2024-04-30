import token from "@/until/token";

async function post(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.getSessionToken()
            },
            body: data
        })
        return response

    } catch (error) {
        console.log(error);
    }

}
export default post;