import { useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native"
import MaskInput from "react-native-mask-input";

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default ({ set, type, name, placeholder, data, nameObj, setShow }) => {

  const [inputValue, setInputValue] = useState("");

  const [maskPass, setMaskPass] = useState("");
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  return (
    <View style={{gap: 14}}>
      <Text style={styles.title}>{name}:</Text>

      {!type &&
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            value={inputValue} 
            onChangeText={(e) => {
              setInputValue(e);
              set({...data, [nameObj]: e});
              console.log(data, name);
            }} 
            placeholder={placeholder} 
          />
        </View>
      }

      {type == "selectUF" &&
        <View style={styles.inputSelect} onTouchStart={() => {
          console.log("teste")
          setShow(true)
        }}>
          <Feather name="map-pin" size={25} color="#FF820E" />
          <Text style={{color: "#848484", fontSize: 15}}>Selecione o estado</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#FF820E" style={{flex: 1, textAlign: "right"}} />
        </View>
      }

      {type == "selectMuni" &&
        <View style={styles.inputSelect}>
          <Ionicons name="ios-home" size={25} color="#FF820E" />
          <Text style={{color: "#848484", fontSize: 15}}>Selecione o município</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#FF820E" style={{flex: 1, textAlign: "right"}} />
        </View>
      }

      {type == "pass" &&
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={25} color="#FF820E" />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setInputValue(e);
            }}
            secureTextEntry={!isVisiblePass}
            placeholder={placeholder}
            cursorColor="#FF820E"
            selectionColor="#FF820E"
          />
          <View onTouchStart={() => setIsVisiblePass(!isVisiblePass)}>
            {isVisiblePass ? 
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
          </View>
        </View>
      }

      {type == "cpf" && 
        <View style={styles.inputContainer}>
          <AntDesign name="user" size={25} color="#FF820E" />
          <MaskInput 
            style={styles.input}
            value={inputValue}
            onChangeText={(masked, unmasked, ob) => {
              setInputValue(unmasked);
              set(masked);
            }}
            maxLength={14}
            placeholder="Digite aqui o seu cpf"
            obfuscationCharacter="none"
            mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
            keyboardType="numeric"
            cursorColor="#FF820E"
            selectionColor="#FF820E"
          />
        </View>
      }

    </View>
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
  }
});