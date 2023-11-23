import { StyleSheet, View, Text, ScrollView } from "react-native"
import Container from "../components/utilities/Container"
import Header from "../components/Header"
import OScard from "../components/OScard"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { decodeToken } from "react-jwt"
import OSservice from "../services/OS"

const ShowOS = ({navigation}) => {

  const [osList, setOsList] = useState([])

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("@token")
      const decodedToken = decodeToken(token)

      const list = await OSservice.getOS(decodedToken.id)
      setOsList(list)
    })()
  }, [])

  return (
    <Container>
      <Header 
        back={true} 
        navigation={navigation} 
        title="Ocorrências"
      />

      <ScrollView style={styles.osContainer}>
        {/* <OScard 
          ende='R. Vinte de Agosto - Caxangá, Recife - PE'
          desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
          status='pendente'
          nameStatus='Pendente'
          first={true}
        />
         */}

         {osList.length > 0 ? 
          osList.map((os, index) => (
            <OScard 
              desc={os.desc}
              status={os.status}
              type={os.type}
              imgUrl={os.imgUrl}
              first={index == 0}
              date={os.dt_post}
              hour={os.time_post}
              key={os.id}
            />
          )) 
          : 
          <View style={{
            alignSelf: "center",
            marginTop: "80%"
          }}>
            <Text 
              style={{
                textAlign: "center",
              }}
            >
              Adicione uma OS primeiro
            </Text>
          </View>
          }

      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  osContainer: {
    flex: 1,
  }
})

export default ShowOS