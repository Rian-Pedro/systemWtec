import { View, Text, StyleSheet, StatusBar } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function Register({ navigation }) {
  return (
    <>
      <StatusBar backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.containerBtn} onTouchStart={() => navigation.goBack()}>
          <AntDesign name="back" size={25} color="#fff" />
        </View>
        <Text>Register</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#FF820E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
    top: 20,
    left: 20
  }
});
