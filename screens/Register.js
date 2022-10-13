/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import {View, Text, TextInput, Button, Box, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {globalStyles} from '../utils/GlobalStyles';
import CustomButton from '../utils/CustomButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('main.db', '1.0', '', 1);

// import PouchDB from 'pouchdb-react-native';
// import SQLite from 'react-native-sqlite-2';
// import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

// const SQLiteAdapter = SQLiteAdapterFactory(SQLite);
// PouchDB.plugin(SQLiteAdapter);
// const db = new PouchDB('main.db', {adapter: 'react-native-sqlite'});

export default function Register({navigation: {navigate}}) {
  let name = true;
  let pw = true;
  const [page, setPage] = useState(true);

  useEffect(() => {
    createTable();
    console.log('table created');
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      // tx.executeSql('DROP TABLE IF EXISTS Users', []);
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users(ID INTEGER PRIMARY KEY NOT NULL, Name VARCHAR(30), Password VARCHAR(30), Email VARCHAR(30))',
        [],
      );
    });
  };

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
        initialValues={{username: '', password: '', email: ''}}
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
                var user = [values.username, values.password, values.email];
                // await AsyncStorage.setItem(
                //   `UserData{${values.username}}`,
                //   JSON.stringify(user),
                // );

                db.transaction(function (tx) {
                  tx.executeSql(
                    `INSERT INTO Users (Name,Password,Email) VALUES ("${user[0]}","${user[1]}","${user[2]}")`,
                    [],
                    function (tx, res) {
                      console.log('reg res', res);
                    },
                  );
                  console.log('values inserted');
                });
                navigate('Home', {username: values.username});
                values.username = '';
                values.password = '';
                values.email = '';
              } catch (error) {
                console.log('Error in setItem: ', error);
              }
            }
          }
          //console.log(values);
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
                style={[{marginBottom: 30, fontSize: 20}, globalStyles.text]}>
                Welcome!
              </Text>
              <Text
                style={[{marginBottom: 30, fontSize: 40}, globalStyles.text]}>
                Gets Started!
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
            />
            {!pw ? (
              <Text style={globalStyles.errorText}>
                password must contain atleast 6 characters
              </Text>
            ) : null}
            <TextInput
              style={globalStyles.input}
              placeholderTextColor="#747d8c"
              placeholder="Email"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
              onSubmitEditing={props.handleSubmit}
            />
            <CustomButton
              title="Register"
              color="#2ed573"
              onPressFunction={props.handleSubmit}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={globalStyles.text}>Already have an account </Text>
              <Text
                style={{color: 'blue'}}
                onPress={() => {
                  navigate('Login');
                }}>
                Sign in
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
