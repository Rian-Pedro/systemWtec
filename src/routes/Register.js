import { View, Text, Image, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from "react-native";

import Input from "../components/input";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import Selection from "../components/Selection";
import SelectionMuni from "../components/SelectionMuni";

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import InputTel from "../components/InputTel";
import userApi from "../services/User";
import CpfInput from "../components/inputs/CpfInput";
import PassInput from "../components/inputs/PassInput";

const boxStyle = {
  borderRadius: 1, 
  borderWidth: 1, 
  width: 18,  
  height: 18, 
  borderColor: "#FF820E"
}

const innerBoxStyle = {
  borderRadius: 1,
  width: 18,
  height: 18
}

const icons = {
  user: <AntDesign name="user" size={25} color="#FF820E" />,
  email: <Zocial name="email" size={25} color="#FF820E" />,
  cpf: <FontAwesome name="id-card" size={25} color="#FF820E" />,
  tel: <FontAwesome name="phone" size={25} color="#FF820E" />,
  lock: <FontAwesome name="lock" size={25} color="#FF820E" />
}

export default function Register({ navigation }) {

  const [checkBoxState, setCheckBoxState] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    cpf: "",
    UF: "",
    municio: "",
    telefone: "",
    pass: "",
  });

  const [showSelection, setShowSelection] = useState(false);

  return (
    <>
      <StatusBar backgroundColor="#F1F1F1" />
      <ScrollView>
      
      <View style={styles.container}>
        <View style={styles.containerBtn} onTouchStart={() => navigation.goBack()}>
          <AntDesign name="back" size={25} color="#fff" />
        </View>
        
        <Image 
          source={require("../../assets/logo2.png")} 
          resizeMode="contain" 
          style={{
            width: 300, 
            marginTop: 25
          }} 
        />

        <Text style={styles.welcome}>Bem-vindo(a) de volta!</Text>

        <View style={styles.containerForm}>
          <Input 
            name="Nome" 
            nameObj="name"
            placeholder="Digite aqui o seu nome"
            set={setUser}
            data={user}
            icon={icons.user}
          />

          <Input 
            name="E-mail"
            nameObj="email"
            placeholder="Digite aqui o seu e-mail"
            set={setUser}
            data={user}
            icon={icons.email}
          />

          <CpfInput 
            set={setUser}
            data={user}
            nomeObj="cpf"
            icon={icons.cpf}
          />

          <Selection 
            set={setUser}
            data={user}
            nomeObj={"UF"}
            title="Estado"
          />
          
          <SelectionMuni 
            set={setUser}
            data={user}
            nomeObj="municipio"
            title="Municipio"
          />

          <InputTel 
            set={setUser}
            data={user}
            icon={icons.tel}
            title="Telefone"
            nomeObj="telefone"
          />

          <PassInput 
            data={user}
            set={setUser}
            nomeObj="pass"
          />
          
          <Input 
            name="Confirmar Senha"
            placeholder="************"
            type="pass"
          />

          <View style={{
              flexDirection: "row", 
              justifyContent: "space-between", 
              marginTop: -6
            }}>

            <BouncyCheckbox 
              innerIconStyle={boxStyle} 
              iconStyle={innerBoxStyle} 
              fillColor="#FF820E" 
              text="Lembrar de mim?" 
              textStyle={{
                textDecorationLine: "none", 
                fontSize: 16, 
                fontWeight: "600"
              }}
              isChecked={checkBoxState}
              onPress={() => {
                setCheckBoxState(!checkBoxState);
                console.log(checkBoxState);
              }}
            />

            <Text style={styles.forget}>Esqueceu a senha?</Text>

          </View>
          
          <TouchableOpacity style={styles.btn} onPress={() => {
            
          }} >
            <Text 
              style={{
                textAlign: "center", 
                fontSize: 18, 
                fontWeight: "bold", 
                color: "#fff"
              }}> Entrar </Text>
          </TouchableOpacity>
        </View>
        <Text>
          Ainda não possui uma conta? <Text style={{
            color: "#FF820E", 
            textDecorationLine: "underline"
          }}>
            Crie uma agora</Text>
        </Text>
        
      </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: "100vh",
    gap: 85,
    backgroundColor: "#F1F1F1",
    paddingBottom: 100
  },
  btn: {
    paddingHorizontal: 123,
    paddingVertical: 15,
    backgroundColor: "#FF820E",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 50
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
  },
  containerForm: {
    width: "80%",
    gap: 20,
  },
  forget: {
    color: "#FF820E",
    textDecorationLine: "underline",
    fontWeight: "600",
    fontSize: 16
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
    marginBottom: -35,
    marginTop: -20
  }
});
