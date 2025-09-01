/*
Grupo 1:
Utilizando esta API https://restcountries.com/
Hacer script con una función que liste SOLO LOS NOMBRES de los países
con lenguaje espanol.
 */

const axios = require('axios').default;
const url = 'https://restcountries.com/v3.1/lang/spanish';

async function listarPaisesEspanol() {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const result = response.data;
            const paisesEspanol = result.map(pais => pais.name.common);
            console.log(paisesEspanol);
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
}

listarPaisesEspanol();