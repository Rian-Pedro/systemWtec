import { useState } from "react"
import { Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default ({title, data, set}) => {

  const [modalVisible, setModalVisible] = useState(false)

  const problems = ["Lâmpada Queimada", "Poste Apagado"]

  return (
    <>
      <Text style={styles.title}>{title}:</Text>
      <TouchableOpacity
        style={styles.inputSelect}
        onPress={() => setModalVisible(true)}
      >
        <Entypo 
          name="box" 
          size={25} 
          color="#FF820E" 
        />

        <Text 
          style={{
            color: "#848484", 
            fontSize: 15
          }}
        >
          {!data ? "Selecione o problema" : data}
        </Text>

        <MaterialIcons 
          name="keyboard-arrow-down" 
          size={24} color="#FF820E" 
          style={{
            flex: 1, 
            textAlign: "right"
          }} 
        />

      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{backgroundColor: "#FF820E", flex: 1}}>
          <ScrollView>
            <TouchableOpacity
              style={styles.containerBtn}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign 
                name="back" 
                size={25} 
                color="#FF820E" 
              />
            </TouchableOpacity>

            {problems.map((problem, index) => (
              <TouchableOpacity
                key={index}
                style={styles.containerSelection}
                onPress={() => {
                  set(problem)
                  setModalVisible(false);
                }}
              >
                <Text style={{color:"#fff"}}>{problem}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>

      </Modal>
    </>
  )
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