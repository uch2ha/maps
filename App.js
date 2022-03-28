import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Header } from "react-native-elements";
import { Input, Button, ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";

export default function App() {
    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [productList, setProductList] = useState([]);

    const saveItem = () => {
        setProductList([
            ...productList,
            {
                description: product,
                amount: amount,
            },
        ]);
        setProduct("");
        setAmount("");
    };

    const deleteItem = (index) => {
        productList.splice(index, 1);
        setProduct([...productList]);
    };

    const renderItem = ({ item, index }) => (
        <ListItem bottomDivider>
            <ListItem.Content style={{ paddingLeft: 5 }}>
                <ListItem.Title>{item.description}</ListItem.Title>
                <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon
                type="material"
                color="red"
                name="delete"
                onPress={() => deleteItem(index)}
            />
        </ListItem>
    );

    return (
        <SafeAreaView>
            <Header
                leftComponent={{ icon: "menu" }}
                centerComponent={{
                    text: "SHOPPING LIST",
                    style: {},
                }}
                rightComponent={{ icon: "home" }}
            />
            <View style={{ margin: 10 }}>
                <Input
                    placeholder="Enter product name"
                    label="PRODUCT"
                    onChangeText={(item) => setProduct(item)}
                    value={product}
                />
                <Input
                    placeholder="Enter amount"
                    label="AMOUNT"
                    onChangeText={(amount) => setAmount(amount)}
                    value={amount}
                />
                <Button
                    raisedicon={{ name: "save" }}
                    onPress={saveItem}
                    title="SAVE"
                />
            </View>
            <View>
                <FlatList
                    data={productList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
