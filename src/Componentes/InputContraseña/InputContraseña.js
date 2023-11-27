import * as React from 'react';


import { View, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const InputContraseña = (props) => {


    return (

        <View style={Styles.input}>
            <FontAwesomeIcon icon={props.icono} style={Styles.icono} />
            <TextInput
                placeholder={props.placeholder}
                autoCapitalize='none'
                errorMessage={props.errorMessage}
                onChange={props.onChange}
                defaultValue={props.defaultValue}
                secureTextEntry={props.secureTextEntry}
            />

            <TouchableOpacity onPress={props.onPress} style={Styles.iconoOjo}>
                <FontAwesomeIcon
                    icon={props.iconoOjo}
                />
            </TouchableOpacity>

        </View>

    );
}


export default  InputContraseña;

const Styles = StyleSheet.create({
    input: {
        borderColor: "#FF8800",
        borderWidth: 3,
        borderRadius: 30,
        paddingStart: 10,
        width: width - 70,
        marginTop: 10,
        padding: 10,
        backgroundColor: "#EDEAEA",
        flexDirection: "row",
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
})