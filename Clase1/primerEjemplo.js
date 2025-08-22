async function getData(){
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20";

    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = await response.json();
        console.log(result);
    }catch(err){
        console.error(err);
    }
}

getData()
    .then(() => {
        console.log();
    })
    .catch((err) => {
        console.error(err);
    });