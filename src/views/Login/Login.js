import * as React from "react";

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  styles,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";

const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Boton from "../../Componentes/Boton/Index";
import InputNormal from "../../Componentes/InputNormal/Index";
import InputContraseña from "../../Componentes/InputContraseña/Index";

import { Text as TextoDripsy } from "dripsy";

import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

import { validateEmail } from "../../Helpers/Helpers";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";
import { useTheme } from "@react-navigation/native";


export default function Login({ navigation }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const [formData, setFormData] = React.useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");


  const [loading, setLoading] = React.useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const getTokenUsuario = async (mail, contraseña) => {

    let notification = JSON.stringify({
      email: mail,
      password: contraseña
    })

    let headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
                                    //http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/auth/login
    const peticion = await axios.post("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/auth/login", notification, headers)
      .then(async res => {
        await AsyncStorage.setItem('@storage_Key', res.data.token);
        navigation.navigate("MostrarSensores",{emailUsuario: mail})
        setErrorEmail("")
      })
      .catch(error =>
        console.log(error),
        setErrorEmail("Mail o contraseña incorrectos."),
        setLoading(false)
      );

  }

  const loginUser = () => {
    if (!validateData()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      getTokenUsuario(formData.email, formData.password);
    }, 3000);
    // navigation.navigate("MostrarSensores");
  };

  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar un email valido.");
      isValid = false;
    }
    if (formData.email == "") {
      setErrorEmail("Debe ingresar un email.");
      isValid = false;
    }

    if (formData.password == "") {
      setErrorPassword("Debe ingresar una contraseña.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={Styles.container}>
      <ScrollView>
        <View style={Styles.logo}>
          {<Image source={require("../../img/ProyectoMovilLogo.png")} />}
          {/*<Image source={require("../../img/sensor3.png")} />*/}
        </View>

        <View style={Styles.loginContainer}>

          <InputNormal icono={faUser} placeholder="Ingrese su mail" errorMessage={errorEmail}
            onChange={(e) => onChange(e, "email")} defaultValue={formData.email} />
          {errorEmail !== null ? (
            <Text style={Styles.mensajeError}>{errorEmail}</Text>
          ) : null}

          <InputContraseña icono={faLock} placeholder="Ingrese su contraseña" secureTextEntry={data.secureTextEntry ? true : false}
            errorMessage={errorPassword} onChange={(e) => onChange(e, "password")} defaultValue={formData.password} onPress={updateSecureTextEntry}
            iconoOjo={data.secureTextEntry ? faEyeSlash : faEye} />
          {errorPassword !== null ? (
            <Text style={Styles.mensajeError}>{errorPassword}</Text>
          ) : null}

          <View style={{ marginLeft: 60, marginRight: 60, marginTop: 20 }}>
            <View>
              <Boton
                text={loading ? <ActivityIndicator color="#fff" size="large" />
                  :
                  "Ingresar"}
                onPress={() => loginUser()}
               // onPress={() => navigation.navigate("MostrarSensores")}
                type="principal"
              />
            </View>

            <View
              style={{
                marginTop: 20,
                fontWeight: "bold",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={Styles.texto}>¿No se ha registrado?</Text>

              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    paddingLeft: 20,
                    color: "#FF8800",
                    // textShadowRadius: 3,
                  }}
                >
                  Registrarse
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const defaultFormValues = () => {
  return { email: "", password: "" };
};

const Styles = StyleSheet.create({
  container: {
    textAlign: "center",
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 30,
    marginTop: 5,
    height: height / 2,
    width: width -40,
  },
  loginContainer: {
    //marginLeft: 30,
    width: width - 40,
    borderColor: "#FF8800",
    borderRadius: 30,
    borderWidth: 4,
    //  marginRight: 15,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 20,
    elevation : 4
  },

  texto: {
    fontWeight: "bold",
    fontSize: 10,
    // paddingLeft: 10,
  },
  mensajeError: {
    marginLeft: 40,
    color: "red",
  },
});
