import * as React from 'react';

import Boton from "../Boton/Index"

import { View, StyleSheet, Text, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen");

import { Text as TextoDripsy } from "dripsy";

import { useTheme } from "@react-navigation/native";


/*const ResultadoWifi= "";

const valor = () => {
  if (props.estadoWifi) {
    ResultadoWifi= "Conectado"
  } else if (props.estadoWifi == null) {
    ResultadoWifi= "Sin conexion"
  } else {
    ResultadoWifi= "Apagado"
  }
}*/

const DispositivoDueño = (props) => {

  const { colors } = useTheme();

  return (

    <View style={[Styles.dispositivo, { backgroundColor: colors.card }]}>
      <View style={{ marginLeft: 5 }}>
        {/*<TextoDripsy sx={Styles.texto}>*/}
        <TextoDripsy sx={{
          fontSize: [12, 14, 16],
          paddingLeft: 10,
          color: colors.text
        }}>
          Nombre del dispositivo : <TextoDripsy sx={Styles.datosDisp}>{props.nombreDisp}</TextoDripsy>
        </TextoDripsy>

        <TextoDripsy sx={{
          fontSize: [12, 14, 16],
          paddingLeft: 10,
          color: colors.text
        }}>
          Cantidad de personas vinculadas: {props.invitados}
        </TextoDripsy>
      </View>

      <View style={{ marginRight: 170, marginLeft: 0, marginTop: 15 }}>
        <Boton
          text={props.nombreBoton}
          onPress={props.navegacion}
          //onClick={() => navigation.navigate("InfoDispositivo")}
          type="secundario"
        />
      </View>

      <View style={{ flexDirection: "row", padding: 10 }}>
        {/*<TextoDripsy sx={Styles.texto2}>Estado Wifi:{props.estadoWifi} </TextoDripsy>*/}
        <TextoDripsy sx={{
          fontSize: [10, 12, 14],
          paddingLeft: 20,
          color: colors.text
        }}>Estado Wifi: {props.estadoWifi ? "Conectado" : "Sin conexión"} </TextoDripsy>
        <TextoDripsy sx={{
          fontSize: [10, 12, 14],
          paddingLeft: 20,
          color: colors.text
        }}>Estado sensor: {props.estadoDisp ? "Conectado" : "Sin conexión"} </TextoDripsy>

      </View>
    </View>

  );
}
export default DispositivoDueño;

const Styles = StyleSheet.create({
  dispositivo: {
    borderColor: "#FF8800",
    borderRadius: 30,
    borderWidth: 3,
    marginTop: 17,
    marginBottom: 17,
    width: width - 20,
    backgroundColor: "white",
    padding: 10,
    backgroundColor: "white",
    elevation: 4
  },
  texto: {
    fontSize: [12, 14, 16],
    paddingLeft: 10,
  },
  texto2: {
    fontSize: [10, 12, 14],
    paddingLeft: 20,
  },
  datosDisp: {
    fontSize: [14, 16, 18],
    paddingLeft: 10,
    color: "orange"
  }
})