import axios from "axios"

const api = axios.create({
  baseURL: "https://swt-1gtn.onrender.com",
  headers: {
    auth: "dqh2hpGK524&5h",
  }
})

class OSservice {
  constructor(body) {
    this.body = body
  }

  async createOS() {
    const formData = new FormData();

    for(const key in this.body) {
      if(!this.body[key]) return {status: 401, message: "Todos os campos devem ser preenchidos"}
      if(typeof this.body[key] == 'undefined') this.body[key] = ""
      formData.append(key, this.body[key]) 
    }

    try {
      const result = await api.post("/newOS", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      return result.data
    } catch(err) {
      console.log(err)
    }
  }

  static async getOS(userId) {
    const result = await api.get(`/getOS?userId=${userId}`)
    return result.data.reverse()
  }
}

export default OSservice