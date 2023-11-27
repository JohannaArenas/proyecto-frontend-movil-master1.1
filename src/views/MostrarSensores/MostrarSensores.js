import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Boton from "../../Componentes/Boton/Index";

import { Text as TextoDripsy } from "dripsy";

import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

import { useEffect } from "react"; //----------------------------------------
import { useRoute } from '@react-navigation/native';

import { useTheme } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";


import DispositivoDueño from "../../Componentes/DispositivoDueño/DispositivoDueño";


export default function MostrarSensores({ navigation }) {

  const [dispUsuario, setDispUsuario] = React.useState([]);

  const [disp, getDisp] = React.useState(false);


  const getOwnerDevices = async () => {

    const token = await AsyncStorage.getItem('@storage_Key');
    let headers = {
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const peticion = await axios.get("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/own", headers)
      .then(async res => {


        if (res.data.length == 0) {
          getDisp(false);
          setDispUsuario([]);
          return;
        }
        getDisp(true);
        setDispUsuario(res.data);
       console.log(res.data)
      })
      .catch(error =>
        console.log(error),
      );

  }

  const route = useRoute();



  useEffect(() => {
    getOwnerDevices();
  }, [dispUsuario]); 

  const { colors } = useTheme();

  return (
    <View style={[Styles.container, { backgroundColor: colors.background }]}>


      <View style={Styles.seleccionDispositivo}>
        <TouchableOpacity>
          <TextoDripsy
            sx={{
              fontSize: [12, 14, 16],
              color: "#FF8800",
              fontWeight: "bold",
            }}
          >
            Dispositivos en Propiedad
          </TextoDripsy>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MostrarSensoresInvitado")}
        >
          <TextoDripsy
            sx={{
              // fontSize: [0, 1, 2],
              fontSize: [12, 14, 16],
              //color: "#474B4E",
              color: colors.text,
              paddingLeft: 20,
            }}
          >
            Dispositivos Vinculados
          </TextoDripsy>
        </TouchableOpacity>
      </View>

      {disp ?

        <ScrollView>
          {dispUsuario.map((dato, index) => {

            return <DispositivoDueño key={index} nombreDisp={dato.deviceName} invitados={dato.linkedPersons}
              estadoWifi={dato.deviceWifiState} estadoDisp={dato.deviceStatus} nombreBoton="Ir al dispositivo" navegacion={() =>
                navigation.navigate("InfoDispositivo", { dispositivo: dato.deviceCode, nombre: dato.deviceName, emailUsuario: route.params.emailUsuario })} />

          })}
        </ScrollView> :


        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold", color: colors.text }}>No es dueño de ningun dispositivo</Text>
        </View>}


      <View style={Styles.agregarDispositivo}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AgregarDispositivo")}
        >
          <FontAwesomeIcon icon={faPlus} style={{ color: colors.text }} />
        </TouchableOpacity>
      </View>


    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center"
  },
  seleccionDispositivo: {
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  agregarDispositivo: {
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: "#FF8800",
    padding: 8,
    marginRight: "auto",
    borderRadius: 30,
    marginBottom: 10,
    elevation: 3
  },

});
