import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions
} from "react-native";

const { height, width } = Dimensions.get("window");

import Boton from "../../Componentes/Boton/Index";

import { Text as TextoDripsy } from "dripsy";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

export default function EliminarPerfil({ navigation }) {
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
  const [errorConfirm, setErrorConfirm] = React.useState("")
  //const [loading, setLoading] = useState(false)

  const [open, setOpen] = React.useState(false);

  function handleOnPress() {
    setOpen(!open);
  }


  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }

  const eliminarUsuario = () => {
    if (!validateData()) {
      return;
    }
    handleOnPress();
    // navigation.navigate('InfoDispositivo')
  }


  const validateData = () => {
    setErrorPassword("")
    setErrorConfirm("")
    let isValid = true

    if (formData.password == "") {
      setErrorPassword("Debe ingresar la antigua contraseña.")
      isValid = false
    }

    if (formData.confirm == "") {
      setErrorConfirm("Repita la contraseña.")
      isValid = false
    }

    if (formData.confirm !== formData.password & formData.confirm !== "") {
      setErrorConfirm("Las contraseñas no coinciden.")
      isValid = false
    }

    return isValid
  }


  const deleteUser = async (contraseña) => {

    let notification = JSON.stringify({
      password: contraseña
    })

    const token = await AsyncStorage.getItem('@storage_Key');
    let headers = {
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const peticion = await axios.post("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/user/delete-user", notification, headers)
      .then(async res => {


        navigation.navigate("Login")
      })
      .catch(error =>

        setErrorPassword("Contraseña incorrecta."),
        handleOnPress()
        // setLoading(false)
      );

  }

  return (
    <View style={Styles.container} >

      <View style={Styles.formContainer}>
        <View style={Styles.input}>
          <FontAwesomeIcon icon={faLock} style={Styles.icono} />
          <TextInput
            placeholder='Ingrese contraseña actual'
            secureTextEntry={data.secureTextEntry ? true : false}
            errorMessage={errorPassword}
            onChange={(e) => onChange(e, "password")}
            defaultValue={formData.password}
          />
          <TouchableOpacity onPress={updateSecureTextEntry} style={Styles.iconoOjo}>
            <FontAwesomeIcon
              icon={data.secureTextEntry ? faEyeSlash : faEye}
            />
          </TouchableOpacity>
        </View>
        {errorPassword !== null ?
          <Text style={Styles.mensajeError}>{errorPassword}</Text>
          :
          null
        }

        <View style={Styles.input}>
          <FontAwesomeIcon icon={faLock} style={Styles.icono} />
          <TextInput
            placeholder='Repetir contraseña'
            secureTextEntry={data.secureTextEntry ? true : false}
            errorMessage={errorConfirm}
            onChange={(e) => onChange(e, "confirm")}
            defaultValue={formData.confirm}
          />
          <TouchableOpacity onPress={updateSecureTextEntry} style={Styles.iconoOjo}>
            <FontAwesomeIcon
              icon={data.secureTextEntry ? faEyeSlash : faEye}
            />
          </TouchableOpacity>
        </View>
        {errorConfirm !== null ?
          <Text style={Styles.mensajeError}>{errorConfirm}</Text>
          :
          null
        }

        <View style={Styles.botonCambiarCont}>
          <Boton text="Eliminar Perfil"
            onPress={() => eliminarUsuario()}
            //onPress={() => navigation.navigate('InfoDispositivo')} 
            type="principal" />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={Styles.modalView}>

              <Text style={{ textAlign: "center", marginTop: 10 }}>¿Seguro que quiere eliminar su perfil?</Text>


              <View style={{ flexDirection: "row", marginTop: 20, }}>
                <View >
                  <Boton text="Aceptar"
                    // onPress={() => navigation.navigate('Login')}
                    onPress={() => deleteUser(formData.password)}
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
  return { password: "", confirm: "" }
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  formContainer: {
    marginTop: 90,
    marginLeft: 17,
    marginRight: 17,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "#FF8800",
    borderWidth: 2,
  },
  input: {
    marginBottom: 10,
    borderColor: "#FF8800",
    borderWidth: 2,
    borderRadius: 30,
    // paddingStart:30,
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
    marginLeft: 40,
    color: "red",
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
})