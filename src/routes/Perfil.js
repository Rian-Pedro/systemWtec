import { ScrollView, StyleSheet, View, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import Container from "../components/utilities/Container";
import UserInfoBox from "../components/utilities/UserInfoBox";
import { useEffect, useState } from "react";

import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ navigation }) => {

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("@userInfo"));
    setUserInfo(user);
  }

  return(
    <Container>
      <Header 
        title="Perfil"
        back={true}
        navigation={navigation} 
      />
      <View style={{flex: 1, justifyContent: "space-evenly"}}>
        <View style={{borderWidth: 1}}>
          <FontAwesome name="user-circle-o" size={100} color="black" />
        </View>
        <View style={styles.content}>
          <UserInfoBox 
            title="Nome"
            info={userInfo.nome}
          />

          <UserInfoBox 
            title="E-mail"
            info={userInfo.email}
          />

          <UserInfoBox 
            title="Telefone"
            info={userInfo.telefone}
          />

          <TouchableOpacity>
            <Text>Trocar a senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 27,
    justifyContent: "flex-start",
    gap: 20
  }
});