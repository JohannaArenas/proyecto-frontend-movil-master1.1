import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Boton from '../../Componentes/Boton/Index';
import InputNormal from "../../Componentes/InputNormal/Index";
import InputContraseña from "../../Componentes/InputContraseña/Index";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import { faWifi } from '@fortawesome/free-solid-svg-icons/faWifi'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'

import { useTheme } from "@react-navigation/native";

export default function CambiarRedWifi({ navigation }) {


    const [data, setData] = React.useState({
        password: "",
        secureTextEntry: true
    });

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const [formData, setFormData] = React.useState(defaultFormValues())
    const [errorNombreRed, setErrorNombreRed] = React.useState("")
    const [errorPassword, setErrorPassword] = React.useState("")

    const route = useRoute();
    const codeDisp = route.params.codigo;

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const cambiarRedWifi = () => {
        if (!validateData()) {
            return;
        }
        //navigation.navigate('InfoDispositivo')
        cambiarRed(formData.nombreRed, formData.password)
    }

    //--------------------------------------

    const cambiarRed = async (id, password) => {

        let notification = JSON.stringify({
            ssid: id,
            password: password,
            deviceCode: codeDisp,
        })

        const token = await AsyncStorage.getItem('@storage_Key');

        let headers = {
            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        const peticion = await axios.post("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/change-device-wifi", notification, headers)
            .then(async res => {
                navigation.goBack();
            })
            .catch(error =>
                console.log(error),
                setErrorNombreRed("Error al querer cambiar la red wifi.")
            );

    }
    //-------------------------------------------------------------

    const validateData = () => {
        setErrorPassword("")
        let isValid = true

        if (formData.nombreRed == "") {
            setErrorNombreRed("Debes ingresar un nombre de red.")
            isValid = false
        }

        /*if (formData.password !== "111111" & formData.password !== "") {
            setErrorPassword("Contraseña incorrecta.")
            isValid = false
        }*/

        if (formData.password == "") {
            setErrorPassword("Debes ingresar una contraseña.")
            isValid = false
        }

        return isValid
    }

    const { colors } = useTheme();

    return (
        <View style={[Styles.container, { backgroundColor: colors.background }]} >

            <View style={[Styles.formContainer, { backgroundColor: colors.card }]}>

                <InputNormal icono={faWifi} placeholder="Ingresar nombre de red" errorMessage={errorNombreRed}
                    onChange={(e) => onChange(e, "nombreRed")} defaultValue={formData.nombreRed} />
                {errorNombreRed !== null ?
                    <Text style={Styles.mensajeError}>{errorNombreRed}</Text>
                    :
                    null
                }

                <InputContraseña icono={faLock} placeholder="Ingresar contraseña" secureTextEntry={data.secureTextEntry ? true : false}
                    errorMessage={errorPassword} onChange={(e) => onChange(e, "password")} defaultValue={formData.password} onPress={updateSecureTextEntry}
                    iconoOjo={data.secureTextEntry ? faEyeSlash : faEye} />
                {errorPassword !== null ?
                    <Text style={Styles.mensajeError}>{errorPassword}</Text>
                    :
                    null
                }


                <View style={Styles.botonCambiarRed}>
                    <View>
                        <Boton text="Cambiar red"
                            onPress={() => cambiarRedWifi()}
                            // onPress={() => navigation.navigate('InfoDispositivo')}
                            type="principal" />
                    </View>
                </View>
            </View>

        </View>
    );
}

const defaultFormValues = () => {
    return { nombreRed: "", password: "" }
}


const Styles = StyleSheet.create({
    container: {
        textAlign: "center",
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    formContainer: {
        width: width - 40,
        padding: 5,
        backgroundColor: "white",
        borderRadius: 30,
        borderColor: "#FF8800",
        borderWidth: 2,
        alignItems: "center",
        elevation: 4
    },
    input: {
        marginBottom: 10,
        borderColor: "#FF8800",
        borderWidth: 4,
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        padding: 10,
        backgroundColor: "#EDEAEA",
        flexDirection: "row"
    },
    icono: {
        marginRight: 5,
        marginTop: 5
    },
    iconoOjo: {
        alignItems: "center",
        justifyContent: "center",
        width: width - 390,
        marginLeft: "auto"
    },
    botonCambiarRed: {
        marginLeft: 60,
        marginRight: 60,
        marginTop: 20,
        marginBottom: 20
    },
    mensajeError: {
        //marginLeft: 40,
        color: "red",
    },
})