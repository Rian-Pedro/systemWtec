import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Modal, SafeAreaView } from "react-native"
import SelectionProblem from "../components/SelectionProblem";
import { useState } from "react";
import Container from "../components/utilities/Container";
import Header from "../components/Header";
import { TextInput } from "react-native-gesture-handler";

import * as ImagePicker from "expo-image-picker"

import { decodeToken } from "react-jwt";

import * as Location from "expo-location"

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OSservice from "../services/OS";

export default ({navigation}) => {

  const [alertOpen, setAlertOpen] = useState(false);
  const [textError, setTextError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  
  const [descValue, setDescValue] = useState("");

  const [problem, setProblem] = useState("")
  
  const [OSimage, setOSimage] = useState("")

  const handleGetImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [7 , 4],
      quality: 1
    })

    delete result.cancelled

    if(!result.canceled) {
      setOSimage(result)
    }
  }

  const handleSubmit = async () => {

    const { status } = await Location.requestForegroundPermissionsAsync();

    if(status !== "granted") {
      setTextError("É preciso aceitar para processeguir")
      setAlertOpen(true)
    }

    setAlertOpen(true)
    setIsLoading(true)

    if(!OSimage) {
      setIsLoading(false)
      setTextError("Selecione uma imagem")
      return
    }

    let location = await Location.getCurrentPositionAsync()
    
    const token = await AsyncStorage.getItem("@token")
    const decodedToken = decodeToken(token)
    
    const OSbody = {
      userId: decodedToken.id,
      problemImage: {
        uri: OSimage.assets[0].uri,
        type: "image/png",
        name: `${decodedToken.id}-problemImage.png`
      },
      desc: descValue,
      type: problem,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }

    const os = new OSservice(OSbody)

    const result = await os.createOS()

    if(result.status == 200) {
      setIsLoading(false)
      setTextError(result.message)
      setDescValue("")
      setOSimage(null)
      setProblem("")
    } else {
      setIsLoading(false)
      setTextError(result.message)
    }

    // formData.append("desc", descValue)
    // formData.append("type", problem)
    // formData.append("problemImage", {
    //   uri: OSimage.assets[0].uri,
    //   type: "image/png",
    //   name: `${decodedToken.id}-problemImage.png`
    // })

    // console.log(OSimage)
  }

  
  return (
    <>
      <Container>
        <StatusBar 
          backgroundColor="#FF820E" 
          barStyle={"light-content"}
        />
        <Header 
          title="Criar Ocorrência"
          back={true}
          navigation={navigation}
        />
        <View style={styles.areaForm}>
          <SelectionProblem 
            data={problem}
            title="Tipo do problema"
            set={setProblem}
          />
          <View style={{gap: 12}}>
            <Text style={styles.title}>Descrição do problema:</Text>
            <TextInput 
              style={styles.teste} 
              placeholder="Descreva aqui o problema" 
              multiline={true} 
              numberOfLines={10} 
              textAlignVertical="top"
              value={descValue}
              onChangeText={(e) => setDescValue(e)}
            />
          </View>

          {/* <View style={{gap: 30}}>
            <Text style={styles.titleScan}>
              Para buscar a localização, por favor, faça o escaneamento do QRcode no ponto de luz:
            </Text>
            <TouchableOpacity style={{
              backgroundColor: "#FF820E", 
              flexDirection: "row", 
              width: "70%", 
              gap: 30, 
              padding: 10, 
              alignItems: "center", 
              justifyContent: "center", 
              borderRadius: 5,
              alignSelf: "center"
            }}>
              <Text style={{color: "#fff"}}>Escanear QRcode</Text>
              <AntDesign name="camera" size={25} color="#fff" />
            </TouchableOpacity>
          </View> */}

          <View style={{gap: 20}}>
            <Text 
              style={styles.title}
            >
              Selecione o arquivo de imagem do ponto da ocorrencia, mostrando o problema:
            </Text>
            <View 
              style={{
                justifyContent: "center", 
                alignItems: "center",
                gap: 35
              }}
            >
              {/* <TouchableOpacity style={{
                backgroundColor: "#FF820E", 
                flexDirection: "row", 
                gap: 30, 
                paddingVertical: 10,
                paddingHorizontal: 30, 
                alignItems: "center", 
                justifyContent: "center", 
                borderRadius: 5,
                alignSelf: "center"
              }}>
                <AntDesign name="camera" size={25} color="#fff" />
              </TouchableOpacity> */}

              <TouchableOpacity 
                style={{
                  backgroundColor: "#FF820E", 
                  flexDirection: "row", 
                  gap: 30, 
                  paddingVertical: 10,
                  paddingHorizontal: 30, 
                  alignItems: "center", 
                  justifyContent: "center", 
                  borderRadius: 5,
                  alignSelf: "center",
                  width: "90%"
                }}
                onPress={handleGetImage}
              >
                <FontAwesome name="picture-o" size={25} color="#fff" />
              </TouchableOpacity>

              {OSimage && 
              <View
                style={{
                  width: "51%",
                  height: 100,
                  borderWidth: 1,
                  borderColor: "#FF820E",
                  borderRadius: 5
                }}
                
                >
                <Image 
                  source={{uri: OSimage.assets[0].uri}}
                  style={{
                    height: "100%",
                    width: "auto",
                    borderRadius: 5
                  }}
                />
              </View>}
            </View>

          </View>

          <TouchableOpacity 
            style={{
              backgroundColor: "#000", 
              width: "80%", 
              paddingVertical: 10, 
              borderRadius: 5, 
              alignSelf: "center", 
              marginTop: OSimage ? 25 : 50
            }}
            onPress={handleSubmit}
          >
            <Text style={{color: "#fff", textAlign: "center"}}>Enviar</Text>
          </TouchableOpacity>

        </View>
      </Container>

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
  areaForm: {
    paddingHorizontal: 27,
    gap: 12,
    paddingTop: 50
  },
  teste: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 14,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#FF820E",
    // flexDirection: "row",
    gap: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14, 
  },
  titleScan:{
    fontWeight: "bold",
    fontSize: 14, 
    textAlign: "center"
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