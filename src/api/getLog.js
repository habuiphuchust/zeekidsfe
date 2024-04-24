async function getLog(url) {
    try {
        const response = await fetch(url)
        if (response.ok) return await response.text()

    } catch (error) {
        console.log(error);
    }

}
export default getLog;