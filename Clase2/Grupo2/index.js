/*
Grupo 2:
Utilizando esta API https://www.thecocktaildb.com/api.php
Hacer script que lea de una constante un string y liste los nombres de los posibles tragos con
nombres asociados a ese string
 */

import {writeFileSync} from 'fs';

import axios from "axios";

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const nombreTrago = 'Blue';

const path = './tragos.json';

async function obtenerNombres() {
    try {
        const response = await axios.get(url + nombreTrago);
        if (response.status === 200) {
            const result = response.data;
            if (result != null) {
                const tragos = result.drinks.map(nombre => nombre.strDrink);
                writeFileSync(path, JSON.stringify(tragos, null, 2), 'utf8');
                console.log('Data successfully saved to disk.');
            } else {
                console.log('No hay tragos que tengan ese nombre.');
            }
        } else {
            console.log('No hay tragos que tengan ese nombre.');
        }
    } catch (error) {
        console.log(error);
    }
}

obtenerNombres();