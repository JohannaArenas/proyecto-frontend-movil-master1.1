import * as React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator
} from "react-native";

import Boton from "../../Componentes/Boton/Index";
import Input from "../../Componentes/InputNormal/Index";

import { Text as TextoDripsy } from "dripsy";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import { useRoute } from '@react-navigation/native';


export default function PantallaCodigoModificarPerfil({ navigation }) {

    const [formData, setFormData] = React.useState({ codigo: "" });
    const [errorCodigo, setErrorCodigo] = React.useState("");

    const [loading, setLoading] = React.useState(false);


    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    const validateData = () => {
        setErrorCodigo("");
        let isValid = true;

        if (formData.codigo == "") {
            setErrorCodigo("Debe ingresar el codigo.");
            isValid = false;
        }

        /*if(formData.codigo !== token){
             setErrorCodigo("Codigo incorrecto.");
             isValid = false;
         }*/

        return isValid;
    };


    const route = useRoute();
    const mail = route.params.email;

    const confirmChangeUserData = async (codigo) => {

        let notification = JSON.stringify({
            token: codigo
        })

        const token = await AsyncStorage.getItem('@storage_Key');

        let headers = {
            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        const peticion = await axios.post("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/user/confirm-data", notification, headers)
            .then(async res => {

                console.log("cambio de datos confirmado");
                //navigation.navigate("Perfil");
            })
            .catch(error =>

                console.log(error),
                // setErrorPassword(error)
            );

    }


    const enviarCodigo = () => {
        if (!validateData()) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setTimeout(async () => {
            confirmChangeUserData(formData.codigo);
            // navigation.navigate("MostrarSensores");
        }, 3000);
    };

    return (
        <View style={Styles.container}>
            <View style={Styles.registerContainer}>
                <TextoDripsy
                    sx={{
                        // fontSize: [0, 1, 2],
                        fontSize: [14, 16, 18],
                    }}
                >
                    Ingrese el codigo que enviamos a: <Text style={{ fontWeight: "bold" }}>{mail}</Text>
                    {/** esto no va a funcionar, ARREGLAR*/}
                </TextoDripsy>


                <View style={Styles.input}>

                    <TextInput
                        placeholder="Ingrese el codigo"
                        autoCapitalize="none"
                        onChange={(e) => onChange(e, "codigo")}

                    />
                </View>
                {errorCodigo !== null ? (
                    <Text style={Styles.mensajeError}>{errorCodigo}</Text>
                ) : null}

                <View>

                    <Boton
                        text=
                        {loading ? <ActivityIndicator color="#fff" size="large" />
                            :
                            "Enviar"}
                        onPress={() => enviarCodigo()}
                        //onPress={() => navigation.navigate("MostrarSensores")}
                        type="principal"
                    />


                </View>

            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        textAlign: "center",
        backgroundColor: "white",
        flex: 1,
    },
    registerContainer: {
        alignItems: "center",
        margin: 20,
        marginTop: 160,
        padding: 10,
        backgroundColor: "withe",
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "#FF8800",
    },
    input: {
        marginBottom: 10,
        borderColor: "#FF8800",
        borderWidth: 3,
        borderRadius: 30,
        // paddingStart:30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        padding: 10,
        backgroundColor: "#EDEAEA",
        flexDirection: "row",
    },
    mensajeError: {
        color: "red",
        marginBottom: 20,
    },
});