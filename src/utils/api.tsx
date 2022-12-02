export default function handleGenerateImage (imagePrompts: string, updateFunction: any, setLoading: any) {
    let url = 'https://lexica.art/api/v1/search?q=' + imagePrompts;
    setLoading(true)
    fetch(url).then(response => response.json())
        .then((responseJson) => {
            let imageUrl = responseJson['images'][0]['src'];
            updateFunction(imageUrl);
            setLoading(false)
        }).catch(error => console.log(error))
}