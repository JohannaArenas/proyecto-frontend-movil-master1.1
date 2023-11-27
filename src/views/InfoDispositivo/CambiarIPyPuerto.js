import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Boton from "../../Componentes/Boton/Index";
import InputNormal from "../../Componentes/InputNormal/Index";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import { faLaptop } from "@fortawesome/free-solid-svg-icons/faLaptop";

import { useRoute } from '@react-navigation/native';
import { useTheme } from "@react-navigation/native";

export default function CambiarIPyPuerto({ navigation }) {
  const [data, setData] = React.useState({
    ip: "",
    puerto: "",
    secureTextEntry: true,
  });


  const [formData, setFormData] = React.useState(defaultFormValues());
  const [errorNumeroIP, setErrorNumeroIP] = React.useState("");
  const [errorNumeroPuerto, setErrorNumeroPuerto] = React.useState("");

  const route = useRoute();
  const codeDisp = route.params.codigo;

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const validadIPyPuerto = () => {
    if (!validateData()) {
      return;
    }
    //navigation.navigate('InfoDispositivo')
    cambiarIPyPuerto(formData.numeroIP, formData.numeroPuerto);
  };

  //--------------------------------------

  const cambiarIPyPuerto = async (ip, port) => {
    let notification = JSON.stringify({
      //deviceCode: codeDisp,
      ip: ip,
      port: port,
      deviceCode: codeDisp
    });

    const token = await AsyncStorage.getItem("@storage_Key");

    let headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const peticion = await axios
      .put(
        "http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/device/change-device-ip-port",
        notification,
        headers
      )
      .then(async (res) => {
        navigation.goBack();
      })
      .catch(
        (error) => console.log(error),
        setErrorNumeroIP("Error. IP o puerto no válidos")
      );
  };
  //-------------------------------------------------------------

  const validateData = () => {
    setErrorNumeroIP("");
    setErrorNumeroPuerto("");
    let isValid = true;

    if (formData.numeroIP == "") {
      setErrorNumeroIP("Debes ingresar una Ip.");
      isValid = false;
    }

    if (formData.numeroPuerto == "") {
      setErrorNumeroPuerto("Debes ingresar un puerto.");
      isValid = false;
    }

    return isValid;
  };

  const { colors } = useTheme();

  return (
    <View style={[Styles.container, { backgroundColor: colors.background }]}>
      <View style={[Styles.formContainer, { backgroundColor: colors.card }]}>
         <InputNormal
          icono={faLaptop}
          placeholder="Ingresar número IP"
          errorMessage={errorNumeroIP}
          onChange={(e) => onChange(e, "numeroIP")}
          defaultValue={formData.errorNumeroIP}
        />
        {errorNumeroIP !== null ? (
          <Text style={Styles.mensajeError}>{errorNumeroIP}</Text>
        ) : null}
        
   <InputNormal
          icono={faLaptop}
          placeholder="Ingresar número puerto"
          errorMessage={errorNumeroPuerto}
          onChange={(e) => onChange(e, "numeroPuerto")}
          defaultValue={formData.errorNumeroPuerto}
        />
        {errorNumeroPuerto !== null ? (
          <Text style={Styles.mensajeError}>{errorNumeroPuerto}</Text>
        ) : null}

        <View style={Styles.botonCambiarIPyPuerto}>
          <View>
            <Boton
              text="Cambiar Ip y Puerto"
              onPress={() => validadIPyPuerto()}
              type="principal"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const defaultFormValues = () => {
  return { numeroIP: "", numeroPuerto: "" };
};

const Styles = StyleSheet.create({
  container: {
    textAlign: "center",
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: width - 40,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "#FF8800",
    borderWidth: 2,
    alignItems: "center",
    elevation: 4,
  },
  mensajeError: {
    //marginLeft: 40,
    color: "red",
  },
  botonCambiarIPyPuerto:{
    margin: 10
  }
});