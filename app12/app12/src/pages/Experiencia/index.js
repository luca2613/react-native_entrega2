import React from 'react';
import { View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
 
export default function Experiencia() {
  const navigation = useNavigation();
 return (
   <View style={{margin: 10}}>
     <Text>Sem Experiencia :(</Text>
     
   </View>
  );
}
