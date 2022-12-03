import React from 'react';
import { View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
 
export default function Formacao() {
  const navigation = useNavigation();
 return (
   <View style={{margin: 10}}>
     <Text>Ensino Médio - Colégio Marquês de São Vicente</Text>
     <Text>Curso técnico de Informatica para internet - Etec Aristóteles Ferreira</Text>
      <Text>Cursando Sistemas para internet - Fatec Rubens Lara</Text>
     
   </View>
  );
}
