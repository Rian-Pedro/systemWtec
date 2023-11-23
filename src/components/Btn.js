import { StyleSheet, TouchableOpacity, Text } from "react-native"

export default ({ title, navigation, to }) => {
  return (
    <TouchableOpacity 
      style={styles.btn} 
      onPress={() => navigation.navigate(to)}
    >
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