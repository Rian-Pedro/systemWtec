import { StyleSheet, View, Image } from "react-native";

export default () => {
  return (
    <View style={styles.header}>
      <Image source={require("../../assets/logo.png")} resizeMode="contain" style={styles.logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#FF820E"
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: "center"
  }
});