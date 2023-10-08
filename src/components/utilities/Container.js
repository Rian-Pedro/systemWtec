import { View, StyleSheet } from "react-native"

export default ({ children }) => {
  return <View style={styles.container}>
    {children}
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1F1",
    flex: 1
  }
});