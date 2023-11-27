import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Boton from '../../Componentes/Boton/Index';
import InputNormal from "../../Componentes/InputNormal/Index";
import InputContraseña from "../../Componentes/InputContraseña/Index";

import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import { useTheme } from "@react-navigation/native";


export default function AgregarDispositivo({ navigation }) {

    const [data, setData] = React.useState({
        code: "",
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
    const [errorCode, setErrorCode] = React.useState("")
    const [errorPassword, setErrorPassword] = React.useState("")

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const agregarDisp = () => {
        if (!validateData()) {
            return;
        }
        addDisp(formData.code, formData.password)
    }


    const validateData = () => {
        setErrorCode("")
        setErrorPassword("")
        let isValid = true



        if (formData.code == "") {
            setErrorCode("Debes ingresar un codigo.")
            isValid = false
        }

        if (formData.password == "") {
            setErrorPassword("Debes ingresar una contraseña.")
            isValid = false
        }


        return isValid
    }

    const addDisp = async (code, password) => {

        let notification = JSON.stringify({
            code: code,
            password: password
        })

        const token = await AsyncStorage.getItem('@storage_Key');

        let headers = {
            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        const peticion = await axios.put("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/link-user", notification, headers)
            .then(async res => {
                navigation.navigate("MostrarSensores")
            })
            .catch(error =>
                console.log(error),
                setErrorCode("Accceso denegado.")
            );

    }

    const { colors } = useTheme();

    return (
        <View style={[Styles.container, { backgroundColor: colors.background }]} >

            <View style={[Styles.formContainer, { backgroundColor: colors.card }]}>
                <InputNormal icono={faCode} placeholder="Ingresar codigo" errorMessage={errorCode}
                    onChange={(e) => onChange(e, "code")} defaultValue={formData.code} />
                {errorCode !== null ?
                    <Text style={Styles.mensajeError}>{errorCode}</Text>
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

                <View style={Styles.botonAgregarDisp}>
                    <View>
                        <Boton text="Agregar dispositivo"
                            onPress={() => agregarDisp()}
                            // onPress={() => navigation.navigate('MostrarSensores')} 
                            type="principal" />
                    </View>
                </View>
            </View>


        </View>
    );
}

const defaultFormValues = () => {
    return { code: "", password: "" }
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    formContainer: {
        marginTop: 40,
        marginLeft: 17,
        marginRight: 17,
        padding: 5,
        backgroundColor: "white",
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "#FF8800",
        alignItems: "center"
    },
    iconoOjo: {
        alignSelf: "flex-end",
        marginLeft: "auto",
        marginTop: 7,
        marginLeft: 60
    },
    botonAgregarDisp: {
        marginLeft: 60,
        marginRight: 60,
        marginTop: 20,
        marginBottom: 20
    },
    mensajeError: {
        marginLeft: 40,
        color: "red",
    },
})