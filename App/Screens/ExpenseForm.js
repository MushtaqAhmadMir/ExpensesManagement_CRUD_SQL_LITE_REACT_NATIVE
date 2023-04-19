import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { windowWidth } from '../Constants/commonStyles'
import colors from '../Constants/colors'
import { addExpenses, createTable, updateExpenses } from '../Helper/heplerFunctions'
import SQLite from 'react-native-sqlite-storage'
import navigationEnum from '../Constants/navigationEnum'
import { types } from '../Constants/constants'
export default function ExpenseForm({ navigation, route }) {
  console.log(route)

  var db = SQLite.openDatabase(
    { name: 'mainDB', location: 'default' }
    , () => { console.log('success') },
    error => { console.log(error) })

  const fromEdit = route?.params?.from == navigationEnum.MY_EXPENSES
  console.log();

  const [amount, setAmount] = useState(fromEdit? route?.params?.data?.Amount?.toString(): '')
  const [type, setType] = useState(fromEdit ? route?.params?.data?.Type : '')
  const [desc, setDescription] = useState(fromEdit ? route?.params?.data?.Name : '')
 

  useEffect(() => {
    createTable(db)
  }, [])

  const [isTypeVisible, setIsTypeVisible] = useState(false)

  const isValid = () => {

    //simple isEmpty validaion
    if (amount !== '' && type !== '' && desc !== '') {
      return true
    }

    return false
  }


  const onAdd = () => {
    if (isValid()) {
      addExpenses(desc, amount, type, db, cb => {
        if (cb) {
          navigation.goBack()
        }
      })
      //make Api call
    } else {
      Alert.alert('All fields are required')
    }
  }

  const onEdit = () => {
    if (isValid()) {
      updateExpenses(route?.params?.data?.ID, desc, amount, type, db, cb => {
        if (cb) {
          navigation.goBack()
        }
      })
      //make Api call
    } else {
      Alert.alert('All fields are required')
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Header title='What did you spend Today ?' />
      <View style={{ alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          placeholder='Name of Article'
          value={desc}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder='Amount'
          keyboardType='number-pad'
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity onPress={() => {
          Keyboard.dismiss()
          setIsTypeVisible(!isTypeVisible)
        }}>
          <TextInput
            style={styles.input}
            placeholder='Spend Type'
            value={type}
            editable={false}
          />
        </TouchableOpacity>
        {
          isTypeVisible && <ScrollView style={{ paddingTop: 20, }}>
            {
              types.map(function (e) {
                return (
                  <TouchableOpacity onPress={() => {

                    setIsTypeVisible(false)
                    setType(e)
                  }

                  } style={{ marginVertical: 8, paddingVertical: 10, width: windowWidth, paddingHorizontal: 20, }}>
                    <Text>{'✔  ' + e}</Text>
                  </TouchableOpacity>
                )
              })
            }


          </ScrollView>
        }
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 40, paddingHorizontal: 20 }}>
        <Button
          onPress={fromEdit ? onEdit : onAdd}
          color={colors.themeColor}
          title={fromEdit ? 'Edit Expenses' : 'Add Expense'} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: windowWidth / 1.1,
    borderBottomWidth: 1,
    marginTop: 10, color: colors.black, paddingBottom: 0
  }
})