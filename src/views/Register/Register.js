import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from "react-native";

const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Boton from "../../Componentes/Boton/Index";
import InputNormal from "../../Componentes/InputNormal/Index";
import InputContraseña from "../../Componentes/InputContraseña/Index";

import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons/faCakeCandles";
import { faFlag } from "@fortawesome/free-solid-svg-icons/faFlag";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar"

import { validateEmail } from "../../Helpers/Helpers";
import { validatePassword } from "../../Helpers/Helpers";

import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";


import axios from "axios";

export default function Register({ navigation }) {
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
  const [errorNombre, setErrorNombre] = React.useState("");
  const [errorApellido, setErrorApellido] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorNacimiento, setErrorNacimiento] = React.useState("");
  const [errorNacionalidad, setErrorNacionalidad] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorConfirm, setErrorConfirm] = React.useState("");
  //const [loading, setLoading] = useState(false)


  const [open, setOpen] = React.useState(false); //abre y cierra el modal

  const [date, setDate] = React.useState(new Date()); //variable de date

  const today = getToday();

  const [isSelected, setIsSelected] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  function handleOnPress() {
    setOpen(!open);
  }

  function onDateSelected(value) {
    setDate(value);
    setIsSelected(true);
  }

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const registerUser = () => {
    if (!validateData()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      registrarUsuario(formData.nombre, formData.apellido, formData.email, formData.password, date, formData.nacionalidad);
    }, 3000);

  };

  const registrarUsuario = async (nombre, apellido, mail, contraseña, nacimiento, nacion) => {

    let notification = JSON.stringify({
      name: nombre,
      lastname: apellido,
      email: mail,
      password: contraseña,
      dateOfBirth: nacimiento,
      country: nacion
    })

    let headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const peticion = await axios.post("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/auth/register", notification, headers)
      .then(res => {

        navigation.navigate("PantallaCodigo", { mail: formData.email })
      })
      .catch(error =>
        console.log(error),
        setErrorEmail("El mail ya existe."),
        setLoading(false),

        console.log(date)
      );
  }


  const validateData = () => {
    setErrorNombre("");
    setErrorApellido("");
    setErrorEmail("");
    setErrorNacimiento("");
    setErrorNacionalidad("");
    setErrorPassword("");
    setErrorConfirm("");
    let isValid = true;

    if (formData.nombre == "") {
      setErrorNombre("Debes ingresar un nombre.");
      isValid = false;
    }
    if (formData.apellido == "") {
      setErrorApellido("Debes ingresar un apellido.");
      isValid = false;
    }
    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar un email valido.");
      isValid = false;
    }
    if (formData.email == "") {
      setErrorEmail("Debe ingresar un email.");
      isValid = false;
    }


    if (isSelected == false) {
      setErrorNacimiento("Debes ingresar una fecha de nacimiento.")
      isValid = false;
    }
    if (date >= today) {
      setErrorNacimiento("Debes ingresar una fecha de nacimiento valida.")
      isValid = false;
    }
    if (formData.nacionalidad == "") {
      setErrorNacionalidad("Debes ingresar una nacionalidad.");
      isValid = false;
    }
    if (formData.password == "") {
      setErrorPassword("Debe ingresar una contraseña.");
      isValid = false;
    }


    if (!validatePassword(formData.password) & formData.password !== "") {
      setErrorPassword("Debe ingresar una contraseña valida." + "\n" + "Debe tener al menos 8 coracteres, 1 mayuscula y 1 numero.");
      isValid = false;
    }

    if ((formData.confirm !== formData.password) & (formData.confirm !== "")) {
      setErrorConfirm("La confirmacion no coincide.");
      isValid = false;
    }
    if (formData.confirm == "") {
      setErrorConfirm("Debes volver a ingresar la contraseña.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={Styles.container}>
      <ScrollView>
        <View style={Styles.logo}>
          <Image source={require("../../img/sensor3.png")} />
        </View>

        <View style={Styles.registerContainer}>

          <InputNormal icono={faUser} placeholder="Ingrese su nombre" errorMessage={errorNombre}
            onChange={(e) => onChange(e, "nombre")} defaultValue={formData.nombre} />
          {errorNombre !== null ? (
            <Text style={Styles.mensajeError}>{errorNombre}</Text>
          ) : null}

          <InputNormal icono={faUser} placeholder="Ingrese su apellido" errorMessage={errorApellido}
            onChange={(e) => onChange(e, "apellido")} defaultValue={formData.apellido} />
          {errorApellido !== null ? (
            <Text style={Styles.mensajeError}>{errorApellido}</Text>
          ) : null}

          <InputNormal icono={faEnvelope} placeholder="Ingrese su mail" errorMessage={errorEmail}
            onChange={(e) => onChange(e, "email")} defaultValue={formData.email} />
          {errorEmail !== null ? (
            <Text style={Styles.mensajeError}>{errorEmail}</Text>
          ) : null}

          <View style={Styles.input}>
            <FontAwesomeIcon icon={faCakeCandles} style={Styles.icono} />
            <TextInput
              placeholder="Ingrese fecha"
              editable={false}
              errorMessage={errorNacimiento}
              onChange={(e) => onChange(e, "nacimiento")}
              value={date == null ? "" : date}
            />
            <TouchableOpacity onPress={handleOnPress} style={Styles.icon} >
              <FontAwesomeIcon icon={faCalendar} />
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={open}
            >
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={Styles.modalView}>
                  <DatePicker
                    mode="calendar"
                    onSelectedChange={date => {
                      onDateSelected(date)
                    }}
                    options={{
                      textFontSize: 13,
                      selectedTextColor: "#fff",
                      mainColor: "#F47228",
                      backgroundColor: "#f1f1f1",
                      textSecondaryColor: "#F4722B"
                    }}
                    style={{ borderRadius: 20 }}
                  />

                  <TouchableOpacity onPress={handleOnPress}>
                    <Text style={{ marginTop: 10, marginBottom: -10, color: "#F4722B" }} >
                      Cerrar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

          </View>
          {errorNacimiento !== null ? (
            <Text style={Styles.mensajeError}>{errorNacimiento}</Text>
          ) : null}

          <InputNormal icono={faFlag} placeholder="Ingrese su nacionalidad" errorMessage={errorNacionalidad}
            onChange={(e) => onChange(e, "nacionalidad")} defaultValue={formData.nacionalidad} />
          {errorNacionalidad !== null ? (
            <Text style={Styles.mensajeError}>{errorNacionalidad}</Text>
          ) : null}

          <InputContraseña icono={faLock} placeholder="Ingrese su contraseña" secureTextEntry={data.secureTextEntry ? true : false}
            errorMessage={errorPassword} onChange={(e) => onChange(e, "password")} defaultValue={formData.password} onPress={updateSecureTextEntry}
            iconoOjo={data.secureTextEntry ? faEyeSlash : faEye} />
          {errorPassword !== null ? (
            <Text style={Styles.mensajeError}>{errorPassword}</Text>
          ) : null}

          <InputContraseña icono={faLock} placeholder="Su contraseña de nuevo" secureTextEntry={data.secureTextEntry ? true : false}
            errorMessage={errorConfirm} onChange={(e) => onChange(e, "confirm")} defaultValue={formData.confirm} onPress={updateSecureTextEntry}
            iconoOjo={data.secureTextEntry ? faEyeSlash : faEye} />
          {errorPassword !== null ? (
            <Text style={Styles.mensajeError}>{errorConfirm}</Text>
          ) : null}

          <View style={{ marginLeft: 60, marginRight: 60, marginTop: 30 }}>
            <View>
              <Boton
                text={loading ? <ActivityIndicator color="#fff" size="large" />
                  :
                  "Registrarse"}
                onPress={() => registerUser()}
                //onPress={() => navigation.navigate("PantallaCodigo")}
                type="principal"
              />
            </View>

            <View
              style={{
                marginTop: 30,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={Styles.texto}>¿Ya tiene una cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    paddingLeft: 20,
                    color: "#FF8800",
                  }}
                >
                  Ingresar
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
  return { nombre: "", apellido: "", email: "", nacimiento: "", nacionalidad: "", password: "", confirm: "" };
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
    width: width - 40
  },
  registerContainer: {
    //marginLeft: 30,
    width: width - 40,
    borderColor: "#FF8800",
    borderRadius: 30,
    borderWidth: 4,
    //  marginRight: 15,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 20
  },
  input: {
    marginBottom: 10,
    borderColor: "#FF8800",
    borderWidth: 3,
    borderRadius: 30,
    // paddingStart:30,
    width: width - 70,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#EDEAEA",
    flexDirection: "row",
  },
  icono: {
    marginRight: 5,
    marginTop: 5,
    //marginLeft: 32
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: width - 390,
    marginLeft: "auto"
  },
  iconoOjo: {
    alignItems: "center",
    justifyContent: "center",
    width: width - 390,
    marginLeft: "auto"
  },
  texto: {
    fontWeight: "bold",
    fontSize: 10,
    //  paddingLeft: 12,
    //marginLeft: ,
  },
  botonRegistrar: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    padding: 10,
    textAlign: "center",
    color: "white",
    backgroundColor: "orange",
    borderRadius: 30,
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
  }
});
