import React, { Component } from "react";
import { Text, View, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dia: true,
      pequeno: true,
    };
  }

 
  async componentDidMount() {
    let valores = {}
    await AsyncStorage.getItem("dia").then((value) => {
      valores.pequeno = value;
    });

    await AsyncStorage.getItem("dia").then((value) => {
      valores.dia = value;
    });

    this.setState({ 
      pequeno: valores.pequeno === "true" ? true : false,
      dia: valores.dia === "true" ? true : false 
    });
  }

  async componentDidUpdate(_, prevState) {
    AsyncStorage.setItem("pequeno", this.state.pequeno ? "true" : "false");
    AsyncStorage.setItem("dia", this.state.dia ? "true" : "false");
  }

  render() {
    return (
      <View>
        <View style={{display: "flex",alignItems: "center"}}>
          <Text>Frases</Text>
           <View>
            <Text>Dia</Text>
            <View style={{display: "flex", flexDirection: "row"}}>
            <Switch
              value={this.state.dia} onValueChange={(check) =>
                this.setState({
                  dia: check
                })
              }
            />
            <Text>Pequeno</Text>
            <Switch value={this.state.pequeno}
              onValueChange={(check) =>
                this.setState({
                  pequeno: check
                })
              }
            />
            </View>
          </View>
        </View>
        
        <View style={this.state.dia ? styles.claro : styles.escuro}>
          <Text style={this.state.pequeno ? styles.pequeno : styles.grande}>Bom dia, tem como você parar de comer o pastel? é que eu sou ateu (Italo Senna, O leigo)</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  grande: {
    fontSize: 35,
  },
  pequeno: {
    fontSize: 10
  },
  claro: {
    backgroundColor: "#fff",
  },
  escuro: {
    backgroundColor: "gray",
  }
});

export default App;