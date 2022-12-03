import React, { Component } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import api from "./src/services/api";
import Ionicons from "react-native-vector-icons/Ionicons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cep: "",
      detalhes: [],
    };
    this.getDetails = this.getDetails.bind(this);
  }

  async getDetails() {
    let cep = this.state.cep;
    
    if (!cep) {
      alert("Digite o cep");
      return false;
    }

    const response = await api.get(`ws/${cep}/json`);
    this.setState({
      detalhes: response.data,
    });
  }

  render() {
    
      return (
      <View>
        <View style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
           <Text>Cep x Endereço:</Text>
        </View>
        <View style={{display: "flex", flexDirection: "row"}}>
          <TextInput style={{width: "200px", border: "1px solid black"}}
            placeholder="Digite o CEP..."
            onChangeText={(cep) => this.setState({ cep: cep })}
          />

          <Pressable
            onPress={this.getDetails}
            style={{backgroundColor: "green" , width: "35px", height: "35px", alignItems: "center", justifyContent: "center"}}
          >
            <Ionicons name="checkmark-outline"color="#00000" />
          </Pressable>
        </View>
        
        <View>
          <Text>CEP: {this.state.detalhes.cep}</Text>
          <Text>Logradouro: {this.state.detalhes.logradouro}</Text>
          <Text>Bairro: {this.state.detalhes.bairro}</Text>
          <Text>Cidade: {this.state.detalhes.localidade}</Text>
          <Text>Estado: {this.state.detalhes.uf}</Text>
        </View>
      </View>
    );
    }
    
  
}
export default App;