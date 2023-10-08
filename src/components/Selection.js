import { StyleSheet, View, Text, ScrollView, ScrollViewBase, FlatList, TouchableOpacity, Modal, SafeAreaView } from "react-native";

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import api from "../services/ibgeApi";
import { useEffect, useState } from "react";

export default function({ set, data, nomeObj, title }) {

  const [ufList, setUfList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api.get()
      .then((response) => {
        setUfList(response.data);
        console.log(ufList)
      })
  }, []);

  return (
    <>
      <Text style={styles.title}>{title}:</Text>
      <TouchableOpacity style={styles.inputSelect} onPress={() => {
        setModalVisible(true);
      }}>
        <Feather name="map-pin" size={25} color="#FF820E" />
        <Text style={{color: "#848484", fontSize: 15}}>{!data.estado ? "Selecione o estado" : data.estado}</Text>
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
            {ufList.map(uf => (
              <TouchableOpacity 
                key={uf.id} 
                style={styles.containerSelection} 
                onPress={() => {
                  set({...data, [nomeObj]: uf.sigla})
                  setModalVisible(false);
                }}
              >
                <Text style={{color: "#fff"}}>{uf.nome}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>

      </Modal>

      
    </>
  );
};

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