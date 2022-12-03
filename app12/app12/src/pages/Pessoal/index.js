import React from 'react';
import { View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
 
export default function Pessoal() {
  const navigation = useNavigation();
 return (
   <View style={{margin: 10}}>
     <Text>Luca, 20 anos, fan de naruto 😎</Text>
     
   </View>
  );
}
