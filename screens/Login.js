import {View, Text, TextInput, Button, Box, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {globalStyles} from '../utils/GlobalStyles';
import CustomButton from '../utils/CustomButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import SQLite from 'react-native-sqlite-2';
import {useItem} from '../utils/ItemsProvider';

const db = SQLite.openDatabase('main.db', '1.0', '', 1);

export default function Login({navigation: {navigate}}) {
  const [data, setData] = useItem();
  let name = true;
  let pw = true;

  return (
    <View style={globalStyles.container}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image
          style={{
            justifyContent: 'center',
            flex: 1,
            width: null,
          }}
          source={require('.././utils/images/ghoshak.png')}
        />
      </View>

      <Formik
        initialValues={{username: 'vazz', password: '123123'}}
        onSubmit={async values => {
          if (values.username.length === 0 || values.password.length === 0) {
            Alert.alert('Warning!', 'Fill the required fields');
          } else {
            if (values.username.length <= 3) {
              name = false;
            } else name = true;
            if (values.password.length < 6) {
              pw = false;
            } else pw = true;
            if (name && pw) {
              console.log('navigated');
              try {
                // await AsyncStorage.getItem(`UserData{${values.username}}`).then(
                //   value => {
                //     if (value !== null) {
                //       let user = JSON.parse(value);
                //       if (user.password === values.password) {
                //         navigate('Home', {username: values.username});
                //         values.username = '';
                //         values.password = '';
                //       } else Alert.alert('Oops', 'incorrect password');
                //     } else
                //       Alert.alert('Oops', 'No Account found, try to register');
                //   },
                // );

                db.transaction(function (tx) {
                  tx.executeSql(
                    `SELECT Password FROM "Users" WHERE Name = "${values.username}"`,
                    [],
                    function (tx, res) {
                      console.log('res', res.rows.length);
                      if (res.rows.length !== 0) {
                        if (res.rows.item(0).Password === values.password) {
                          navigate('Home', {username: values.username});
                          console.log('Old User', res.rows.item(0));
                          values.username = '';
                          values.password = '';
                        } else Alert.alert('Oops', 'Incorrect password');
                      } else {
                        Alert.alert(
                          'Oops',
                          'No Account found, try to register',
                        );
                      }
                      console.log('res', res.rows.item(0).Password);
                    },
                  );
                  console.log('transacttion gonna end');
                });
              } catch (error) {
                console.log('couldnt find username', error);
              }

              // table creation and variable updation
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
                  tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Items(ID INTEGER PRIMARY KEY NOT NULL, itemName VARCHAR(30), rate VARCHAR(10), MRP VARCHAR(30) ,Qty VARCHAR(10), units VARCHAR(10), incExc VARCHAR(20), subTotal VARCHAR(30))',
                    [],
                  );
                  // tx.executeSql('DROP TABLE IF EXISTS DraftDetails', []);
                  tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS DraftDetails(ID INTEGER PRIMARY KEY NOT NULL, createdAt VARCHAR(30), num VARCHAR(13), name VARCHAR(30) ,itemCount VARCHAR(10), amount VARCHAR(10), items BLOB)',
                    [],
                  );
                  // tx.executeSql('DROP TABLE IF EXISTS DraftItems', []);
                  tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS DraftItems(ID INTEGER PRIMARY KEY NOT NULL, DraftId INTEGER, itemName VARCHAR(30), rate VARCHAR(10), MRP VARCHAR(30) ,Qty VARCHAR(10), units VARCHAR(10), incExc VARCHAR(20), subTotal VARCHAR(30))',
                    [],
                  );

                  // tx.executeSql(
                  //   `SELECT Name FROM "Users" WHERE Name = "${route.params.username}"`,
                  //   [],
                  //   function (tx, res) {
                  //     console.log('res', res);
                  //     if (res.rows.item(0).Name === route.params.username) {
                  //       console.log('Old User', res.rows.item(0));
                  //       setName(route.params.username);
                  //     }
                  //   },
                  // );

                  // tx.executeSql('DROP TABLE IF EXISTS Items', []);
                  tx.executeSql(
                    `SELECT * FROM "Items" `,
                    [],
                    function (tx, res) {
                      console.log('items', res.rows);
                      console.log('items res', res.rows.item);
                      console.log('items before for loop :', data.items);
                      for (let i = 0; i < res.rows.length; i++) {
                        // console.log(res.rows.item(i));
                        setData(prev => ({
                          ...prev,
                          items: [...prev.items, res.rows.item(i)],
                        }));
                      }
                    },
                  );

                  tx.executeSql(
                    `SELECT * FROM "DraftDetails" `,
                    [],
                    function (tx, res) {
                      console.log('Drafts', res.rows);
                      console.log('Drafts res', res.rows.item);
                      console.log('drafts before for loop :', data.drafts);
                      for (let i = 0; i < res.rows.length; i++) {
                        // console.log(res.rows.item(i));
                        setData(prev => ({
                          ...prev,
                          drafts: [...prev.drafts, res.rows.item(i)],
                        }));
                      }
                    },
                  );
                });
              } catch (error) {
                console.log(error);
              }
            }
          }
          console.log(values);
        }}>
        {props => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 110,
            }}>
            <View>
              <Text
                style={[
                  {
                    justifyContent: 'flex-start',
                    marginBottom: 30,
                    fontSize: 40,
                    fontWeight: 'bold',
                  },
                  globalStyles.text,
                ]}>
                ADMIN LOGIN
              </Text>
            </View>
            <TextInput
              style={globalStyles.input}
              placeholderTextColor="#747d8c"
              placeholder="Username"
              onChangeText={props.handleChange('username')}
              value={props.values.username}
              textContentType={'username'}
            />
            {!name ? (
              <Text style={globalStyles.errorText}>username is too short</Text>
            ) : null}
            <TextInput
              style={globalStyles.input}
              placeholderTextColor="#747d8c"
              placeholder="Password"
              onChangeText={props.handleChange('password')}
              value={props.values.password}
              keyboardType={'numeric'}
              textContentType={'password'}
              onSubmitEditing={props.handleSubmit}
            />
            {!pw ? (
              <Text style={globalStyles.errorText}>
                password must contain atleast 6 characters
              </Text>
            ) : null}
            <CustomButton
              title="Log In"
              color="#2ed573"
              onPressFunction={props.handleSubmit}
            />

            <View style={{flexDirection: 'row'}}>
              <Text style={globalStyles.text}>Don't have an account </Text>
              <Text
                style={{color: 'blue'}}
                onPress={() => {
                  navigate('Register');
                }}>
                Register
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
