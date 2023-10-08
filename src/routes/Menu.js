import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from "react-native"
import Header from "../components/Header";
import Btn from "../components/Btn";
import Container from "../components/utilities/Container";

export default ({ navigation }) => {

  return (
    <Container>
      <StatusBar backgroundColor="#FF820E" barStyle={"light-content"}/>
      <Header title="Principal" />
      <View style={styles.areaBtn}>
        <Btn 
          title="Perfil" 
          navigation={navigation} 
          to="Perfil"
        />
        <Btn 
          title="Criar Ocorrencia" 
          navigation={navigation} 
          to=""
        />
        <Btn 
          title="Minhas Ocorrencias" 
          navigation={navigation} 
          to=""
        />
      </View>
    </Container>
  )

}

const styles = StyleSheet.create({
  areaBtn: {
    justifyContent: "center",
    paddingHorizontal: 27,
    flex: 1,
    gap: 22
  }
});