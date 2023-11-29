import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"

const api = axios.create({
  baseURL: "https://swt-1gtn.onrender.com",
  headers: {
    auth: "dqh2hpGK524&5h"
  }
});

const verifyToken = async (token) => {
  const result = await api.post('/login', {token: token})
  return result.data
}

class UserLogin {
  constructor(body, setAlertOpen, setTextError, navigation, setIsLoading) {
    this.body = body;
    this.setAlertOpen = setAlertOpen;
    this.setTextError = setTextError;
    this.setIsLoading = setIsLoading;
    this.navigation = navigation;
    this.userExists = null;
    this.permission = null;
  }

  static async setUserImg(img, id) {
    const formData = new FormData()

    formData.append("image", {
      uri: img.assets[0].uri,
      type: "image/jpeg",
      name: `${id}-imageUser.jpg`
    })

    api.post(`/imageUser?userId=${id}`, formData, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async login() {
    const get = await api.post("/login", {cpf: this.body.cpf, senha: this.body.pass});

    console.log(get.data)
    console.log(this.body)

    if(get.data.status !== 200) {
      this.setIsLoading(false)
      this.setTextError(get.data.message)
    } else {
      await this.armazena(get.data.token, this.body.remember)
      this.setIsLoading(false)
      this.setAlertOpen(false)
      this.navigation.navigate('Menu')
    }
  }

  async armazena(token, remember) {
    await AsyncStorage.setItem("@token", JSON.stringify(token));
    await AsyncStorage.setItem("@remember", JSON.stringify(remember));
  }

}

class UserRegister extends UserLogin {
  constructor(body, setAlertOpen, setTextError, setIsLoading, navigation) {
    super(body, 
          setAlertOpen, 
          setTextError, 
          navigation);
          
    this.setIsLoading = setIsLoading;
  }

  async register() {
    if(this.emptyCamp()) return;
    if(this.verifyPass()) return;

    const post = await api.post("/registerUser", this.body);
    console.log(post.data)
    if(post.data.status == 201) {
      this.setIsLoading(false);
      this.setAlertOpen(false);
      this.navigation.navigate("Login");
    }
  }

  verifyPass() {
    if(this.body.senha != this.body.confirmPass) {
      this.openErrorCard("As senha não coincidem!")
      return true;
    }
  }
  
  emptyCamp() {
    for(let data in this.body) {
      if(this.body[data].length <= 0) {
        this.openErrorCard("Todos os campos precisam ser preenchidos!")
        return true;  
      }
    }
  }
  
  openErrorCard(msg) {
    this.setIsLoading(false);
    this.setTextError(msg);
  }
}

export default { UserLogin, UserRegister, verifyToken}