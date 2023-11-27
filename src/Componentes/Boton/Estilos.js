import { StyleSheet } from "react-native";

export const botonEstilos = StyleSheet.create({
  principal: {
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "uppercase",
    padding: 10,
    textAlign: "center",
    color: "white",
    backgroundColor: "#FF8800",
    borderRadius: 30,
    borderColor: "#BF8139",
    width: "145%",
   // background: "#fdc830",
    alignSelf: "center",
    elevation: 5
  },
  secundario: {
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    backgroundColor: "#FF8800",
    color: "white",
    padding: 5,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#FF8800",
    alignSelf: "center",
    elevation: 5
  },

  aceptar: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "rgb(17, 216, 17)",
    color: "white",
    padding: 14,
    textTransform: "uppercase",
    marginRight: 10,
    borderRadius: 30,
    elevation: 5
  },
  cancelar: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "red",
    color: "white",
    padding: 14,
    textTransform: "uppercase",
    marginLeft: 10,
    borderRadius: 30,
    elevation: 5
  },
});
