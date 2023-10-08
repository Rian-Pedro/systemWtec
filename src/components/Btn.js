import { StyleSheet, TouchableOpacity, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default ({ title, navigation }) => {

  return (
    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Perfil")}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#FF820E",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  btnText: {
    fontSize: 20,
    color: "#fff"
  }
});