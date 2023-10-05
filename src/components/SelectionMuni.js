import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";

import api from "../services/ibgeApi";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function({set, data, nomeObj, title}) {

  const [muniList, setMuniList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [UF, setUF] = useState("");

  useEffect(() => {
    
    if(data.UF) {
      api.get(`/${data.UF}/municipios`)
      .then((response) => {
        setMuniList(response.data)
        console.log(muniList, data.UF, response.data);
      });
    }

  }, [data.UF]);

  return (
    <>
      <Text style={styles.title}>{title}:</Text>

      <TouchableOpacity style={styles.inputSelect} onPress={() => {
        setModalVisible(true);
      }}>
        <Ionicons name="ios-home" size={25} color="#FF820E" />
        <Text style={{color: "#848484", fontSize: 15}}>{!data.municipio ? "Selecione o municipio" : data.municipio}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="#FF820E" style={{flex: 1, textAlign: "right"}} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >

          <SafeAreaView style={{backgroundColor: "#FF820E"}}>
            <ScrollView>
              <View 
              style={styles.containerBtn} 
              onTouchStart={() => setModalVisible(false)}
              >
              <AntDesign name="back" size={25} color="#FF820E" />
            </View>

            {muniList.length > 0 ?
            muniList.map(municipio => (
              <TouchableOpacity
                // key={municipio.id}
                style={styles.containerSelection}
                onPress={() => {
                  set({...data, [nomeObj]: municipio.nome});
                  setModalVisible(false);
                }}
                key={municipio.id}
              >
                <Text style={{color: "#fff"}}>{municipio.nome}</Text>
              </TouchableOpacity>
            ))
            : <Text>Selecione primeiro o seu estado</Text>}
            </ScrollView>
          </SafeAreaView>
        
      </Modal>
    </>
  );

}

const padrao = {
  paddingVertical: 6,
  paddingHorizontal: 10,
  backgroundColor: "#fff",
  fontSize: 14,
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  borderBottomWidth: 1,
  borderBottomColor: "#FF820E",
  flexDirection: "row",
  gap: 15
}

const styles = StyleSheet.create({
  inputSelect: {
    ...padrao,
    // justifyContent: "space-between"
  },
  selectList: {
    position: "relative",
    maxHeight: 300,
    overflow: "scroll",
    flex: 1,
    backgroundColor: "#fff"
  },
  containerBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    position: "relative",
    top: 20,
    left: 20,
    marginBottom: 35
  },
  containerSelection: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#fff",
    padding: 20,
    alignItems: "center",
    // backgroundColor: "#fff",
    marginBottom: 15,
    alignSelf: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 14
  }
});