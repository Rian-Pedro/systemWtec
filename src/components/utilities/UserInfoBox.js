import { StyleSheet, View, Text } from "react-native";

export default ({ title, info }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}:</Text>
      <Text 
        style={{
          fontWeight: "600", 
          fontSize: 16
        }}
      >{info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#BABABA",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    elevation: 4,
    backgroundColor: "#F1F1F1"
  },
  title: {
    color: "#BABABA",
    position: "absolute",
    backgroundColor: "#F1F1F1",
    top: "-50%",
    left: 20,
    fontWeight: "600",
    fontSize: 16,
    paddingHorizontal: 5
  }
});