import * as React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";

import { Text as TextoDripsy } from "dripsy";

import Boton from '../../Componentes/Boton/Index';

import { useRoute } from '@react-navigation/native';
import { useEffect } from "react"; //----------------------------------------

import { useTheme } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import Invitado from "../../Componentes/Invitado/Invitado";

export default function VerInvitados({ navigation }) {

  const [open, setOpen] = React.useState(false);

  function handleOnPress() {
    setOpen(!open);
  }

  const route = useRoute();

  const nombreDisp = route.params.nombre;
  const codeDisp = route.params.codigo;


  const [invitado, setInvitado] = React.useState([]);

  const [isInv, getInv] = React.useState(false);

  let nombreInvitado = "";
  let email = "";

  const getObserver = async () => {


    const token = await AsyncStorage.getItem('@storage_Key');

    let headers = {
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }


    const peticion = await axios.get("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/" + codeDisp + "/observer", headers)
      .then(async res => {

        if (res.data.length == 0) {
          getInv(false);
          setInvitado([]);
          return;
        }
        getInv(true);
        setInvitado(res.data);
        // nombreInvitado = res.data.name;

        //console.log(res.data)
        //console.log("nombre de invitado: "+res.data.name)
      })
      .catch(error =>
        console.log(error)
      );

  }



  const deleteObserver = async (mail) => {

    const token = await AsyncStorage.getItem('@storage_Key');

    let headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }


    const peticion = await axios.delete("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/" + codeDisp + "/user/" + mail , headers)
      .then(async res => {
        navigation.goBack();
      })
      .catch(error =>
        console.log(error)

      );

  }

  useEffect(() => {
    getObserver();
  }, [invitado]);

  const { colors } = useTheme();

  return (
    <View /*style={Styles.container}*/ style={[Styles.container, { backgroundColor: colors.background }]}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TextoDripsy
          sx={{
            fontSize: [20, 25, 30],
            fontWeight: "bold",
            color: colors.text
          }}
        >
          {nombreDisp}
        </TextoDripsy>
      </View>


      <View style={[Styles.invitadosContainer, {backgroundColor: colors.card}]}>


        {isInv ?

          <ScrollView>
            {invitado.map((dato, index) => {

              nombreInvitado = dato.name
              email = dato.email

              return <Invitado key={index} nombreInvitado={dato.name} apellidoInvitado={dato.lastname} fechaAgregacion={dato.created}
                botonTacho={handleOnPress} />

            })}
          </ScrollView> :


          <View style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center", fontWeight: "bold", color: colors.text }}>No ha invitado a nadie al dispositivo</Text>
          </View>
        }

        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={Styles.modalView}>

              <Text>¿Esta seguro de querer desvincular a <Text style={{ fontWeight: "bold" }}>{nombreInvitado} </Text>
                del dispositivo: <Text style={{ fontWeight: "bold" }}>{nombreDisp}</Text>?</Text>

              <View style={{ flexDirection: "row", marginTop: 20 }}>

                <View >
                  <Boton text="Aceptar"
                   // onPress={() => navigation.goBack()}
                    onPress={() => deleteObserver(email)}
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

        <View style={Styles.agregarInvitado}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AgregarInvitado", { codigoDisp: codeDisp })}
          >
            <FontAwesomeIcon icon={faUserPlus} style={{color: "white"}}/>
          </TouchableOpacity>
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
    alignItems: "center",
    //justifyContent: "center"
  },
  invitadosContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 30,
    width: width - 20,
    backgroundColor: "withe",
    borderColor: "#FF8800",
    borderWidth: 2,
    alignItems: "center",
  },
  texto: {
    marginLeft: 10,
    paddingTop: 5,
  },
  texto2: {
    marginLeft: 5,
    fontSize: 10,
    padding: 5,
    paddingLeft: 10,
    color: "#474B4E",
  },
  agregarInvitado: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#FF8800",
    padding: 8,
    marginRight: "auto",
    borderRadius: 30,
    // borderWidth: 2,
    //borderColor: "#FF8800",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    padding: 25,
    width: "93%",
    showOffSet: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7
  }
});
