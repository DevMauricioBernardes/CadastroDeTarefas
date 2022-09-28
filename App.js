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
import Tarefa from './src/Models/Tarefa'
import TarefaComponente from './src/Componentes/TarefaComponente';
import TarefaDatabase from './src/Database/TarefaDatabase';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      prazo: 0,
      prioridade: '',
      descricao: '',
      status: '',      
      lista: []
    }
    this.Listar();
  }

  Listar = () => {
    const banco = new TarefaDatabase();
    banco.Listar().then(
      listaCompleta => {
        this.setState({lista: listaCompleta})
      }
    )
  }

  Cadastrar = (prazo, prioridade, descricao, status) =>{    
    const novaTarefa = new Tarefa(prazo, prioridade, descricao, status='Pendente')
    const banco = new TarefaDatabase()
    banco.Inserir(novaTarefa)
    this.Listar()
  }  

  Atualizar = (status, id) => {    
    const banco = new TarefaDatabase()
    if (status == 'Concluído') {
      status= 'Pendente'     
    } else {
      status= 'Concluído'      
    } 
    banco.Atualizar(status, id)    
    this.Listar()

  }

  Excluir = (id) => {    
    const banco = new TarefaDatabase()
    banco.Remover(id)
    this.Listar()
  }

  render(){
    return(
      <ScrollView style={{backgroundColor: 'grey'}}>
        <View style={estilo.corpo}>
          <Text style={estilo.titulo}>Cadastro de tarefas</Text>
          <Text style={estilo.sub}>Prazo</Text>
          <TextInput onChangeText={(valor) => {this.setState({prazo: valor})}} placeholder=' Dias' style={estilo.input}></TextInput>
          <Text style={estilo.sub}>Prioridade</Text>
          <TextInput onChangeText={(valor) => {this.setState({prioridade: valor})}}placeholder=' Baixa - Média - Alta' style={estilo.input}></TextInput>
          <Text style={estilo.sub}>Descrição</Text>
          <TextInput onChangeText={(valor) => {this.setState({descricao: valor})}} style={estilo.input2}></TextInput>
        </View>
        <View style={estilo.corpoBotao}>
          <TouchableOpacity 
            onPress={() => this.Cadastrar(this.state.prazo, this.state.prioridade, this.state.descricao, this.state.status)}
            style={estilo.botao}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={estilo.titulo}>Tarefas</Text>
          {
            this.state.lista.map( elementoLista => (
              <TarefaComponente 
                id={elementoLista.id}
                tarefa={elementoLista.tarefa}
                prazo={elementoLista.prazo}
                prioridade={elementoLista.prioridade}
                descricao={elementoLista.descricao}
                status={elementoLista.status}
                txtBotao={elementoLista.txtBotao}
                atualizar={this.Atualizar}
                excluir={this.Excluir} />
            ))
          }
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',    
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
    flexDirection: 'column'  
  },
  sub: {

  },
  botao: {
    backgroundColor: 'lightgrey',
    height: 25,
    width: 150,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  corpoBotao: {
    marginEnd: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
})

