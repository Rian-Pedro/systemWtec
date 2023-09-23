import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";

import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} resizeMode="contain" style={styles.logo} />
      </View>

      <ImageBackground source={require("../assets/HomeBack.png")} style={styles.main}>
        <View style={{paddingHorizontal: 35}}>
          <Text style={{fontWeight: "600", fontSize: 20}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
          </Text>
          <Image source={require("../assets/lamp.png")} resizeMode="contain" style={styles.lamp} />
        </View>
      </ImageBackground>

      <View style={styles.containerBtns}>
        <View style={styles.loginButton} onTouchStart={() => navigation.navigate("Login")}>
          <Text style={{fontSize: 18, fontWeight: "900", color: "#FF820E"}}>Login</Text>
          <Entypo name="login" size={24} color="#FF820E" />
        </View>
        <View style={styles.registerButton} onTouchStart={() => navigation.navigate("Register")}>
          <Text style={{fontSize: 18, fontWeight: "900", color: "#fff"}}>Cadastro</Text>
          <MaterialCommunityIcons name="file-document-edit" size={24} color="#fff" />
        </View>
      </View>

    </View>
  )
}

const button = {
  flexDirection: "row",
  gap: 10,
  flex: 2,
  justifyContent: "center",
  paddingVertical: 5,
  borderRadius: 5
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#FF820E"
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: "center"
  },
  main: {
    width: "100%",
    flex: 1,
    justifyContent: "center"
  },
  lamp: {
    width: 45,
    height: 45,
    alignSelf: "flex-end",
    right: 36
  },
  containerBtns: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    paddingVertical: 38,
    paddingHorizontal: 20,
    backgroundColor: "#FF820E"
  },
  loginButton: {
    ...button,
    backgroundColor: "#fff"
  },
  registerButton: {
    ...button,
    backgroundColor: "#000"
  },
});
