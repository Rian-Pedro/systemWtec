import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default ({ title, back, navigation }) => {
  return (
    <View style={styles.header}>
      {back &&
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <MaterialIcons name="keyboard-arrow-left" size={25} color="#fff" />
        </TouchableOpacity>
      }
      <Image source={require("../../assets/logo.png")} resizeMode="contain" style={styles.logo} />
      {title && 
        <View style={styles.boxText}>
          <Text style={styles.pageTitle}>{title}</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#FF820E",
    position: "relative"
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: "center"
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff"
  },
  boxText: {
    position: "absolute", 
    right: 12, 
    height: "180%", 
    justifyContent: "center", 
    width: 100
  },
  back: {
    position: "absolute",
    padding: 10,
    top: "50%",
    left: 20
  }
});