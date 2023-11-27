import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Boton from '../../Componentes/Boton/Index';
import InputContraseña from "../../Componentes/InputContraseña/Index";

import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import { useRoute } from '@react-navigation/native';

import { useTheme } from "@react-navigation/native";

export default function CambiarContraseña({ navigation }) {

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
    const [errorPassword, setErrorPassword] = React.useState("")
    const [errorNewPassword, setErrorNewPassword] = React.useState("")

    const route = useRoute();

    const code = route.params.codigo;
    const emailUsuario = route.params.emailUsuario;

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const cambiarContraseñaDisp = () => {
        if (!validateData()) {
            return;
        }
        changeDevicePassword(formData.password, formData.newPassword)
    }


    const validateData = () => {
        setErrorPassword("")
        setErrorNewPassword("")
        let isValid = true

        /* if (formData.password !== "654321" & formData.password !== "") {
             setErrorPassword("Contraseña incorrecta.")
             isValid = false
         }*/
        if (formData.password == "") {
            setErrorPassword("Debe ingresar la antigua contraseña.")
            isValid = false
        }


        if (formData.newPassword == "") {
            setErrorNewPassword("Debe ingresar una nueva contraseña.")
            isValid = false
        }

        return isValid
    }


    const changeDevicePassword = async (password, newPassword) => {

        let notification = JSON.stringify({
            deviceCode: code,
            oldPassword: password,
            newPassword: newPassword
        })

        const token = await AsyncStorage.getItem('@storage_Key');

        let headers = {
            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        const peticion = await axios.put("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/change-device-password", notification, headers)
            .then(async res => {
                console.log("confirmacion contraseña");
                navigation.navigate('PantallaCodigoCambiarContraseñaDisp', { emailUsuario: emailUsuario })
            })
            .catch(error =>
                console.log(error),
                //setErrorNewPassword("error")
            );

    }

    const { colors } = useTheme();

    return (
        <View style={[Styles.container, { backgroundColor: colors.background }]} >

            <View style={[Styles.formContainer, { backgroundColor: colors.card }]}>

                <InputContraseña icono={faLock} placeholder="Ingrese contraseña actual" secureTextEntry={data.secureTextEntry ? true : false}
                    errorMessage={errorPassword} onChange={(e) => onChange(e, "password")} defaultValue={formData.password} onPress={updateSecureTextEntry}
                    iconoOjo={data.secureTextEntry ? faEyeSlash : faEye} />
                {errorPassword !== null ?
                    <Text style={Styles.mensajeError}>{errorPassword}</Text>
                    :
                    null
                }

                <InputContraseña icono={faLock} placeholder="Ingrese nueva contraseña" secureTextEntry={data.secureTextEntry ? true : false}
                    errorMessage={errorNewPassword} onChange={(e) => onChange(e, "newPassword")} defaultValue={formData.newPassword} onPress={updateSecureTextEntry}
                    iconoOjo={data.secureTextEntry ? faEyeSlash : faEye} />
                {errorNewPassword !== null ?
                    <Text style={Styles.mensajeError}>{errorNewPassword}</Text>
                    :
                    null
                }

                <View style={Styles.botonCambiarCont}>
                    <Boton text="Cambiar contraseña"
                        onPress={() => cambiarContraseñaDisp()}
                        //onPress={() => navigation.navigate('PantallaCodigoCambiarContraseñaDisp',{emailUsuario: emailUsuario})} 
                        type="principal" />
                </View>

            </View>

        </View>
    );
}

const defaultFormValues = () => {
    return { password: "", newPassword: "" }
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
        padding: 5,
        backgroundColor: "white",
        borderRadius: 30,
        borderColor: "#FF8800",
        borderWidth: 2,
        elevation: 4,
        alignItems: "center",
    },
    input: {
        marginBottom: 10,
        borderColor: "#FF8800",
        borderWidth: 2,
        borderRadius: 30,
        marginLeft: 5,
        marginRight: 5,
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
    botonCambiarCont: {
        marginLeft: 60,
        marginRight: 60,
        marginTop: 20,
        marginBottom: 20
    },
    mensajeError: {
        color: "red",
    },
})