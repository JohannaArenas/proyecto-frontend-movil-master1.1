import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Boton from "../../Componentes/Boton/Index";

import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

import { Text as TextoDripsy } from "dripsy";

import { useEffect } from "react"; //----------------------------------------

import { useTheme } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";


import DispositivoInvitado from "../../Componentes/DispositivoInvitado/DispositivoInvitado";

export default function MostrarSensoresInvitado({ navigation }) {

  const [dispInvitado, setDispInvitado] = React.useState([]);

  const [disp, getDisp] = React.useState(false);


  // const [codeDisp, getCodeDisp] = React.useState("");
  let codigoDispositivo = "";

  const [open, setOpen] = React.useState(false);


  function handleOnPress() {
    setOpen(!open);
  }

  const getObserverDevices = async () => {

    const token = await AsyncStorage.getItem('@storage_Key');
    let headers = {
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const peticion = await axios.get("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/observed", headers)
      .then(async res => {


        if (res.data.length == 0) {
          getDisp(false);

          setDispInvitado([]);
          return;
        }
        getDisp(true);
        setDispInvitado(res.data);
      })
      .catch(error =>
        console.log(error),

      );

  }


  useEffect(() => {
    getObserverDevices();
  }, [dispInvitado]);




  const unlinkObserver = async () => {

    const token = await AsyncStorage.getItem('@storage_Key');


    let headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const peticion = await axios.delete("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/" + codigoDispositivo + "/unlink-observer", headers)
      .then(async res => {


        handleOnPress()
      })
      .catch(error =>

        console.log(error)

      );

  }

  const { colors } = useTheme();

  return (
    <View style={[Styles.container, { backgroundColor: colors.background }]}>
      <View style={Styles.seleccionDispositivo}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <TextoDripsy
            sx={{
              fontSize: [12, 14, 16],
              //color: "#474B4E",
              color: colors.text,
              //paddingLeft: 20,
            }}
          >
            Dispositivos en Propiedad
          </TextoDripsy>

        </TouchableOpacity>

        <TouchableOpacity>
          <TextoDripsy
            sx={{
              fontSize: [12, 14, 16],
              color: "#FF8800",
              paddingLeft: 20,
              fontWeight: "bold",
            }}
          >
            Dispositivos Vinculados
          </TextoDripsy>

        </TouchableOpacity>
      </View>

      {disp ?

        <ScrollView>
          {dispInvitado.map((dato, index) => {

            codigoDispositivo = dato.deviceCode;

            return <DispositivoInvitado key={index} nombreDisp={dato.deviceName} invitados={dato.linkedPersons}
              estadoWifi={dato.deviceWifiState} estadoDisp={dato.deviceStatus} nombreBoton="Ver historial" navegacion={() =>
                navigation.navigate("VerHistorial", { nombre: dato.deviceName })} botonTacho={handleOnPress} />
          })}
        </ScrollView> :


        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold", color: colors.text }}>No fue invitado en ningun dispositivo</Text>
        </View>}


      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={Styles.modalView}>

            <Text>¿Seguro que quiere desvincularse del dispositivo "{codigoDispositivo}"?</Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>

              <View >
                <Boton text="Aceptar"
                  // onPress={() => navigation.navigate('MostrarSensores')}
                  onPress={() => unlinkObserver()}
                  type="aceptar"
                />
              </View>

              <View >
                <Boton text="Cancelar"
                  onPress={handleOnPress}
                  type="cancelar"
                />
              </View>

            </View>

          </View>
        </View>

      </Modal>

    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  seleccionDispositivo: {
    //marginLeft: 10,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",

    agregarDispositivo: {
      marginLeft: 20,
      marginTop: 10,
      backgroundColor: "white",
      padding: 8,
      marginRight: "auto",
      borderRadius: 30,
    },
  },
  dispositivo: {
    padding: 5,
    marginTop: 20,
    borderWidth: 3,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderColor: "#FF8800",
  },
  texto: {
    fontSize: 10,
  },
  texto2: {
    fontSize: 8,
    paddingLeft: 10,
    paddingTop: 3,
  },

  botonIrVerHistorial: {
    textTransform: "uppercase",
    textAlign: "center",
    backgroundColor: "#FF8800",
    color: "white",
    padding: 7,
    borderRadius: 30,
  },

});