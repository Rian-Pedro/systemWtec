import { StyleSheet, View, Text, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import Container from "../components/utilities/Container";
import UserInfoBox from "../components/utilities/UserInfoBox";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt"

import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";

import axios from "axios"
import User from "../services/User";

export default ({ navigation }) => {

  const [userInfo, setUserInfo] = useState({});
  const [imageUser, setImageUser] = useState(null);

  const navigator = useNavigation()

  useEffect(() => {
    getUserInfo();
    getUserPhoto();
  }, []);

  const teste = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,4],
      quality: 1
    })

    delete result.cancelled

    console.log(result)

    if(!result.canceled) {
      setImageUser(result.assets[0].uri)
    }

    const formData = new FormData()

    formData.append('imagem', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'imagem.jpg'
    })

    await User.UserLogin.setUserImg(result, userInfo.id)

  }

  const getUserInfo = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("@token"));
    const user = decodeToken(token)
    console.log(user)
    setUserInfo(user);
  }

  const getUserPhoto = async () => {
    AsyncStorage.getItem("@userPhoto")
      .then(resp => setImageUser(resp))
  }

  const logOut = async () => {
    await AsyncStorage.setItem("@token", JSON.stringify({}));
    setUserInfo({});
    navigation.navigate("Home");
  }

  return(
    <Container>
      <Header 
        title="Perfil"
        back={true}
        navigation={navigation} 
      />
      <View 
        style={{
          flex: 1, 
          gap: 60, 
          paddingTop: 70
        }}
      >
        <View 
          style={{
            alignItems: "center", 
            gap: 15
          }}
        >
          <View>
            {userInfo.userImgUrl ? 
              <Image 
                source={{uri: `http://192.168.0.108:3000/getImg?imgUrl=${userInfo.userImgUrl}`}} 
                style={{
                  width: 100, 
                  height: 100, 
                  borderRadius: 100
                }} 
              /> 
              : 
                <FontAwesome 
                  name="user-circle-o" 
                  size={100} 
                  color="black" 
                />}
          </View>
          <Text 
            style={{
              fontWeight: "600", 
              fontSize: 16
            }}
          >
            Foto de Perfil
          </Text>

          <TouchableOpacity 
            style={{
              backgroundColor: "#FF820E", 
              paddingVertical: 5, 
              paddingHorizontal: 10, 
              borderRadius: 5
            }}
            onPress={teste}
            // onPress={handleImagePicker}
          >

            <Text style={{color: "#fff"}}>
              Nova Foto
            </Text>

          </TouchableOpacity>
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

          <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.btnToggle}>
              <Text 
                style={{
                  color: "#fff", 
                  fontSize: 16, 
                  fontWeight: "600"
                }}
              >
                Trocar Senha
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.btnLogOut} 
              onPress={logOut}
            >
              <Text 
                style={{
                  color: "#fff", 
                  fontSize: 16, 
                  fontWeight: "600"
                }}
              >
                Sair
              </Text>

            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
}

const btn = {
  width: 150,
  alignItems: "center",
  paddingVertical: 10,
  borderRadius: 5,
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 27,
    justifyContent: "flex-start",
    gap: 20
  },
  btnToggle: {
    ...btn,
    backgroundColor: "#FF820E",
  },
  btnLogOut: {
    ...btn,
    backgroundColor: "#E30000"
  },
  containerBtn: {
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});