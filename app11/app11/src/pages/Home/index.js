import React, { Component } from 'react';
import { View, Pressable, Text, TextInput, Switch} from 'react-native';
import { styles } from '../../../style';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
 
 
export default class App extends Component {
  
 constructor(props) {
   super(props);
   this.state = {
     dado: {},
     nome: '',
     Idade: 0,
     sexo: 0,
     escolaridade: 0,
     slider: 0,
     isBrazilian: false,
     sexos: [
      {nome: 'Feminino'},
      {nome: 'Masculino'},
    ],
    escolaridades: [
      {nome: 'Ensino Fundamental'},
      {nome: 'Ensino Médio'},
      {nome: 'Ensino superior'},
    ],
   }
     this.recebeDado = this.recebeDado.bind(this); 
 }

  recebeDado() {
  let { nome, idade, sexo, escolaridade, slider, isBrazilian } = this.state;
  sexo = this.state.sexos[sexo].nome;
  escolaridade = this.state.escolaridades[escolaridade].nome;
  this.setState({
    dado: {nome, idade, sexo, escolaridade, slider, isBrazilian}
  })
   this.props.navigation.navigate('Sobre', {dado: {
     nome: nome,
     idade: idade,
     sexo: sexo,
     escolaridade: escolaridade,
     slider: slider,
     isBrazilian: isBrazilian
   }})
 }


 render(){
  const { navigation } = this.props;
 
  let sexoItem = this.state.sexos.map( (valor, chave) => {
    return <Picker.Item key={chave} value={chave} label={valor.nome} />
  })

  let escolaridadeItem = this.state.escolaridades.map((valor, chave) => {
    return <Picker.Item key={chave} value={chave} label={valor.nome} />
  })
 
  return (
    <View style={{margin: 30 }}>
      <Text style={styles.titulo}>Abertura de conta</Text>

      <View style={styles.box}>
        <Text>Nome:</Text>
        <TextInput style={styles.inputN} onChangeText={ (texto) => this.setState({nome: texto})}/>
      </View>

      <View style={styles.box}>
        <Text>Idade:</Text>
        <TextInput style={styles.inputI} onChangeText={ (texto) => this.setState({idade: texto})}/>
      </View>
 
      <View style={styles.box}>
        <Text>Sexo: </Text>
        <Picker
        selectedValue={this.state.sexo}
        onValueChange={ (itemValue, itemIndex) => this.setState({sexo: itemValue}) }
        >
  
        {sexoItem}
  
        </Picker>
       
      </View>
      <View style={styles.box}>
        <Picker
          selectedValue={this.state.escolaridade}
          onValueChange={ (itemValue, itemIndex) => this.setState({escolaridade: itemValue}) }
          >
    
          {escolaridadeItem}
  
        </Picker>
    
      </View>
      <View style={styles.box}>
        <Text>Limite: </Text>
        <Slider
        minimumValue={0}
        step={1}
        maximumValue={200}
        onValueChange={ (valorSelecionado) => this.setState({slider: valorSelecionado})}
        value={this.state.slider}
        />
  
        <Text style={{textAlign: 'center', fontSize: 30}}>
          {this.state.slider}
        </Text>

      </View>
      <View style={styles.box}>
        <Text>Brasileiro: </Text>
        <Switch styles={{justifyContent:'top'}}
        value={this.state.isBrazilian}
        onValueChange={ (valorSwitch) => this.setState({isBrazilian: valorSwitch})}
        />
  
      </View>
      <Pressable style={styles.btn}  onPress={this.recebeDado}>
          <Text>Confirmar</Text>
      </Pressable>
      
    </View>
   );
 }
}
 