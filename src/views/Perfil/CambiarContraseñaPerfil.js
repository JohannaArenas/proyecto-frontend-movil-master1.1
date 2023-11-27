import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";

const { height, width } = Dimensions.get("window");

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Boton from "../../Componentes/Boton/Index";
import InputContraseña from "../../Componentes/InputContraseña/Index";

import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import { validatePassword } from "../../Helpers/Helpers";
import { useRoute } from '@react-navigation/native';

export default function CambiarContraseñaPerfil({ navigation }) {
  const [data, setData] = React.useState({
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
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorNewPassword, setErrorNewPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const route = useRoute();
  const mailUsuario = route.params.emailUsuario;

  const changePassword = async (password, newPassword) => {

    let notification = JSON.stringify({
      // email: "ignacio.balastegui@davinci.edu.ar",
      // password: "Password123"
      password: password,
      newPassword: newPassword
    })

    const token = await AsyncStorage.getItem('@storage_Key');

    let headers = {
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const peticion = await axios.put("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/user/modify-password", notification, headers)
      .then(async res => {

        navigation.navigate("PantallaCodigoCambiarContraseñaUsuario",{emailUsuario: mailUsuario})

        setLoading(false)
      })
      .catch(error =>
        console.log(error),
        //console.log(token),
        setErrorPassword("error"),
        setLoading(false)
      );

  }


  const cambiarContraseñaPerfil = () => {
    if (!validateData()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      changePassword(formData.password, formData.newPassword);
    }, 3000);
  };

  const validateData = () => {
    setErrorNewPassword("");
    setErrorPassword("");
    let isValid = true;

    /*if ((formData.password !== "hola123") & (formData.password !== "")) {
      setErrorPassword("Contraseña incorrecta.");
      isValid = false;
    }*/

    if (formData.password == "") {
      setErrorPassword("Debe ingresar la antigua contrasseña.");
      isValid = false;
    }

    if (formData.newPassword == "") {
      setErrorNewPassword("Debe ingresar una nueva contraseña.");
      isValid = false;
    }

    if (!validatePassword(formData.newPassword) & formData.newPassword !== "") {
      setErrorNewPassword("Contraseña invalida." + "\n" + "Debe tener al menos 8 coracteres, 1 mayuscula y 1 numero.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.formContainer}>

        <InputContraseña icono={faLock} placeholder="Ingresar contraseña actual" secureTextEntry={data.secureTextEntry ? true : false}
          errorMessage={errorPassword} onChange={(e) => onChange(e, "password")} defaultValue={formData.password} onPress={updateSecureTextEntry}
          iconoOjo={data.secureTextEntry ? faEyeSlash : faEye} />
        {errorPassword !== null ? (
          <Text style={Styles.mensajeError}>{errorPassword}</Text>
        ) : null}

        <InputContraseña icono={faLock} placeholder="Ingresar nueva contraseña" secureTextEntry={data.secureTextEntry ? true : false}
          errorMessage={errorNewPassword} onChange={(e) => onChange(e, "newPassword")} defaultValue={formData.newPassword} onPress={updateSecureTextEntry}
          iconoOjo={data.secureTextEntry ? faEyeSlash : faEye} />
        {errorNewPassword !== null ? (
          <Text style={Styles.mensajeError}>{errorNewPassword}</Text>
        ) : null}

        <View style={Styles.botonCambiarCont}>
          <Boton
            text={loading ? <ActivityIndicator color="#fff" size="large" />
              :
              "Cambiar contraseña"}
            //onPress={() => cambiarContraseñaPerfil()}
           onPress={() => navigation.navigate("PantallaCodigoCambiarContraseñaUsuario",{emailUsuario: mailUsuario})}
            type="principal"
          />
        </View>
      </View>
    </View>
  );
}

const defaultFormValues = () => {
  return { password: "", newPassword: "" };
};

const Styles = StyleSheet.create({
  container: {
    textAlign: "center",
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: {
    marginTop: 20,
   // marginLeft: 17,
   // marginRight: 17,
   width: width - 30,
    padding: 5,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: "#FF8800",
    backgroundColor: "withe",
    alignItems: "center",
  },
  botonCambiarCont: {
   // marginLeft: 60,
   // marginRight: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  mensajeError: {

    color: "red",
  },
});
