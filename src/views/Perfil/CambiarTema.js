import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text as TextoDripsy } from "dripsy";

import { EventRegister } from 'react-native-event-listeners'
import { useTheme } from "@react-navigation/native";


export default function CambiarTema({ navigation }) {

const [darkMode, setDarkMode]= React.useState(false);


function handleOnPress() {
  setDarkMode(!darkMode);
  EventRegister.emit('changeThemeEvent', darkMode)
 // console.log(darkMode);
}

const {colors} = useTheme();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
   // background: [darkMode ? "orange" :  "red"],
   background: "orange",
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
 //   border: 'rgb(199, 199, 204)',
   // notification: 'rgb(255, 69, 58)',
  },
};


  return (
    <View /*style={Styles.container}*/ style={[Styles.container, {backgroundColor: colors.background}]} /*style={darkMode ? Styles.fondodark : Styles.container}*/>
      <View style={Styles.container2}>

        <TextoDripsy
          sx={{
            fontSize: [20, 25, 30],
            textAlign: "center",
            fontWeight: "bold",
            padding: 2,
          }}
        >
          Elija un tema para la aplicacion:
        </TextoDripsy>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={[Styles.opcionColor, { backgroundColor: "red" }]}
          />

          <TouchableOpacity
            style={[Styles.opcionColor, { backgroundColor: "blue" }]}
          />

          <TouchableOpacity
            style={[Styles.opcionColor, { backgroundColor: "green" }]}
          />
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={[Styles.opcionColor, { backgroundColor: "grey" }]}
            onPress={handleOnPress}
          />

          <TouchableOpacity
            style={[Styles.opcionColor, { backgroundColor: "yellow" }]}
          />

          <TouchableOpacity
            style={[Styles.opcionColor, { backgroundColor: "orange" }]}
          />
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  /*fondodark: {
    backgroundColor: "red",
    flex: 1
  },*/
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  container2: {
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    borderColor: "#FF8800",
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 120,
    borderRadius: 30,
    borderWidth: 3,
  },
  texto: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
  },
  opcionColor: {
    padding: 25,
    margin: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
});
