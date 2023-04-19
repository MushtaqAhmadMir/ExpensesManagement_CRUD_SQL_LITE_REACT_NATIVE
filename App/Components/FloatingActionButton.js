import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../Constants/colors'
import navigationEnum from '../Constants/navigationEnum'

export default function FloatingActionButton({ navigation, type = 1, onPress }) {
    return (
        <TouchableOpacity onPress={onPress ? onPress : () => navigation.navigate(navigationEnum.EXPENSE_FORM)} style={{
            ...styles.container,
            bottom: type == 2 ? '25%' : '10%',
            right: '5%'
        }}>{
                type == 2 ? <Image style={{ height: 30, width: 30, tintColor: colors.white }} source={{

                    uri: 'https://cdn2.iconfinder.com/data/icons/font-awesome/1792/filter-512.png'
                }} /> : <Text style={{ color: colors.white, fontSize: 19, fontWeight: 'bold' }}>+</Text>
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.themeColor, position: 'absolute',

    }
})