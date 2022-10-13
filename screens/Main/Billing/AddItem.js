import React, {useEffect, useState} from 'react';
import {
  Modal,
  Button,
  Input,
  FormControl,
  Center,
  NativeBaseProvider,
  Text,
  Select,
  Box,
  CheckIcon,
  CloseIcon,
} from 'native-base';
import {Alert, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../../utils/GlobalStyles';

import SQLite from 'react-native-sqlite-2';
import {useItem} from '../../../utils/ItemsProvider';

const db = SQLite.openDatabase('main.db', '1.0', '', 1);

export default function AddItemModal({
  modalVisible,
  setModalVisible,
  setItems,
}) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [data, setData] = useItem();
  const [itemName, setItemName] = useState('');
  const [MRP, setMRP] = useState(0);
  const [rate, setRate] = useState(0);
  const [unitM, setUnitM] = useState('');
  const [units, setUnits] = useState('');
  const [Qty, setQty] = useState(1);
  const [incExc, setIncExc] = useState('');

  // useEffect(() => {
  //   console.log('Items', data.items);
  // }, [data.items]);

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        size={'full'}
        // margin={20}
        // paddingX={50}
        // paddingX={10}
        marginHorizontal="20%"
        width="750">
        <Modal.Content>
          {/* <Modal.CloseButton /> */}
          <Modal.Header
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text fontSize={30}>Add Item to Bill</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </Modal.Header>
          <Modal.Body>
            <View
              style={{
                flexWrap: 'wrap',
                height: 225,
                alignItems: 'flex-start',
              }}>
              <FormControl isRequired mr={5} style={globalStyles.itemInput}>
                <FormControl.Label>Item Name</FormControl.Label>
                <Input
                  ref={initialRef}
                  value={itemName}
                  keyboardAppearance="dark"
                  onChangeText={e => {
                    setItemName(e);
                    console.log('e', e);
                  }}
                />
              </FormControl>
              <FormControl mt="3" mr={5} style={globalStyles.itemInput}>
                <FormControl.Label>Item Barcode</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl mt="3" w="12" mr={8}>
                <FormControl.Label>Unit(s)</FormControl.Label>
                <View style={{flexDirection: 'row'}}>
                  <Input
                    width={90}
                    value={unitM}
                    onChangeText={e => setUnitM(e)}
                  />
                  <Box width={40}>
                    <Select
                      selectedValue={units}
                      width="100%"
                      accessibilityLabel=""
                      placeholder="Units"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="2" />,
                      }}
                      onValueChange={itemValue => setUnits(itemValue)}>
                      <Select.Item value="g" label="g" />
                      <Select.Item value="kg" label="kg" />
                      <Select.Item value="mg" label="mg" />
                      <Select.Item value="ml" label="ml" />
                      <Select.Item value="L" label="L" />
                      <Select.Item value="cup" label="cup" />
                      <Select.Item value="count" label="count" />
                      <Select.Item value="box" label="box" />
                      <Select.Item value="pkt" label="pkt" />
                      <Select.Item value="glass" label="glass" />
                      <Select.Item value="cm" label="cm" />
                      <Select.Item value="m" label="m" />
                      <Select.Item value="km" label="km" />
                      <Select.Item value="min" label="min" />
                      <Select.Item value="hour" label="hour" />
                      <Select.Item value="days" label="days" />
                      <Select.Item value="inch" label="inch" />
                      <Select.Item value="Ton" label="Ton" />
                    </Select>
                  </Box>
                </View>
              </FormControl>
              <FormControl w="200" mr={5} isRequired>
                <FormControl.Label>Selling Price (₹)</FormControl.Label>
                <Input
                  value={rate}
                  onChangeText={e => {
                    setRate(e);
                    console.log(e);
                  }}
                />
              </FormControl>
              <FormControl mt="3" mr={5} w="200">
                <FormControl.Label>Purchase Price (₹)</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl mt="3" mr={8} w="200">
                <FormControl.Label>Tax</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl w="200">
                <FormControl.Label>Product MRP (₹)</FormControl.Label>
                <Input value={MRP} onChangeText={E => setMRP(E)} />
              </FormControl>
              <FormControl mt="3" w="200" isRequired>
                <FormControl.Label>Quantity</FormControl.Label>
                <Input value={Qty} onChangeText={e => setQty(e)} />
              </FormControl>
              <FormControl mt="3" w="200">
                <FormControl.Label>Inclusive/Exclusive</FormControl.Label>
                {/* <Input /> */}
                <Select
                  selectedValue={incExc}
                  width="100%"
                  accessibilityLabel=""
                  placeholder="Inclusive/Exclusive"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="2" />,
                  }}
                  onValueChange={itemValue => setIncExc(itemValue)}>
                  <Select.Item value="inclusive" label="Inclusive" />
                  <Select.Item value="exclusive" label="Exclusive" />
                </Select>
              </FormControl>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                  setItemName('');
                  setRate(0);
                  setMRP(0);
                  setUnitM('');
                  setUnits('');
                  setQty(1);
                  setIncExc('');
                }}>
                Cancel
              </Button>
              <Button
                ref={finalRef}
                onPress={() => {
                  if (itemName !== '') {
                    if (rate !== 0) {
                      if (Qty !== 0) {
                        setModalVisible(false);
                        setItems(old => [
                          ...old,
                          {
                            id: Math.random() * 1000,
                            itemName: itemName,
                            MRP: MRP,
                            rate: rate,
                            Qty: Qty,
                            units: unitM + ' ' + units,
                            incExc: incExc,
                            subTotal: parseInt(Qty) * parseInt(rate),
                          },
                        ]);
                        // setData(prev => {
                        //   ...prev, {
                        //     item: old => [
                        //       ...old,
                        //       {
                        //         id: Math.random() * 1000,
                        //         itemName: itemName,
                        //         MRP: MRP,
                        //         rate: rate,
                        //         Qty: Qty,
                        //         units: unitM + ' ' + units,
                        //         incExc: incExc,
                        //         subTotal: parseInt(Qty) * parseInt(rate),
                        //       }]
                        //   }
                        // });
                        setData(prev => ({
                          ...prev,
                          items: [
                            ...prev.items,
                            {
                              id: Math.random() * 1000,
                              itemName: itemName,
                              MRP: MRP,
                              rate: rate,
                              Qty: Qty,
                              units: unitM + ' ' + units,
                              incExc: incExc,
                              subTotal: parseInt(Qty) * parseInt(rate),
                            },
                          ],
                        }));
                        try {
                          db.transaction(function (tx) {
                            tx.executeSql(
                              `INSERT INTO Items (itemName, rate, MRP, Qty, units, incExc, subTotal) VALUES ("${itemName}","${rate}","${MRP}","${Qty}","${
                                unitM + ' ' + units
                              }","${incExc}","${
                                parseInt(Qty) * parseInt(rate)
                              }")`,
                              [],
                            );
                            console.log('Item inserted');
                          });
                        } catch (error) {
                          console.log('Error in addItem: ', error);
                        }
                        setItemName('');
                        setRate(0);
                        setMRP(0);
                        setUnitM('');
                        setUnits('');
                        setQty(1);
                        setIncExc('');
                      } else Alert.alert('Warning', 'Please enter Quantity');
                    } else Alert.alert('Warning', 'Please enter Selling Price');
                  } else Alert.alert('Warning', 'Please enter Product Name');
                }}>
                Add Item
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
