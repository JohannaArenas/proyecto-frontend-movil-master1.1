import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Boton from "../../Componentes/Boton/Index";

import { Text as TextoDripsy } from "dripsy";

export default function EliminarDispositivo({ navigation }) {
  return (
    <View style={Styles.container}>
      <View style={Styles.container2}>
        {/*<Text style={Styles.texto}>
          ¿Esta seguro de que quiere eliminar este dispositivo?</Text>*/}

        <TextoDripsy
          sx={{
            fontSize: 14,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ¿Esta seguro de que quiere eliminar este dispositivo?
        </TextoDripsy>

        <View style={Styles.botones}>
          <View>
            <Boton
              text="aceptar"
              onClick={() => navigation.navigate("MostrarSensores")}
              type="aceptar"
            />
          </View>

          <View>
            <Boton
              text="cancelar"
              onClick={() => navigation.navigate("InfoDispositivo")}
              type="cancelar"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 120,
  },
  container2: {
    marginLeft: 17,
    marginRight: 17,
    padding: 5,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 40,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#FF8800",
  },
  texto: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#474B4E",
  },
  botones: {
    // marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    width: "70%",
    alignSelf: "center",
    padding: 5,
  },
  opcionColor: {
    paddingLeft: 50,
  },
});
