import * as React from 'react';


import { View, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text as TextoDripsy } from "dripsy";

const { height, width } = Dimensions.get("screen");


const Historial = (props) => {


    return (

        <View style={Styles.historialContainer}>
        <View style={{ marginLeft: 5, marginRight: 5 }}>

          {/*<Text style={{ textAlign: "center", marginTop: 5 }}>Se ABRIÓ la puerta</Text>*/}
          <TextoDripsy sx={{
            fontSize: [14, 14, 16],
            textAlign: "center",
            marginTop: 1
          }}>{props.mensaje}</TextoDripsy>

          <View style={{ flexDirection: "row" }}>
            {/*<Text style={{ fontSize: 10, padding: 5 }}>fecha</Text>*/}
            <TextoDripsy sx={{
              fontSize: [10, 12, 14],
              padding: 2
            }}>{props.fecha}</TextoDripsy>

            {/*<Text style={{ fontSize: 10, padding: 5, marginLeft: 175 }}>hora</Text>*/}
            <TextoDripsy sx={{
              fontSize: [10, 12, 14],
              padding: 2,
              marginLeft: "auto"
            }}>hora</TextoDripsy>
          </View>
        </View>
      </View>

    );
}


export default  Historial;

const Styles = StyleSheet.create({

    historialContainer: {
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
  })