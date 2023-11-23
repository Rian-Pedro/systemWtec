import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import MaskInput from "react-native-mask-input";

export default function({icon, set, data, title, nomeObj}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Text style={styles.title}>{title}:</Text>
      <View style={styles.inputContainer}>
          {icon}
          <MaskInput 
            style={styles.input}
            value={inputValue}
            onChangeText={(masked) => {
              setInputValue(masked);
              set({...data, [nomeObj]: masked});
              console.log(data);
            }}
            maxLength={15}
            placeholder="(xx) xxxxx-xxxx"
            obfuscationCharacter="none"
            mask={["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
            keyboardType="numeric"
            cursorColor="#FF820E"
            selectionColor="#FF820E"
          />
      </View>
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