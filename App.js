import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import react, { useState } from "react";
import * as Contacts from "expo-contacts";
import * as SMS from "expo-sms";

export default function App() {
   const [contacts, setContacts] = useState([]);

   const getContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
         const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
         });
         if (data.length > 0) {
            setContacts(data);
         }
      }
   };

   return (
      <View style={styles.container}>
         <FlatList
            data={contacts}
            renderItem={({ item }) => (
               <View
                  style={{
                     minHeight: 50,
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "center",
                  }}
               >
                  <Text style={{ paddingRight: 7 }}>{item.name}</Text>
                  <Text>
                     {item.phoneNumbers &&
                        item.phoneNumbers[0] &&
                        item.phoneNumbers[0].number}
                  </Text>
               </View>
            )}
            keyExtractor={(item) => item.id}
         />
         <Button title="Get Contact" onPress={getContacts} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 60,
   },
});
