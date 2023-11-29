import { StyleSheet, View, Image, Text } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';

const OScard = ({type, desc, status, first, imgUrl, date, hour}) => {
  console.log(imgUrl)
  return (
    <View style={first ? styles.cardFirst : styles.card}>
      <Image source={{uri: `https://swt-1gtn.onrender.com/getImg?imgUrl=${imgUrl}`}} style={styles.img} resizeMethod="resize"/>
      <View style={styles[status == 1 ? 'P' : status == 2 ? 'A' : 'C']}>
        <View style={styles.textInfo}>
          <View style={styles.cardIcon}>
            <AntDesign name="questioncircle" size={24} color="#FF820E" />
          </View>
          <Text style={styles.text}>{type}</Text>
        </View>

        <View style={styles.textInfo}>
          <View style={styles.cardIcon}>
            <FontAwesome name="file-text" size={25} color="#FF820E" />
          </View>
          <Text style={styles.text}>{desc}</Text>
        </View>

        <View style={styles.textInfo}>
          <View style={styles.cardIcon}>
            <FontAwesome name="bar-chart" size={25} color="#FF820E" />
          </View>
          <Text style={styles.text}>
            {status == 1 ? "Pendente" : status == 2 ? "Andamento" : "Concluido"}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            flexDirection: "row",
            gap: 20
          }}
        >
          <Text>{date}</Text>
          <Text>{hour}</Text>
        </View>
      </View>
    </View>
  )
}

const info = {
  padding: 16,
  gap: 20
}

const styles = StyleSheet.create({
  P: {
    ...info,
    backgroundColor: "#FEFFD8"
  },
  C: {
    ...info,
    backgroundColor: "#E4FFCA"
  },
  A: {
    ...info, 
    backgroundColor: "#FFDEDE"
  },
  card: {
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#FF820E",
    marginBottom: 50,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    overflow: "hidden",
    maxWidth: "80%"
  },
  img: {
    maxHeight: 200,
    width: "100",
    height: 300
  },
  textInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center"
  },
  cardIcon: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    width: "80%"
  },
  cardFirst: {
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#FF820E",
    marginBottom: 50,
    marginTop: 50,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    overflow: "hidden",
    maxWidth: "80%"
  }
})

export default OScard