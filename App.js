import {
   StyleSheet,
   Text,
   SafeAreaView,
   Button,
   FlatList,
   TextInput,
   View,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

export default function App() {
   const [amount, setAmount] = useState("");
   const [title, setTitle] = useState("");
   const [shopList, setShopList] = useState([]);

   const db = SQLite.openDatabase("shopListdb.db");

   console.log("====================================");
   console.log(shopList);
   console.log("====================================");

   useEffect(() => {
      db.transaction(
         (tx) => {
            tx.executeSql(
               "create table if not exists shopList (id integer primary key not null, amount int, title text);"
            );
         },
         null,
         updateList
      );
   }, []);

   const updateList = () => {
      db.transaction(
         (tx) => {
            tx.executeSql("select * from shopList;", [], (_, { rows }) =>
               setShopList(rows._array)
            );
         },
         null,
         null
      );
   };

   const saveItem = () => {
      db.transaction(
         (tx) => {
            tx.executeSql(
               "insert into shopList (amount, title) values (?, ?);",
               [parseInt(amount), title]
            );
         },
         null,
         updateList
      );
   };

   const deleteItem = (id) => {
      db.transaction(
         (tx) => {
            tx.executeSql("delete from shopList where id = ?;", [id]);
         },
         null,
         updateList
      );
   };

   return (
      <SafeAreaView style={styles.container}>
         <TextInput
            placeholder="Title"
            onChangeText={(title) => setTitle(title)}
            value={title}
         />
         <TextInput
            placeholder="Amount"
            keyboardType="numeric"
            onChangeText={(amount) => setAmount(amount)}
            value={amount}
         />
         <Button onPress={() => saveItem()} title="Save" />
         <FlatList
            style={{ marginLeft: "5%" }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
               <View style={styles.listcontainer}>
                  <Text>
                     {item.title},{item.amount}{" "}
                  </Text>
                  <Text
                     style={{
                        paddingLeft: 3,
                        color: "red",
                     }}
                     onPress={() => deleteItem(item.id)}
                  >
                     done
                  </Text>
               </View>
            )}
            data={shopList}
         />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 50,
   },
   listcontainer: {
      padding: 5,
      display: "flex",
      flexDirection: "row",
   },
});
