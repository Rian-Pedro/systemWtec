import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Modal, SafeAreaView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CpfInput from "../components/inputs/CpfInput"
import PassInput from "../components/inputs/PassInput";
import User from "../services/User";
import { Link } from "@react-navigation/native";

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
  cpf: <FontAwesome name="id-card" size={25} color="#FF820E" />,
  lock: <FontAwesome name="lock" size={25} color="#FF820E" />
}

export default function Login({ navigation }) {
  
  const [checkBoxState, setCheckBoxState] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [textError, setTextError] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const { UserLogin } = User;

  const [user, setUser] = useState({
    cpf: "",
    pass: "",
    remember: false
  });

  useEffect(() => {
    getToken()

    return
  }, [])

  const getToken = async () => {
    try {
      const userToken = JSON.parse(await AsyncStorage.getItem("@token"))
      const userRemember = JSON.parse(await AsyncStorage.getItem("@remember"))

      if(userRemember) {
        const resultVerify = await User.verifyToken(userToken)
        
        if(resultVerify.status === 200) {
          navigation.navigate('Menu')
        } else {
          setAlertOpen(true)
          setTextError(resultVerify.message)
        }
      } else {
        await AsyncStorage.removeItem("@token")
      }
      
    } catch(err) {

    }
  }

  return (
    <>
      <StatusBar backgroundColor="#F1F1F1" />
      <View style={styles.container}>
        <View 
          style={styles.containerBtn} 
          onTouchStart={() => navigation.goBack()}
        >
          <AntDesign 
            name="back" 
            size={25} 
            color="#fff" 
          />
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

          <CpfInput 
            data={user}
            nomeObj="cpf"
            set={setUser}
            icon={icons.cpf}
          />

          <PassInput 
            data={user}
            set={setUser}
            nomeObj="pass"
            title="Senha"
          />

          <View 
            style={{
              flexDirection: "row", 
              justifyContent: "space-between", 
              marginTop: -6
            }}
          >
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
              isChecked={user.remember}
              onPress={() => {
                setUser({...user, remember: !user.remember});
                console.log(checkBoxState);
              }}
            />
            <Text style={styles.forget}>Esqueceu a senha?</Text>
          </View>

          <TouchableOpacity 
            style={styles.btn} 
            onPress={() => {
              setIsLoading(true);
              setAlertOpen(true);
              const login = new UserLogin(user, 
                                          setAlertOpen, 
                                          setTextError, 
                                          navigation, 
                                          setIsLoading);
              login.login();
            }} 
          >
            <Text 
              style={{
                textAlign: "center", 
                fontSize: 18, 
                fontWeight: "bold", 
                color: "#fff"
              }}
            > 
              Entrar 
            </Text>

          </TouchableOpacity>
        </View>

        <Text>
          Ainda não possui uma conta? 
            <Link 
              to="/Register" 
              style={{
                color: "#FF820E", 
                textDecorationLine: "underline"
              }}
            >
              Crie uma agora
            </Link>
        </Text>
      </View>

      <Modal
        visible={alertOpen}
        transparent={true}
        animationType="fade"
      > 
          <SafeAreaView style={styles.alert}>

            {isLoading && 
              <View style={styles.alertCard}>
                <Text>Aguarde</Text>
              </View>
            }

            {!isLoading &&
              <View style={styles.alertCard}>
                <Text>{textError}</Text>
                <TouchableOpacity 
                  style={{
                    backgroundColor: "#FF820E", 
                    paddingVertical: 5, 
                    paddingHorizontal: 20, 
                    borderRadius: 5
                  }}
                  onPress={() => setAlertOpen(false)}
                >
                  <Text style={{color: "#fff"}}>Ok</Text>
                </TouchableOpacity>
              </View>  
            }
          </SafeAreaView>

      </Modal>

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
    backgroundColor: "#F1F1F1"
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
  },
  alert: {
    backgroundColor: "rgba(0, 0, 0, 0.28)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  alertCard: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    gap: 20,
    borderRadius: 10
  }
});
