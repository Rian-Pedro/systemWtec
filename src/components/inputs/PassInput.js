import { StyleSheet, View, Text, TextInput,TouchableOpacity } from "react-native"

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { useState } from "react";

export default ({set, data, nomeObj, title}) => {

  const [isVisible, setIsVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showX, setShowX] = useState(false);

  return (
    <>
      <Text style={styles.title}>{title}:</Text>
      <View style={styles.inputContainer}>
        {showError && 
          <View style={styles.cardError}>
            <Text style={{width: "70%", padding: 8}}>A senha precisa possuir no minimo 6 caracteres</Text>
            <TouchableOpacity style={styles.xCard} onPress={() => setShowError(false)}>
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        }
          <MaterialIcons name="lock" size={25} color="#FF820E" />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              if(e.length < 6 && !showX) {
                setShowError(true);
              } else {
                setShowError(false);
                setShowX(false);
              }

              if(e.length < 6) setShowX(true);
              set({...data, [nomeObj]: e});
            }}
            secureTextEntry={!isVisible}
            placeholder="************"
            cursorColor="#FF820E"
            selectionColor="#FF820E"
          />

          {showX && <Feather name="x" size={20} color="#E30000" style={{alignSelf: "center"}} />}
          
          <TouchableOpacity style={{flexDirection: "row"}} onPress={() => setIsVisible(!isVisible)}>
            {isVisible ? 
              <Ionicons 
                name="eye" 
                size={25} 
                color="#FF820E" 
                style={{top: 2.5}} 
              /> : 
              <Ionicons 
                name="eye-off" 
                size={25} 
                color="#FF820E" 
                style={{top: 2.5}} 
              />
            }
          </TouchableOpacity>
        </View>
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
  inputContainer: {
    ...padrao,
  },
  inputSelect: {
    ...padrao,
  },
  input: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14
  },
  cardError: {
    width: "70%",
    position: "absolute",
    top: -60,
    right: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 5
  },
  xCard: {
    width: "20%", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 8, 
    backgroundColor: "#E30000", 
    borderBottomEndRadius: 5, 
    borderTopEndRadius: 5
  }
});