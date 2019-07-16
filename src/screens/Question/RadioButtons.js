import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";

const RadioButtons = props => {
    {
        props.options.map((item, index) => {
            return(
                <View key={index} style={styles.buttonContainer}>
                    <Text>{item.text}</Text>
                    <TouchableOpacity style={styles.circle} />
                </View>
            )
        })
    }
}
const styles = {
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#794F9B',
    },
}
export default RadioButtons