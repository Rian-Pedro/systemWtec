import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"

const api = axios.create({
  baseURL: "https://api-gip-061089ba42d7.herokuapp.com/users",
  headers: {
    Authorization: "Basic amNhOmpjYQ=="
  }
});

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

  async login() {
    const get = await api.get("");

    if(get.data.length > 0) {
      get.data.forEach(user => {
        this.compare("O usúario com esse CPF não foi encontrado!", 
                     user.cpf, 
                     this.body.cpf);
  
        if(this.userExists) this.compare("A senha de usúario está incorreta!", 
                                         user.senha, 
                                         this.body.pass);
  
        if(this.permission) {
          this.setAlertOpen(false);
          this.armazena(user);
          this.navigation.navigate("Menu");
        }
  
      });
    } else {
      this.permission = false;
      this.setTextError("O usúario com esse CPF não foi encontrado!");
      this.setIsLoading(false);
    }
  }

  async armazena(user) {
    await AsyncStorage.setItem("@userInfo", JSON.stringify(user));
  }

  compare(msg, userData, userThis) {
    if(userData == userThis) {
      this.permission = true;
    } else {
      this.permission = false;
      this.setTextError(msg);
      this.setIsLoading(false);
    }
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

    const post = await api.post("", this.body);

    if(post.status == 201) {
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

const teste = 0;

export default { UserLogin, UserRegister}