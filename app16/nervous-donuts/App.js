import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TextInput, Button, FlatList, Pressable, } from "react-native";
import * as SQLite from "expo-sqlite";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const db = SQLite.openDatabase("compra.db");
 
const App = () => {
  const [nome, setNome] = useState("");
  const [qtd, setQtd] = useState("");
  const [compra, setCompra] = useState([]);
 
  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS compra (id INTEGER PRIMARY KEY AUTOINCREMENT,qtd INT, nome VARCHAR(20))`,
        [],
        (sqlTxn, res) => {
          console.log("Tabela criada com sucesso!");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  };
 
  const postCompra = () => {
    if (!nome || !qtd)  {
      alert("Preencha todos os campos");
      return false;
    }
 
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO compra (qtd,nome) VALUES (?,?)`,
        [qtd,nome ],
        (sqlTxn, res) => {
          console.log(`${nome} compra adicionada com sucesso!`);
          getCompras();
          setQtd("");
          setNome("")
        },
        error => {
          console.log("Erro ao inserir uma Tarefa " + error.message);
        },
      );
    });
  };
 
  const getCompras = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM compra`,
        [],
        (sqlTxn, res) => {
          console.log("compra lidas com sucesso!");
          let len = res.rows.length;
 
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id,qtd: item.qtd, nome: item.nome });
            }
 
            setCompra(results);
          }
        },
        error => {
          console.log("Erro ao obter compra " + error.message);
        },
      );
    });
  };

    const deleteTarefa = (id) => {
 
    db.transaction(txn => {
      txn.executeSql(
        `DELETE FROM compra WHERE id = ?`,
        [id],
        (sqlTxn, res) => {
          console.log(`${nome} compra excluida!`);
          getCompras();
        },
        error => {
          console.log("Erro ao excluir uma compra " + error.message);
        },
      );
    });
  };
 
  const renderTarefa = ({ item }) => {
    return (
      <View style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
      }}>
        <Text>{item.nome}</Text>
        <Text style={{ marginLeft:5, marginRight:5 }}>({item.qtd})</Text>
        <Pressable onPress={() => deleteTarefa(item.id)}>
          <FontAwesome name="trash" size={20} color="#eb4034" />
        </Pressable>
      </View>
    );
  };
 
  useEffect(() => {
    createTables();
    getCompras();
  }, []);

  
 
  return (
    <View>
      <StatusBar backgroundColor="#222" />

        <TextInput
        placeholder="Qtd"
        value={qtd}
        onChangeText={setQtd}
        style={{ marginHorizontal: 8, marginTop: 50 }}
      />
 
      <TextInput
        placeholder="Produto"
        value={nome}
        onChangeText={setNome}
        style={{ marginHorizontal: 8, marginTop: 50 }}
      />
      <Button title="+" onPress={postCompra} />
 
      <FlatList
        data={compra}
        renderItem={renderTarefa}
        key={t => t.id}
      />
    </View>
  );
};
 
export default App;
