import axios from "axios";

const getToken = async () => {

    let notification = JSON.stringify({
        email: "ignacio.balastegui@davinci.edu.ar",
        password: "Password123"
    })

    let headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const peticion = await axios.post("http://192.168.0.176:8080/app_movil_sensor/api/auth/login", notification, headers)
        .then(res => {
            console.log(res.data.token)
        })
        .catch(error => console.log(error));

}


const registrarUsuario = async (nombre, apellido, mail, contraseña, nacimiento, nacion) => {

    let notification = JSON.stringify({
        /* name: "Matias",
         lastname: "Apellido",
         email: "algo@hotmail.com",
         password: "Password123",
         dateOfBirth: "04/04/2004",
         nationality: "Argentina"*/
        name: nombre,
        lastname: apellido,
        email: mail,
        password: contraseña,
        dateOfBirth: nacimiento,
        nationality: nacion
    })

    let headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const peticion = await axios.post("http://192.168.0.176:8080/app_movil_sensor/api/auth/register", notification, headers)
        .then(res => {

            console.log("registrado")
        })
        .catch(error =>

            console.log("Error: " + error),
            console.log("En el catch de peticion")
        );
}

export {
    getToken,
    registrarUsuario
}