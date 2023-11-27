import * as React from 'react';

//import Boton from "../Boton/Index"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen");

import { Text as TextoDripsy } from "dripsy";

import { useTheme } from "@react-navigation/native";

const Invitado = (props) => {

    const { colors } = useTheme();

    return (

        <View style={[Styles.datosInvitadoContainer, { backgroundColor: colors.card }]}>


            <View style={{ flexDirection: "row" }}>

                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                    <TextoDripsy
                        sx={{
                            fontSize: [12, 14, 16],
                            marginLeft: 1,
                            paddingTop: 2,
                            color: colors.text
                        }}
                    >
                        Nombre de invitado: <TextoDripsy sx={{
                            fontSize: [12, 14, 16],
                            marginLeft: 1,
                            paddingTop: 2,
                            color: "orange"
                        }}>{props.nombreInvitado} {props.apellidoInvitado}</TextoDripsy>
                    </TextoDripsy>


                    <TextoDripsy
                        sx={{
                            fontSize: [10, 12, 14],
                            marginLeft: 1,
                            padding: 2,
                            paddingLeft: 2,
                            color: colors.text
                        }}
                    >
                        Fecha de agregacion: {props.fechaAgregacion}
                    </TextoDripsy>

                </View>

                <TouchableOpacity style={Styles.icono} onPress={props.botonTacho}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: colors.text }} />
                </TouchableOpacity>


            </View>

        </View>

    );
}
export default Invitado;

const Styles = StyleSheet.create({
    datosInvitadoContainer: {
        width: width - 40,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        borderColor: "#fff",
        flexDirection: "column",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#FF8800",
        elevation: 4
    },
    icono: {
        // alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: 10
    },
})