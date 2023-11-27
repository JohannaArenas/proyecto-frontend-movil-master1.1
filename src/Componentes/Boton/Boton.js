import * as React from 'react';
import { Props } from "./Tipos";

import {
    botonEstilos,
} from './Estilos';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Boton = ({ text, onPress, style = {}, type = 'principal' }) => {
    return (

        <TouchableOpacity
            onPress={onPress}
        >
            <Text style={{
                ...botonEstilos[type]
            }}>{text}</Text>
        </TouchableOpacity>

    );
}
export default Boton;

const Styles = StyleSheet.create({
    /* boton: {
         fontWeight: "bold",
         fontSize: 16,
         textTransform: "uppercase",
         padding: 10,
         textAlign: "center",
         color: "white",
         backgroundColor: "orangered",
         borderRadius: 30
     }*/
})