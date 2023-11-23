import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import MaskInput from "react-native-mask-input";
import { useState } from "react";

import { Feather } from '@expo/vector-icons';

export default ({icon, set, data, nomeObj}) => {
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [showX, setShowX] = useState(false);

  return (
    <>
      <Text style={styles.title}>CPF:</Text>
      
      <View style={styles.inputContainer}>
      {icon}
      {showError && 
        <View style={styles.cardError}>
          <Text 
            style={{
              width: "70%", 
              padding: 8
            }}
          >
            O CPF precisa conter 14 caracteres.
          </Text>

          <TouchableOpacity 
            style={styles.xCard} 
            onPress={() => setShowError(false)}
          >
            <Feather 
              name="x" 
              size={24} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
      }
      <MaskInput 
        style={styles.input}
        value={inputValue}
        onChangeText={(masked, unmasked, ob) => {
          if(masked.length < 14 && !showX) {
            setShowError(true);
          } else {
            setShowError(false);
            setShowX(false);
          }

          if(masked.length < 14) setShowX(true);
          setInputValue(unmasked);
          set({...data, [nomeObj]: unmasked});
        }}
        maxLength={14}
        placeholder="Digite aqui o seu cpf"
        obfuscationCharacter="none"
        mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
        keyboardType="numeric"
        cursorColor="#FF820E"
        selectionColor="#FF820E"
      />
      {showX && 
        <Feather 
          name="x" 
          size={20} 
          color="#E30000" 
          style={{
            alignSelf: "center"
          }} 
        />}
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
    // justifyContent: "space-between"
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