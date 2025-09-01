/*
Grupo 1:
Utilizando esta API https://restcountries.com/
Hacer script con una función que liste SOLO LOS NOMBRES de los países
con lenguaje espanol.
 */

import {writeFileSync} from 'fs';
import axios from "axios";
const url = 'https://restcountries.com/v3.1/lang/spanish';
const path = './paises.json';

async function listarPaisesEspanol() {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const result = response.data;
            const paisesEspanol = result.map(pais => pais.name.common);
            writeFileSync(path, JSON.stringify(paisesEspanol, null, 2), 'utf8');
            console.log('Data successfully saved to disk.');
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
}

listarPaisesEspanol();