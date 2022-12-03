import React, {Component} from 'react';
import {View, Text} from 'react-native';

// import {styles} from './styles'
 
class Dado extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render(){
      return(
        <View>
          <Text>Dados informados</Text>
          <Text>Nome: {this.props.data.nome} </Text>
          <Text>Idade: {this.props.data.idade} </Text>
          <Text>Sexo: {this.props.data.sexo} </Text>
          <Text>Escolaridade: {this.props.data.escolaridade} </Text>
          <Text>Limite: {this.props.data.slider} </Text>
          <Text>Brasileiro: {this.props.data.isBrazilian ? 'Sim' : 'Não'} </Text>
        </View>
      );
    }
  }
 
export default Dado;