import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Boton from '../../Componentes/Boton/Index';

import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil'

import { Text as TextoDripsy } from 'dripsy';

import { useEffect } from "react"; //----------------------------------------
import { useRoute } from '@react-navigation/native';

import { useTheme } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function InfoDispositivo({ navigation }) {

  const [open, setOpen] = React.useState(false);
  const [abrir, setAbrir] = React.useState(false);

  const [formData, setFormData] = React.useState(defaultFormValues());
  const [errorNombre, setErrorNombre] = React.useState("");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const route = useRoute();

  const [nombre, setNombre] = React.useState("");

  //let nombre = route.params.nombre;
  //const nombreDisp = route.params.nombre;
  const code = route.params.dispositivo;
  const mailUsuario = route.params.emailUsuario;

  //let nombreDisp= "";

  function handleOnPress() {
    setOpen(!open);
  }

  function handleOnPress2() {
    setAbrir(!abrir);
  }

  const validateData = () => {
    setErrorNombre("");

    let isValid = true;

    if (formData.nombre == "") {
      setErrorNombre("Debe ingresar un nombre.");
      isValid = false;
    }

    return isValid;
  };


  const cambiarNombre = () => {
    if (!validateData()) {
      //setLoading(false);
      return;
    }
    
    changeDeviceName(formData.nombre)
    handleOnPress2();
  };

  useEffect(() => {
    setNombre(route.params.nombre)
  }, []);

  const unlinkOwner = async () => {

    const token = await AsyncStorage.getItem('@storage_Key');

    let headers = {
      headers: {

        'Authorization': 'Bearer ' + token
      }
    }

    const peticionBorrar = await axios.delete("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/" + code + "/delete-owner", headers)
      .then(async res => {
        navigation.navigate("MostrarSensores")
      })
      .catch(error =>
        console.log(error)

      );

  }

  const changeDeviceName = async (name) => {

    const token = await AsyncStorage.getItem('@storage_Key');

    let notification = JSON.stringify({
      deviceCode: code,
      newName: name
    })

    let headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const peticionCambiarNombre = await axios.put("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/change-name", notification, headers)
      .then(async res => {

       // nombre = name;
       setNombre(name)
       /* console.log(name)
        console.log("nombre cambiado");*/
      })
      .catch(error =>
        console.log(error)

      );

  }


  const { colors } = useTheme();

  
  const apagarDisp = async (codeDisp) => {

    let notification = JSON.stringify({
      
        deviceCode: code
    })

    const token = await AsyncStorage.getItem('@storage_Key');

    let headers = {
        headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const peticion = await axios.post("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/turn-off", notification, headers)
        .then(async res => {
            navigation.goBack();
        })
        .catch(error =>
            console.log(error),
            //setErrorMail("Accceso denegado.")
        );

}

const encenderDisp = async (codeDisp) => {

  let notification = JSON.stringify({
      deviceCode: code
  })

  const token = await AsyncStorage.getItem('@storage_Key');

  let headers = {
      headers: {

          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  }

  const peticion = await axios.post("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/turn-on", notification, headers)
      .then(async res => {
          navigation.goBack();
      })
      .catch(error =>
          console.log(error),
          //setErrorMail("Accceso denegado.")
      );

}


  return (
    <View style={[Styles.container, { backgroundColor: colors.background }]} >

      <View style={Styles.nombreDispositivo}>

        <TextoDripsy sx={{
          fontSize: [20, 22, 24],
          fontWeight: "bold",
          color: colors.text
        }}>{nombre}</TextoDripsy>

        <TouchableOpacity style={{ paddingLeft: 5 }} onPress={handleOnPress2}>
          <FontAwesomeIcon icon={faPencil} style={{ color: colors.text }} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={abrir}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={Styles.modalView}>



            <View >
           
              <View style={Styles.input}>
                <FontAwesomeIcon icon={faPencil} style={Styles.icono} />
                <TextInput
                  placeholder="Ingrese el nombre"
                  autoCapitalize="none"
                  errorMessage={errorNombre}
                  onChange={(e) => onChange(e, "nombre")}
                  defaultValue={formData.nombre}
                />
              </View>
              {errorNombre !== null ? (
                <Text style={Styles.mensajeError}>{errorNombre}</Text>
              ) : null}

              <Text style={{ textAlign: "center", marginTop: 10 }}>¿Seguro que quiere cambiar el nombre del dispositivo?</Text>


              <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 30 }}>
                <View >
                  <Boton text="Aceptar"
                    onPress={cambiarNombre}
                    type="aceptar"
                  />
                </View>

                <View >
                  <Boton text="Cancelar"
                    onPress={handleOnPress2}
                    type="cancelar"
                  />
                </View>
              </View>

            </View>

          </View>
        </View>

      </Modal>

      <View style={Styles.botonesEncendidoApagado}>
        <View style={{ marginLeft: 10, marginRight: -10 }}>
          <Boton text="Encender"
            onPress={() => encenderDisp()}
            type="aceptar"
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <Boton text="Apagar"
             onPress={() => apagarDisp()}
            type="cancelar"
          />
        </View>
      </View>

      <View style={{ alignItems: "center", marginTop: 15 }}>

        <TextoDripsy sx={{
          fontSize: [20, 22, 24],
          fontWeight: "bold",
          color: colors.text
        }}>¿Qué desea hacer?</TextoDripsy>

      </View>

      <View style={Styles.opciones}>
        <Boton text="Cambiar contraseña"
          onPress={() => navigation.navigate('CambiarContraseña', { codigo: code, emailUsuario: mailUsuario })}
          type="principal" />
        <View style={Styles.opcionesBotones}>
          <Boton text="Cambiar red wifi"
            onPress={() => navigation.navigate('CambiarRedWifi', { codigo: code })}
            type="principal" />
        </View>
        <View style={Styles.opcionesBotones}>
          <Boton text="Cambiar ip y puerto"
            onPress={() => navigation.navigate('CambiarIPyPuerto', { codigo: code })}
            type="principal" />
        </View>
        <View style={Styles.opcionesBotones}>
          <Boton text="Ver invitados"
            onPress={() => navigation.navigate('VerInvitados', { nombre: nombre, codigo: code })}
            type="principal" />
        </View>
        <View style={Styles.opcionesBotones}>
          <Boton text="Historial"
            onPress={() => navigation.navigate('VerHistorial', { nombre: nombre, codigo: code })}
            type="principal" />
        </View>
        <View style={Styles.opcionesBotones}>
          <Boton text="Eliminar dispositivo"
            onPress={handleOnPress}
            type="principal" />
        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={Styles.modalView}>

              <Text>¿Seguro que quiere eliminar el dispositivo?</Text>

              <View style={{ flexDirection: "row", marginTop: 20 }}>

                <View >
                  <Boton text="Aceptar"
                    onPress={() => unlinkOwner()}
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


    </View>
  );
}

const defaultFormValues = () => {
  return { nombre: "" };
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  nombreDispositivo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "row",
    padding: 10
  },
  texto: {
    fontSize: 20,
    fontWeight: "bold"
  },
  opciones: {
    width: width - 180,
    marginTop: 15,
  },
  opcionesBotones: {
    marginTop: 20
  },
  botonesEncendidoApagado: {
    width: width - 200,
    marginTop: 15
  },

  botonE: {
    textAlign: "center",
    fontSize: 17,
    backgroundColor: "#11d811",
    color: "white",
    padding: 10,
    textTransform: "uppercase",
    borderRadius: 30,
  },
  botonA: {
    textAlign: "center",
    fontSize: 17,
    backgroundColor: "red",
    color: "white",
    padding: 10,
    textTransform: "uppercase",
    borderRadius: 30,
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
  },
  input: {
    borderColor: "#FF8800",
    borderWidth: 3,
    borderRadius: 30,
    paddingStart: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#EDEAEA",
    flexDirection: "row",
  },
  icono: {
    marginRight: 5,
    marginTop: 5,
  },
  mensajeError: {
    alignSelf: "center",
    color: "red",
  },
})
