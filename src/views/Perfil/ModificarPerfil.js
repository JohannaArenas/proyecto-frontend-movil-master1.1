import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";

const { height, width } = Dimensions.get("screen");

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Boton from "../../Componentes/Boton/Index";
import InputNormal from "../../Componentes/InputNormal/Index";

import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons/faCakeCandles";
import { faFlag } from "@fortawesome/free-solid-svg-icons/faFlag";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar"

import { validateEmail } from "../../Helpers/Helpers";

import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import { useEffect } from "react"; //----------------------------------------

export default function ModificarPerfil({ navigation }) {

  const [formData, setFormData] = React.useState(defaultFormValues(nombre, apellido, mail, nacimiento, nacionalidad));

  const [errorNombre, setErrorNombre] = React.useState("");
  const [errorApellido, setErrorApellido] = React.useState("");
  const [errorMail, setErrorMail] = React.useState("");
  const [errorNacimiento, setErrorNacimiento] = React.useState("");
  const [errorNacionalidad, setErrorNacionalidad] = React.useState("");
  const [loading, setLoading] = React.useState(false)


  const [open, setOpen] = React.useState(false); //abre y cierra el modal
  const [abrir, setAbrir] = React.useState(false);

  const [date, setDate] = React.useState(new Date()); //variable de date

  const today = getToday();

  const [isSelected, setIsSelected] = React.useState(false);


  function handleOnPress() {
    setOpen(!open);
  }

  function handleOnPress2() {
    setAbrir(!abrir);
  }

  function onDateSelected(value) {
    setDate(value);
    setIsSelected(true);
  }

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const [nombre, getNombre] = React.useState("");
  const [apellido, getApellido] = React.useState("");
  const [mail, getMail] = React.useState("");
  const [nacimiento, getNacimiento] = React.useState("");
  const [nacionalidad, getNacionalidad] = React.useState("");


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
        getNombre(res.data.name);
        getApellido(res.data.lastname);
        getMail(res.data.email);
        getNacimiento(res.data.dateOfBirth);
        getNacionalidad(res.data.country);

        formData.mail = mail;
        formData.nombre = nombre;
        formData.apellido = apellido;
        formData.nacimiento = nacimiento; //  =1999/11/20
        formData.nacionalidad = nacionalidad;
      })
      .catch(error =>
        console.log("error al traer los datos"),
        setLoading(false)
      );

  }


  const changeUserData = async (nombre, apellido, nacionalidad, birthday, email) => {

    const fechaHoy = new Date(birthday)
    const añoFechaHoy = fechaHoy.getFullYear()
    const calcMes = fechaHoy.getMonth() + 1
    const diaFechaHoy = fechaHoy.getDate()

    const fechaHoyArmada = añoFechaHoy + "/" + calcMes + "/" + diaFechaHoy

    if (fechaHoyArmada == getToday()) {
      birthday = formData.nacimiento
    }

   // console.log(birthday)

    let notification = JSON.stringify({
      name: nombre,
      lastname: apellido,
      country: nacionalidad,
      dateOfBirth: birthday,
      email: email
    })

    const token = await AsyncStorage.getItem('@storage_Key');
    let headers = {
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const peticion = await axios.put("http://proyecto-backend-movil-production.up.railway.app/app_movil_sensor/api/user/modify-data", notification, headers)
      .then(async res => {

        if (formData.mail == mail) {
          handleOnPress2()
          navigation.goBack()
          return;
        }
        navigation.navigate("PantallaCodigoModificarPerfil", { email: email })
      })
      .catch(error =>
        console.log(error),
        setErrorMail("Acceso denegado."),
        setLoading(false),
        handleOnPress2()
      );
  }



  const modificarDatosPerfil = () => {
    if (!validateData()) {
      // console.log(nombre+" , "+formData.nombre)
      setLoading(false)
      return;
    }

    handleOnPress2();
  };

  const validateData = () => {
    setErrorNombre("");
    setErrorApellido("");
    setErrorMail("");
    setErrorNacimiento("");
    setErrorNacionalidad("");
    let isValid = true;


    //ARREGLAR VALIDACIONES---------------------------------------------

    if (formData.nombre == "") {
      setErrorNombre("Debes ingresar un nombre.");
      isValid = false;
    }
    if (formData.apellido == "") {
      setErrorApellido("Debes ingresar un apellido.");
      isValid = false;
    }
    if (formData.mail == "") {
      setErrorMail("Debes ingresar un mail.");
      isValid = false;
    }
    if (!validateEmail(formData.mail) & (formData.mail !== "")) {
      setErrorMail("Debes ingresar un email valido.");
      isValid = false;
    }
    if (formData.nacimiento == "") {
      setErrorNacimiento("Debes ingresar una fecha de nacimiento")
      isValid = false;
    }
    if (date >= today) {
      setErrorNacimiento("Debes ingresar una fecha de nacimiento valida")
      isValid = false;
    }
    if (formData.nacionalidad == "") {
      setErrorNacionalidad("Debes ingresar una nacionalidad.");
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    getUserData();
  }, [/*nacionalidad*/]);

  return (
    <View style={Styles.container}>
      <ScrollView>
        <View style={Styles.formContainer}>

          <InputNormal icono={faUser} placeholder="Ingrese su nombre" errorMessage={errorNombre}
            onChange={(e) => onChange(e, "nombre")} defaultValue={nombre} />
          {errorNombre !== null ? (
            <Text style={Styles.mensajeError}>{errorNombre}</Text>
          ) : null}

          <InputNormal icono={faUser} placeholder="Ingrese su apellido" errorMessage={errorApellido}
            onChange={(e) => onChange(e, "apellido")} defaultValue={apellido} />
          {errorApellido !== null ? (
            <Text style={Styles.mensajeError}>{errorApellido}</Text>
          ) : null}

          <InputNormal icono={faEnvelope} placeholder="Ingrese su mail" errorMessage={errorMail}
            onChange={(e) => onChange(e, "mail")} defaultValue={mail} />
          {errorMail !== null ? (
            <Text style={Styles.mensajeError}>{errorMail}</Text>
          ) : null}

          <View style={Styles.input}>
            <FontAwesomeIcon icon={faCakeCandles} style={Styles.icono} />
            <TextInput
              placeholder="Ingrese fecha"
              editable={false}
              errorMessage={errorNacimiento}
              onChange={(e) => onChange(e, "nacimiento")}
              value={date == null ? "" : date}
              defaultValue={nacimiento}
            />
            <TouchableOpacity onPress={handleOnPress} style={Styles.iconoCal} >
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
                    //selected={getFormatedDate(onDateSelected(date), 'DD/MM/YYYY')}
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
            onChange={(e) => onChange(e, "nacionalidad")} defaultValue={nacionalidad} />
          {errorNacionalidad !== null ? (
            <Text style={Styles.mensajeError}>{errorNacionalidad}</Text>
          ) : null}

          <View style={Styles.botonModificarPerfil}>

            <Boton
              text={loading ? <ActivityIndicator color="#fff" size="large" />
                :
                "Modificar perfil"}
              onPress={() => modificarDatosPerfil()}
              //onPress={() => navigation.navigate("PantallaCodigoModificarPerfil")}
              type="principal"
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={abrir}
          >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <View style={Styles.modalView}>

                <Text style={{ textAlign: "center", marginTop: 10 }}>¿Seguro que quiere modificar su perfil?</Text>


                <View style={{ flexDirection: "row", marginTop: 20, }}>
                  <View >
                    <Boton text="Aceptar"
                      onPress={() => changeUserData(formData.nombre, formData.apellido, formData.nacionalidad, date /*== new Date() ? date : formData.nacimiento*/, formData.mail)}
                      type="aceptar"
                    />
                  </View>

                  <View >
                    <Boton text="Cancelar"
                      onPress={handleOnPress2}
                      type="cancelar"
                    />
                  </View>
                </View>

              </View>
            </View>

          </Modal>

        </View>
      </ScrollView>
    </View>
  );
}

const defaultFormValues = (nombre, apellido, mail, nacimiento, nacionalidad) => {
  return {
    nombre: nombre,
    apellido: apellido,
    mail: mail,
    nacimiento: nacimiento,
    nacionalidad: nacionalidad,
  };
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
    marginBottom: 20,
    width: width - 40,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: "#FF8800",
    backgroundColor: "withe",
    alignItems: "center"
  },
  input: {
    marginBottom: 10,
    borderColor: "#FF8800",
    borderWidth: 3,
    borderRadius: 30,
    width: width - 70,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#EDEAEA",
    flexDirection: "row",
  },
  icono: {
    marginRight: 5,
    marginTop: 5,
  },
  iconoCal: {
    alignItems: "center",
    justifyContent: "center",
    width: width - 390,
    marginLeft: "auto"
  },
  botonModificarPerfil: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  mensajeError: {
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
