import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default class TarefaComponente extends Component {

  estiloStatus(){
    if (this.props.status === 'Pendente') {
      return{
      backgroundColor: 'red',
      height: 25,
      width: 100,
      margin: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      }
      
    } else {
        return{
      backgroundColor: 'green',
      height: 25,
      width: 100,
      margin: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      }
    }
  }  

  render(){
    return(
      <View style={estilo.caixa}>
        <View style={estilo.corpo}>
          
          <Text>Prazo: {this.props.prazo} dia(s)</Text>          
          <Text>Prioridade: {this.props.prioridade}</Text>          
          <Text>Descrição: {this.props.descricao}</Text>
          
          
        </View>
        <View style={estilo.corpoBotao}>
            <View style={this.estiloStatus()}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.status}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => this.props.atualizar(this.props.status, this.props.id)}                           
              style={estilo.botao}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>Concluir</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.props.excluir(this.props.id)}
              style={estilo.botao}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>EXCLUIR</Text>
            </TouchableOpacity>
        </View>        
      </View>
    )
  }
}

const estilo = StyleSheet.create({
  titulo: {
    fontSize: 30,
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  corpo: {
    margin:15   
  },  
  input: {
    borderWidth: 1,
    width: 300,
    height: 35,
    margin: 5,
    borderColor: 'white',
    borderRadius: 5,
  },
  input2: {
    borderWidth: 1,
    width: 300,
    height: 70,
    margin: 5,
    borderColor: 'white',
    borderRadius: 5,
  },  
  botao: {
    backgroundColor: 'lightgrey',
    height: 25,
    width: 100,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  corpoBotao: {    
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  caixa:{
    backgroundColor: 'darkgrey',
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 30,
  },  
})

