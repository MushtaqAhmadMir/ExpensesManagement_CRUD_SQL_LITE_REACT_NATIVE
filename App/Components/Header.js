import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { windowWidth } from '../Constants/commonStyles'
import colors from '../Constants/colors'

export default function Header({ title = 'My Expenses' }) {
    return (

        <View style={styles.container}>
             <SafeAreaView/>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 76,
        backgroundColor: colors.themeColor,
        width: windowWidth, justifyContent: 'center',
        alignItems: 'center'
    }, title: {
        fontSize: 20,
        fontWeight: '900',
        color: 'white'
    }
})