import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
  Dimensions
} from "react-native";


const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

import { Text as TextoDripsy } from "dripsy";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import { useEffect } from "react"; //----------------------------------------

import { EventRegister } from 'react-native-event-listeners'
import { useTheme } from "@react-navigation/native";



export default function Perfil({ navigation }) {

  const [mail, getMail] = React.useState("");

  const [darkMode, setDarkMode] = React.useState(true);

  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch= () => {
    setDarkMode(!darkMode);
    EventRegister.emit('changeThemeEvent', darkMode)

    //setIsEnabled(!isEnabled);
    setIsEnabled(previousState => !previousState)
  }


  const getUserData = async () => {

    const token = await AsyncStorage.getItem('@storage_Key');
    let headers = {
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const peticion = await axios.get("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/user", headers)
      .then(async res => {
        getMail(res.data.email);
      })
      .catch(error =>
        console.log("error al traer los datos"),
      );

  }

  useEffect(() => {
    getUserData();
  }, []);


  const { colors } = useTheme();

  return (
    <View /*style={Styles.container}*/ style={[Styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={Styles.logo}>
          <Image source={require("../../img/ProyectoMovilLogo.png")} />
        </View>

        <View style={{ marginTop: 30 }}>

          <View style={Styles.opcionesLetra}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.navigate("ModificarPerfil")}
            >
              {/*<Text>Cambiar datos</Text>*/}

              <TextoDripsy
                sx={Styles.texto}
              >
                Cambiar datos
              </TextoDripsy>

              <FontAwesomeIcon icon={faArrowRight} style={Styles.icono} />
            </TouchableOpacity>
          </View>

          <View style={Styles.opcionesLetra}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.navigate("CambiarContraseñaPerfil", { emailUsuario: mail })}
            >
              {/*<Text>Cambiar contraseña</Text>*/}

              <TextoDripsy
                sx={Styles.texto}
              >
                Cambiar contraseña
              </TextoDripsy>

              <FontAwesomeIcon
                icon={faArrowRight}
                style={Styles.icono}
              />
            </TouchableOpacity>
          </View>

          <View style={[Styles.opcionesLetra, {padding: 0, paddingLeft: 0, flexDirection: "row"}]}>

              {/*<Text>Cambiar tema</Text>*/}

              <TextoDripsy
                //sx={Styles.texto}
                sx={{fontWeight: "bold",
                fontSize: [14, 16, 18],
                color: "#fff",
                textTransform: "uppercase",
              padding: 20,
            paddingLeft: 50}}
              >
                Modo oscuro
              </TextoDripsy>

              {/*<FontAwesomeIcon icon={faArrowRight} style={Styles.icono} />*/}
              <Switch style={{ marginLeft: "auto", marginRight: 10}} 
              trackColor={{false: "grey", true: "#D8D8D8"}}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4" }
              onValueChange={toggleSwitch}
              value={isEnabled}
              />
          </View>

          <View style={Styles.opcionesLetra}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.navigate("EliminarPerfil")}
            >
              {/*<Text>Eliminar perfil</Text>*/}

              <TextoDripsy sx={Styles.texto}>
                Eliminar perfil
              </TextoDripsy>

              <FontAwesomeIcon icon={faTrash} style={Styles.icono} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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
    height: height / 2,
    width: width - 40
  },
  opcionesLetra: {
    padding: 20,
    paddingLeft: 50,
    marginBottom: 10,
    width: width - 40,
    backgroundColor: "#FF8800",
    borderRadius: 30,

  },
  icono: {
    alignSelf: "flex-end",
    marginLeft: "auto",
    color: "white"  //--------------
  },
  texto: {
    fontWeight: "bold",
    fontSize: [14, 16, 18],
    color: "#fff",
    textTransform: "uppercase",
  },
});
