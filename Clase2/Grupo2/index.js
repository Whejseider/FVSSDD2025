/*
Grupo 2:
Utilizando esta API https://www.thecocktaildb.com/api.php
Hacer script que lea de una constante un string y liste los nombres de los posibles tragos con
nombres asociados a ese string
 */

const axios = require('axios').default;

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const nombreTrago = 'Blue';

async function obtenerNombres() {
    try {
        const response = await axios.get(url + nombreTrago);
        if (response.status === 200) {
            const result = response.data;
            if (result != null) {
                const tragos = result.drinks.map(nombre => nombre.strDrink);
                console.log(tragos);
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