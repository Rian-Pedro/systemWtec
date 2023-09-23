import { useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native"
import MaskInput from "react-native-mask-input";

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export default ({ set, type, name, placeholder }) => {

  const [inputValue, setInputValue] = useState("");

  const [maskPass, setMaskPass] = useState("");
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  return (
    <View style={{gap: 14}}>
      <Text style={styles.title}>{name}:</Text>

      {!type &&
        <TextInput 
          style={styles.input} 
          value={inputValue} 
          onChangeText={(e) => {
            setInputValue(e) 
            set(e)
          }} 
          placeholder={placeholder} />
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
            // underlineColorAndroid="#FF820E"
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

const styles = StyleSheet.create({
  inputContainer: {
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
  },
  input: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14
  }
});