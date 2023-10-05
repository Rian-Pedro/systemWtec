import { StyleSheet, View, Text, TouchableOpacity } from "react-native"

export default ({ navigation }) => {

  return (
    <View>
      <Text>Menu</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({});