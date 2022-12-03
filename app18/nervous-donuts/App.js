import React, { Component } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import api from "./src/services/api";
import Ionicons from "react-native-vector-icons/Ionicons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      detalhes: [],
    };
    this.getDetails = this.getDetails.bind(this);
  }

  async getDetails() {
    let login = this.state.login;
    
    if (!login) {
      alert("Digite o login");
      return false;
    }

    const response = await api.get(login);
    this.setState({
      detalhes: response.data,
    });
  }

  render() {
    
      return (
      <View>
      <View style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
           <Text>Perfil dos Devs</Text>
        </View>
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Image
          source={{ uri: this.state.detalhes.avatar_url }}
          style={{ width: 300, height: 300}}
        />
        </View>
        <View style={{display: "flex", flexDirection: "row"}}>
          <TextInput style={{width: "200px", border: "1px solid black"}}
            placeholder="Digite o login git..."
            onChangeText={(login) => this.setState({ login: login })}
          />

          <Pressable
            onPress={this.getDetails}
            style={{backgroundColor: "green" , width: "35px", height: "35px", alignItems: "center", justifyContent: "center"}}
          >
            <Ionicons name="checkmark-outline"color="#00000" />
          </Pressable>
        </View>
        
        <View>
          <Text>Id: {this.state.detalhes.id}</Text>
          <Text>Nome: {this.state.detalhes.login}</Text>
          <Text>Repositórios: {this.state.detalhes.public_repos}</Text>
          <Text>Criado em: {this.state.detalhes.created_at}</Text>
          <Text>Seguidores: {this.state.detalhes.followers}</Text>
          <Text>Seguindo: {this.state.detalhes.following}</Text>
        </View>
      </View>
    );
    }
    
  
}
export default App;