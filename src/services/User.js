import axios from "axios";

const api = axios.create({
  baseURL: "https://api-gip-061089ba42d7.herokuapp.com/users",
  headers: {
    Authorization: "Basic amNhOmpjYQ=="
  }
});

class User {
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

    get.data.forEach(user => {
      this.compareCPF(user.cpf);

      if(this.userExists) this.comparePass(user.senha);

      if(this.permission) {
        this.setAlertOpen(false);
        this.navigation.navigate("Menu");
      }

    });
  }

  comparePass(userPass) {
    console.log(userPass, this.body.pass)
    if(userPass == this.body.pass) {
      this.permission = true;
    } else {
      this.permission = false;
      this.setTextError("A senha de usúario está incorreta!");
      this.setIsLoading(false);
    }
  }

  compareCPF(userCpf) {
    if(userCpf == this.body.cpf) {
      this.userExists = true;
    } else {
      this.userExists = false;
      this.setTextError("O usúario com esse CPF não foi encontrado!")
      this.setIsLoading(false);
    }
  }
}

export default User