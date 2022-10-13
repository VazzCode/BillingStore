import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../utils/GlobalStyles';
import {SearchBar} from 'react-native-elements';
import CustomButton from '../../utils/CustomButton';
import {Option} from 'react-native-dropdown';
import {
  Select,
  CheckIcon,
  NativeBaseProvider,
  Center,
  ScrollView,
} from 'native-base';

function DashBoard({navigation}) {
  const [date, setDate] = useState('Today');

  const [rows, setRows] = useState(270);

  const [records, setRecords] = useState([]);

  const [focus, setFocus] = useState(false);

  return (
    <View style={{backgroundColor: '#f1f2f6', flex: 1}}>
      <ScrollView>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={globalStyles.heading}>DashBoard</Text>
          <Select
            backgroundColor={'white'}
            selectedValue={date}
            width="200"
            accessibilityLabel="Set Timeline"
            _selectedItem={{
              bg: '#ff4757',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => setDate(itemValue)}>
            <Select.Item label="Today" value="Today" />
            <Select.Item label="Last 7 days" value="7" />
            <Select.Item label="Last 30 days" value="30" />
            <Select.Item label="Custom Date" value="custom" />
          </Select>
        </View>
        <View
          style={{
            margin: 20,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={[
              globalStyles.card,
              {borderColor: '#ff4757', borderWidth: 2},
            ]}>
            <Text
              style={[
                globalStyles.text,
                {
                  fontSize: 20,
                },
              ]}>
              Total Sales
            </Text>
          </View>
          <View style={globalStyles.card}>
            <Text
              style={[
                globalStyles.text,
                {
                  fontSize: 20,
                },
              ]}>
              Number of Customers
            </Text>
          </View>
          <View style={globalStyles.card}>
            <Text
              style={[
                globalStyles.text,
                {
                  fontSize: 20,
                },
              ]}>
              Number of Bills
            </Text>
          </View>
          <View style={globalStyles.card}>
            <Text
              style={[
                globalStyles.text,
                {
                  fontSize: 20,
                },
              ]}>
              Total Sales Return
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <CustomButton
            style={{
              alignSelf: 'flex-end',
              marginRight: 50,
              shadowColor: 'black',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.2,
            }}
            title="Generate Bill"
            color="#ff4757"
            onPressFunction={() => navigation.navigate('Billing')}
          />
          {/* Recent Bills Card */}
          <View
            style={{
              marginHorizontal: 50,
              padding: 0,
              minHeight: '40%',
              backgroundColor: 'white',
              borderRadius: 5,
              // alignItems: 'center',
              //flexDirection: 'row',
              shadowColor: 'black',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 30,
                paddingBottom: -30,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 20,
                  fontStyle: 'italic',
                  marginLeft: -10,
                  marginTop: -10,
                }}>
                Recent Bills
              </Text>
              <TextInput
                placeholderTextColor={'lightgrey'}
                placeholder="Search"
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  borderColor: 'white',
                }}
                width={200}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text
                style={{
                  padding: 16,
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 15,
                  fontStyle: 'italic',
                }}>
                Invoice Number
              </Text>
              <Text
                style={{
                  padding: 16,
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 15,
                  fontStyle: 'italic',
                }}>
                Date
              </Text>
              <Text
                style={{
                  padding: 16,
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 15,
                  fontStyle: 'italic',
                }}>
                Customer Number
              </Text>
              <Text
                style={{
                  padding: 16,
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 15,
                  fontStyle: 'italic',
                }}>
                Customer Name
              </Text>
              <Text
                style={{
                  padding: 16,
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 15,
                  fontStyle: 'italic',
                }}>
                Bill Amount
              </Text>
              <Text
                style={{
                  padding: 16,
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 15,
                  fontStyle: 'italic',
                }}>
                Actions
              </Text>
            </View>
            <View
              style={{
                width: null,
                height: rows,
                borderColor: 'lightgrey',
                borderTopWidth: 0.8,
                borderBottomWidth: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {records.length !== 0 ? (
                <Text
                  style={{
                    padding: 16,
                    color: 'black',
                    fontWeight: '500',
                    fontSize: 15,
                    fontStyle: 'italic',
                  }}>
                  there is records
                </Text>
              ) : (
                <Text
                  style={{
                    padding: 16,
                    color: 'black',
                    fontWeight: '500',
                    fontSize: 15,
                    fontStyle: 'italic',
                  }}>
                  No records to display
                </Text>
              )}
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                margin: 10,
              }}>
              <Select
                backgroundColor={'white'}
                selectedValue={rows}
                width="110"
                accessibilityLabel="Set Rows"
                _selectedItem={{
                  bg: '#ff4757',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setRows(itemValue)}>
                <Select.Item label="5 rows" value={270} />
                <Select.Item label="10 rows" value={540} />
                <Select.Item label="20 rows" value={1080} />
              </Select>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ({navigation}) => {
  return (
    <NativeBaseProvider>
      <DashBoard navigation={navigation} />
    </NativeBaseProvider>
  );
};
