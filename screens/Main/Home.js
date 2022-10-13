/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyles} from '../../utils/GlobalStyles';
import {Icon} from '@rneui/themed';
import {Button} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Login';
import Billing from './Billing/Billing';
import DashBoard from './DashBoard';
import SQLite from 'react-native-sqlite-2';
import {useItem} from '../../utils/ItemsProvider';
import ShopItems from './ShopItems/ShopItems';

const db = SQLite.openDatabase('main.db', '1.0', '', 4);

export default function Home({route, navigation}) {
  const [name, setName] = useState('');
  const [button, setButton] = useState('black');

  useEffect(() => {
    console.log('home useeffect ran');
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log('username', name);
  }, [name]);

  const [data, setData] = useItem();

  const getData = () => {
    try {
      // await AsyncStorage.getItem(`UserData{${route.params.username}}`).then(
      //   value => {
      //     if (value != null) {
      //       let user = JSON.parse(value);
      //       setName(user.name);
      //       console.log('user:', value);
      //     }
      //   },
      // );

      db.transaction(function (tx) {
        //   tx.executeSql(
        //     'CREATE TABLE IF NOT EXISTS Items(ID INTEGER PRIMARY KEY NOT NULL, itemName VARCHAR(30), rate VARCHAR(10), MRP VARCHAR(30) ,Qty VARCHAR(10), units VARCHAR(10), incExc VARCHAR(20), subTotal VARCHAR(30))',
        //     [],
        //   );
        // tx.executeSql('DROP TABLE IF EXISTS Drafts', []);
        // tx.executeSql(
        //   'CREATE TABLE IF NOT EXISTS Drafts(ID INTEGER PRIMARY KEY NOT NULL, CreatedAt VARCHAR(30), MobileNo VARCHAR(13), Name VARCHAR(30) ,ItemCount VARCHAR(10), Amount VARCHAR(10), Items VARCHAR(100))',
        //   [],
        // );

        tx.executeSql(
          `SELECT Name FROM "Users" WHERE Name = "${route.params.username}"`,
          [],
          function (tx, res) {
            console.log('res', res);
            if (res.rows.item(0).Name === route.params.username) {
              console.log('Old User', res.rows.item(0));
              setName(route.params.username);
            }
          },
        );

        // tx.executeSql('DROP TABLE IF EXISTS Items', []);
        // tx.executeSql(`SELECT * FROM "Items" `, [], function (tx, res) {
        //   console.log('items', res.rows);
        //   console.log('items res', res.rows.item);
        //   console.log('items before for loop :', data.items);
        //   for (let i = 0; i < res.rows.length; i++) {
        //     // console.log(res.rows.item(i));
        //     setData(prev => ({
        //       ...prev,
        //       items: [...prev.items, res.rows.item(i)],
        //     }));
        //   }
        // });

        // tx.executeSql(`SELECT * FROM "Drafts" `, [], function (tx, res) {
        //   console.log('Drafts', res.rows);
        //   console.log('Drafts res', res.rows.item);
        //   console.log('drafts before for loop :', data.drafts);
        //   for (let i = 0; i < res.rows.length; i++) {
        //     // console.log(res.rows.item(i));
        //     setData(prev => ({
        //       ...prev,
        //       drafts: [...prev.drafts, res.rows.item(i)],
        //     }));
        //   }
        // });
      });
    } catch (error) {
      console.log(error);
    }

    // const keys = await AsyncStorage.getAllKeys();
    // const entries = await AsyncStorage.multiGet(keys);
    // console.log('entries', entries);
  };

  const Stack = createStackNavigator();

  return (
    <View style={[globalStyles.container, {}]}>
      {/* SIDE BAR */}
      <View
        style={{
          backgroundColor: 'white',
          shadowColor: 'lightgrey',
          shadowOffset: {width: 2, height: 0},
          shadowOpacity: 0.1,
          padding: 10,
          marginRight: 5,
        }}>
        <Text style={{color: 'black', fontSize: 12}}>{name}</Text>
        <Button
          style={{marginTop: 200, marginBottom: 20}}
          icon={require('../../utils/images/blocks.png')}
          textColor={'black'}
          onPress={() => {
            navigation.navigate('DashBoard');
            console.log('DashBoard pressed');
          }}
        />
        <Button
          style={{marginTop: 20, marginBottom: 20, pading: 50}}
          icon={require('../../utils/images/shopItemsne2.png')}
          textColor={'black'}
          onPress={() => {
            navigation.navigate('ShopItems');
            console.log('Barcode pressed');
          }}
        />
      </View>
      {/* MAIN PAGE */}
      <Stack.Navigator
        initialRouteName="ShopItems"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Billing"
          component={Billing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShopItems"
          component={ShopItems}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </View>
  );
}
