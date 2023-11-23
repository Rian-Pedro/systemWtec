import { useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native"
import MaskInput from "react-native-mask-input";

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default ({ set, type, name, placeholder, data, nameObj, icon, keyboard }) => {

  const [inputValue, setInputValue] = useState("");
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  return (
    <View style={{gap: 14}}>
      <Text style={styles.title}>{name}:</Text>

      {!type &&
        <View style={styles.inputContainer}>
          {icon}
          <TextInput 
            style={styles.input} 
            value={inputValue} 
            onChangeText={(e) => {
              setInputValue(e);
              set({...data, [nameObj]: e});
              console.log(data, name);
            }} 
            placeholder={placeholder} 
            keyboardType={keyboard == "numeric" ? "numeric" : "default"}
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