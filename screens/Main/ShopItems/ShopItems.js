/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Dimensions,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import {
  CheckIcon,
  FormControl,
  Input,
  NativeBaseProvider,
  ScrollView,
  Select,
} from 'native-base';
import {globalStyles} from '../../../utils/GlobalStyles';
import {useItem} from '../../../utils/ItemsProvider';
import CustomButton, {MyText} from '../../../utils/CustomButton';
import AddItemModal from './AddItems';

// import DraggableFlatList, {
//   ScaleDecorator,
//   RenderItemParams,
// } from 'react-native-draggable-flatlist';

function ShopItems() {
  const [barCodeNo, setBarCodeNo] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  const [rows, setRows] = useState(270);

  // const [data, setData] = useState([
  //   {key: 1, item: 1},
  //   {key: 2, item: 2},
  //   {key: 3, item: 3},
  // ]);

  // const renderItem = ({item, drag, isActive}) => {
  //   console.log(item, drag);
  //   return (
  //     <ScaleDecorator>
  //       <TouchableOpacity
  //         activeOpacity={1}
  //         onLongPress={drag}
  //         disabled={isActive}
  //         style={[
  //           styles.rowItem,
  //           {
  //             opacity: isActive ? 0.5 : 1,
  //             padding: 5,
  //             backgroundColor: item.backgroundColor,
  //           },
  //         ]}>
  //         <MyText>{item.item}</MyText>
  //       </TouchableOpacity>
  //     </ScaleDecorator>
  //   );
  // };

  const [isAddItemVisible, setAddItemVisible] = useState(true);

  return (
    <View style={{backgroundColor: '#e5e5e5', flex: 1}}>
      <AddItemModal
        modalVisible={isAddItemVisible}
        setModalVisible={setAddItemVisible}
      />
      <ScrollView>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={globalStyles.heading}>Shop Items</Text>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <CustomButton
            style={styles.outLineButton}
            title="Add Items"
            textStyle={styles.buttonTitle}
            onPressFunction={() => setAddItemVisible(true)}
          />
          <CustomButton
            style={styles.outLineButton}
            title="Excel Upload"
            textStyle={styles.buttonTitle}
            onPressFunction={() => {}}
          />
          <CustomButton
            style={styles.outLineButton}
            title="Tax Master"
            textStyle={styles.buttonTitle}
            onPressFunction={() => {}}
          />
          <CustomButton
            style={{
              borderColor: '#ef4667',
              borderWidth: 1.5,
              width: 180,
              height: 40,
              marginHorizontal: 5,
            }}
            title="Manage Categories"
            textStyle={styles.buttonTitle}
            onPressFunction={() => {}}
          />
        </View>
        <View
          style={{
            marginHorizontal: 50,
            margin: 20,
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
              Shop Items
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
            <ColumnText text="Product Name" />
            <ColumnText text="Product MRP" />
            <ColumnText text="Selling Price" />
            <ColumnText text="Product Name" />
            <ColumnText text="Brand Name" />
            <ColumnText text="Category" />
            <ColumnText text="Sub-Category" />
            <ColumnText text="Product Code" />
            <ColumnText text="EAN Code" />
            <ColumnText text="Make Live" />
          </View>
          <View
            style={{
              width: null,
              height: 270,
              borderColor: 'lightgrey',
              borderTopWidth: 0.8,
              borderBottomWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {false ? (
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
              accessibilityLabel="Set Timeline"
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
      </ScrollView>
    </View>
  );
}

export default ({navigation}) => {
  return (
    <NativeBaseProvider>
      <ShopItems />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  outLineButton: {
    borderColor: '#ef4667',
    borderWidth: 1.5,
    width: 150,
    height: 40,
    marginHorizontal: 5,
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: '300',
    color: '#ef4667',
  },
});

const ColumnText = ({text}) => (
  <Text
    style={{
      padding: 16,
      color: 'black',
      fontWeight: '500',
      fontSize: 15,
      fontStyle: 'italic',
    }}>
    {text}
  </Text>
);
