import * as React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DripsyProvider } from "dripsy";
import { TouchableOpacity, View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

//import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";


import Login from "./src/views/Login/Login";
import Register from "./src/views/Register/Register";
import PantallaCodigo from "./src/views/Register/PantallaCodigo";

import MostrarSensores from "./src/views/MostrarSensores/MostrarSensores";
import MostrarSensoresInvitado from "./src/views/MostrarSensores/MostrarSensoresInvitado";
import InfoDispositivo from "./src/views/InfoDispositivo/InfoDispositivo";
import AgregarDispositivo from "./src/views/MostrarSensores/AgregarDispositivo";
import CambiarContraseña from "./src/views/InfoDispositivo/CambiarContraseña";
import PantallaCodigoContraseñaDisp from "./src/views/InfoDispositivo/PantallaCodigoCambiarContraseñaDisp";
import CambiarRedWifi from "./src/views/InfoDispositivo/CambiarRedWifi";
import CambiarIPyPuerto from "./src/views/InfoDispositivo/CambiarIPyPuerto";
import VerInvitados from "./src/views/InfoDispositivo/VerInvitados";
import AgregarInvitado from "./src/views/InfoDispositivo/AgregarInvitado";
import VerHistorial from "./src/views/InfoDispositivo/VerHistorial";
import EliminarDispositivo from "./src/views/InfoDispositivo/EliminarDispositivo";
import Perfil from "./src/views/Perfil/Perfil";
import ModificarPerfil from "./src/views/Perfil/ModificarPerfil";
import PantallaCodigoModificarPerfil from "./src/views/Perfil/PantallaCodigoModificarPerfil";
import EliminarPerfil from "./src/views/Perfil/EliminarPerfil";
import CambiarTema from "./src/views/Perfil/CambiarTema";
import CambiarContraseñaPerfil from "./src/views/Perfil/CambiarContraseñaPerfil";
import PantallaCodigoContraseñaUsuario from "./src/views/Perfil/PantallaCodigoContraseñaUsuario";

import { useEffect } from "react"; //----------------------------------------
import { EventRegister } from "react-native-event-listeners";

const Stack = createNativeStackNavigator();

const theme = { fontSizes: [14, 16, 20] };


export default function App() {

  const [darkApp, setDarkApp] = React.useState(false);
  const appTheme = darkApp ? DarkTheme : DefaultTheme;

  useEffect(() => {
    let eventListener = EventRegister.addEventListener('changeThemeEvent',
      (data) => {
        setDarkApp(data)
      })

    return () => {
      EventRegister.removeEventListener(eventListener);
    }
  }, []);

  //const { colors } = useTheme();

  return (
    <DripsyProvider theme={theme}>
      <NavigationContainer theme={appTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PantallaCodigo"
            component={PantallaCodigo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MostrarSensores"
            component={MostrarSensores}
            options={({ navigation }) => ({
              title: "Mostrar Sensores",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >

                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />

          <Stack.Screen
            name="MostrarSensoresInvitado"
            component={MostrarSensoresInvitado}
            options={({ navigation }) => ({
              title: "Mostrar Sensores Invitado",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="AgregarDispositivo"
            component={AgregarDispositivo}
            options={({ navigation }) => ({
              title: "Agregar Dispositivo",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="InfoDispositivo"
            component={InfoDispositivo}
            options={({ navigation }) => ({
              title: "Info Dispositivo",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="CambiarContraseña"
            component={CambiarContraseña}
            options={({ navigation }) => ({
              title: "Cambiar Contraseña Dispositivo",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="PantallaCodigoCambiarContraseñaDisp"
            component={PantallaCodigoContraseñaDisp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CambiarRedWifi"
            component={CambiarRedWifi}
            options={({ navigation }) => ({
              title: "Cambiar Red Wifi",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="CambiarIPyPuerto"
            component={CambiarIPyPuerto}
            options={({ navigation }) => ({
              title: "Cambiar Ip/Puerto",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        fontSize: 18,
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        color: "white",
                        marginright: 40,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="VerInvitados"
            component={VerInvitados}
            options={({ navigation }) => ({
              title: "Ver Invitados",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="AgregarInvitado"
            component={AgregarInvitado}
            options={({ navigation }) => ({
              title: "Agregar Invitado",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="VerHistorial"
            component={VerHistorial}
            options={({ navigation }) => ({
              title: "Ver Historial",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="EliminarDispositivo"
            component={EliminarDispositivo}
            options={({ navigation }) => ({
              title: "Eliminar Dispositivo",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={({ navigation }) => ({
              title: "Perfil",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />

          <Stack.Screen
            name="ModificarPerfil"
            component={ModificarPerfil}
            options={({ navigation }) => ({
              title: "Modificar Perfil",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="PantallaCodigoModificarPerfil"
            component={PantallaCodigoModificarPerfil}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EliminarPerfil"
            component={EliminarPerfil}
            options={({ navigation }) => ({
              title: "Eliminar Perfil",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="CambiarTema"
            component={CambiarTema}
            options={({ navigation }) => ({
              title: "Cambiar Tema",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="CambiarContraseñaPerfil"
            component={CambiarContraseñaPerfil}
            options={({ navigation }) => ({
              title: "Cambiar Contraseña Perfil",
              headerStyle: { backgroundColor: "#FF8800" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil")}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginLeft: 30,
                        marginTop: 5,
                        marginRight: 5,
                        fontSize: 5,
                        color: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{
                        fontSize: 18,
                        margin: -13,
                        color: "white",
                        marginLeft: 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="PantallaCodigoCambiarContraseñaUsuario"
            component={PantallaCodigoContraseñaUsuario}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DripsyProvider>
  );
}
