import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {Alert, FlatList, Keyboard, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Header from "./src/layout/header";
import TodoItem from "./src/components/todoItem";
import AddTodo from "./src/components/addTodo";

export default function App() {
    const [todos, setTodos] = useState([
        {text: 'Buy some coffee', id: '1'},
    ]);

    const pressHandler = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== id)
        });
    };

    const submitHandler = (text) => {

        if (text.length > 3) {
            setTodos((prevTodos) => {
                return [
                    {text: text, id: Math.random().toString()},
                    ...prevTodos
                ]
            })
        } else {
            Alert.alert('OOPS!', 'Todos must be over 3 chars long!', [
                {text: 'Okay'},
            ]);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <StatusBar style="auto"/>
                <Header/>
                <View style={styles.content}>
                    <AddTodo submitHandler={submitHandler}/>
                    <View style={styles.list}>
                        <FlatList
                            keyExtractor={item => item.id}
                            data={todos}
                            renderItem={({item}) => (
                                <TodoItem item={item} pressHandler={pressHandler}/>
                            )}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 40,
    },
    list: {
        flex: 1,
        marginTop: 20,
    }
});
