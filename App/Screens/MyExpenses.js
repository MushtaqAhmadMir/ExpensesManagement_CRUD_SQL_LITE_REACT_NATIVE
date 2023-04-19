import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Button, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from '../Components/Header'
import FloatingActionButton from '../Components/FloatingActionButton'
import { windowHeight, windowWidth } from '../Constants/commonStyles'
import colors from '../Constants/colors'
import moment from 'moment'
import SQLite from 'react-native-sqlite-storage'
import strings from '../Constants/strings'
import { addExpenses, createTable, deleteExpenses, getAllExpenses, getFilterData, updateExpenses } from '../Helper/heplerFunctions'
import navigationEnum from '../Constants/navigationEnum'
import { types } from '../Constants/constants'
export default function MyExpenses({ navigation }) {
  const [items, setItems] = useState([])
  const [isFilter, setisFilter] = useState(false)
  console.log()

  var db = SQLite.openDatabase(
    { name: 'mainDB', location: 'default' }
    , () => { console.log('success') },
    error => { console.log(error) })


  useEffect(() => {
    getData()
  }, [])




  const getData = () => {
    getAllExpenses(db, cb => {
      console.log(cb)
      setItems(cb)
      console.log(JSON.parse(cb))
    })
  }

  useEffect(() => {

    const focus = navigation.addListener('focus', () => {
      getData()
    })

  }, [navigation])


  const renderExpenses = ({ index, item }) => {
    console.log(item
    )
    return (
      <View style={styles.container}>
        <View>
          <Text numberOfLines={1} style={{ fontSize: 18, color: colors.black, width: windowWidth / 2.4 }}>{item?.Name}</Text>
          <Text>{item?.Type}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text numberOfLines={2} style={{ width: windowWidth / 4, fontSize: 18, color: colors.black, alignSelf: 'flex-end' }}>₹{item?.Amount}</Text>
            <Text>{moment().format('DD MMM YYYY')}</Text>
          </View>

          <TouchableOpacity onPress={
            () => navigation.navigate(navigationEnum.EXPENSE_FORM, { data: item, from: navigationEnum.MY_EXPENSES })

          }>
            <Image style={{ tintColor: colors.themeColor, height: 28, width: 28, marginHorizontal: 16 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1827/1827951.png' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteExpenses(item?.ID, db, cb => {
            if (cb) {
              getData()
            }
          })} style={{}}>
            <Image style={{ tintColor: colors.themeColor, height: 28, width: 28 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1345/1345874.png' }} />
          </TouchableOpacity>



        </View>

      </View>
    )

  }
  return (
    <View style={{ flex: 1 }}>
      <Header />
      {/* <Button onPress={()=>addExpenses('','','',db)} title='add'/> */}
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={items}
          renderItem={renderExpenses}
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
                <Text>No Expenses Found</Text>
              </View>
            )
          }}
        />
        <FloatingActionButton onPress={() => setisFilter(!isFilter)} type={2} navigation={navigation} />
        <FloatingActionButton navigation={navigation} />
      </View>
      <Modal visible={isFilter} transparent >
        <View style={{ height: windowHeight / 2, backgroundColor: 'white', marginTop: windowHeight / 2 }} >
          {
            types.map(function (e) {
              return (
                <TouchableOpacity onPress={() => {
                  getFilterData(e, db, cb => {
                    if (cb) {
                      console.log(cb)
                      setItems(cb)
                    }

                  })
                  setisFilter(false)

                }

                } style={{ marginVertical: 8, paddingVertical: 10, width: windowWidth, paddingHorizontal: 20, }}>
                  <Text>{'✔  ' + e}</Text>
                </TouchableOpacity>
              )
            })
          }
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Button title='Cancel' color={colors.themeColor
            } onPress={() => {
              getData()
              setisFilter(false)
            }} />

          </View>
        </View>

      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

    height: 80, width: windowWidth,
    marginVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row', justifyContent: 'space-between'

  }
})