import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Boton from '../../Componentes/Boton/Index';

import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'

import { Text as TextoDripsy } from 'dripsy';

import { useRoute } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import Historial from '../../Componentes/Historial/Index';

import { useEffect } from "react"; //----------------------------------------

import { useTheme } from "@react-navigation/native";

export default function VerHistorial({ navigation }) {

  const [open, setOpen] = React.useState(false);

  const [historial, setHistorial] = React.useState([]);

  const [history, getHistory] = React.useState(false);

  function handleOnPress() {
    setOpen(!open);
  }

  const route = useRoute();

  const nombreDisp = route.params.nombre;
  const codeDisp = route.params.codigo;

  const VerHistorial = async () => {

    const token = await AsyncStorage.getItem('@storage_Key');

    let headers = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    const peticion = await axios.get("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/" + codeDisp + "/history", headers)
      .then(async res => {

        if (res.data.length == 0) {
          getHistory(false);
          setHistorial([]);
          return;
        }
        getHistory(true);
        setHistorial(res.data);

      })
      .catch(error =>
        console.log(error)

      );

  }
   const BorrarHistorial = async () => {

    const token = await AsyncStorage.getItem('@storage_Key');
 
 
     let headers = {
       headers: {
        'Authorization': 'Bearer ' + token
       }
     }
 
     const peticion = await axios.delete("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/"+codeDisp+"/clear-history", headers)
       .then(async res => {
 
        getHistory(false);
        setHistorial([]);
        handleOnPress();

       })
       .catch(error =>
         console.log(error)
 
       );
 
   }

  useEffect(() => {
    VerHistorial();
  }, [historial]);

  const { colors } = useTheme();

  return (
    <View /*style={Styles.container}*/ style={[Styles.container, { backgroundColor: colors.background }]}>

      <View style={{ alignItems: "center", marginTop: 20 }}>
        {/*<Text style={{ fontSize: 20 }}>Nombre del dispositivo</Text>*/}
        <TextoDripsy sx={{
          fontSize: [20, 25, 30],
          color: colors.text
        }}>{nombreDisp}</TextoDripsy>
      </View>

      <TouchableOpacity onPress={handleOnPress}>
        <View style={Styles.vaciarHistorial}>

          <TextoDripsy sx={{
            fontSize: [14, 16, 18],
            fontWeight: "bold",
            color: "white"
          }}>Vaciar historial</TextoDripsy>
          <FontAwesomeIcon icon={faTrash} style={Styles.icono} />

        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={Styles.modalView}>

            <Text>¿Seguro que quiere vaciar el historial?</Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>

              <View >
                <Boton text="Aceptar"
                   onPress={() => BorrarHistorial()}
                 // onPress={() => navigation.navigate('InfoDispositivo')}
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


      <View style={[Styles.historialContainer, {backgroundColor: colors.card}]}>


        {history ?

          <ScrollView>
            {historial.map((dato, index) => {

              return <Historial key={index} mensaje={dato.message} fecha={dato.created}/>
                                                                      //modificar respuesta
            })}
          </ScrollView> :


          <View style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center", fontWeight: "bold", color: colors.text }}>No hay ningun mensaje</Text>
          </View>}


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
  historialContainer: {
    marginTop: 40,
    height: height / 2,
    width: width - 30,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "#FF8800",
    borderWidth: 2,
    elevation: 3,
    alignItems: "center"
  },


  historial2Container: {
    // marginLeft: 17,
    // marginRight: 17,
    width: width - 100,
    marginTop: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 30,
    backgroundColor: "#EDEAEA",
    borderColor: "#FF8800",
    borderRadius: 30,

  },
  vaciarHistorial: {
    flexDirection: "row",
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#FF8800",
    padding: 15,
    //marginLeft: 50,
    //marginRight: 50,
    borderRadius: 30,
    elevation: 5

  },
  icono: {
    padding: 5,
    marginTop: 2,
    marginLeft: 5,
    color: "white"
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
})