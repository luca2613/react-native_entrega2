import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Dado from '../../dados'
 
export default function Sobre( {route} ){

  return(
    <View style={{margin: 10}}>
      <Text>{route.params?.oi}</Text>
      <Dado data={route.params?.dado}/>
    </View>
  )
}

