/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
  Checkbox,
  // ScrollView,
} from 'native-base';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {globalStyles} from '../../../utils/GlobalStyles';
import {TriangleColorPicker} from 'react-native-color-picker';
import SQLite from 'react-native-sqlite-2';
import {useItem} from '../../../utils/ItemsProvider';
import CustomButton, {MyText} from '../../../utils/CustomButton';
import * as ImagePicker from 'react-native-image-picker';

import DocumentPicker, {types, pick} from 'react-native-document-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Table, Row, Rows} from 'react-native-table-component';
import {filterDOMProps} from '@react-aria/utils';

const db = SQLite.openDatabase('main.db', '1.0', '', 1);

export default function AddItemModal({modalVisible, setModalVisible}) {
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

  const [fileResponse, setFileResponse] = useState([]);

  const [variant, setVariant] = useState(false);

  // UNIT-STATES
  const [unitMVisible, setUnitMVisible] = useState(false);
  const [VUnitm, setVUnitm] = useState('');
  const [VUnit, setVUnit] = useState('');
  const [VUnits, setVUnits] = useState([]);

  const [sizeVisible, setSizeVisible] = useState(false);
  const [sizeInfo, setSizeInfo] = useState('');
  const [sizeInfos, setSizeInfos] = useState([]);

  const [colorVisible, setColorVisible] = useState(false);
  const [color, setColor] = useState('');
  const [colors, setColors] = useState([]);
  const Color = [color, setColor];

  const tableHead = [
    'Item No.',
    'Color/UOM/Size	',
    'Image',
    'MRP(₹)',
    'S.Price(₹)',
    'S.Count	',
    'Purchase Price(₹)',
    'EAN Code	',
    'Product Code	',
    'Discount',
    'HSN Code	',
    'Tax(%)	',
    'Inclusive/Exclusive	',
    'Expiration Date	',
    'Action',
  ];

  const [tableData, setTableData] = useState([]);

  const dataSyntax = [
    1,
    VUnitm + ' ' + VUnit,
    'null',
    <View style={{margin: 5}}>
      <Input placeholder="MRP" placeholderTextColor="black" />
    </View>,
    <View style={{margin: 5}}>
      <Input placeholder="Selling Price" placeholderTextColor="black" />
    </View>,
    <View style={{margin: 5}}>
      <Input placeholder="Stock Count" placeholderTextColor="black" />
    </View>,
    <View style={{margin: 5}}>
      <Input placeholder="Purchase Price" placeholderTextColor="black" />
    </View>,
    <View style={{margin: 5}}>
      <Input placeholder="EAN Code" placeholderTextColor="black" />
    </View>,
    <View style={{margin: 5}}>
      <Input placeholder="Product Code" placeholderTextColor="black" />
    </View>,
    <View style={{margin: 5}}>
      <Input placeholder="Discount Amount" placeholderTextColor="black" />
      <Box width="100%">
        <Select
          shadow={8}
          selectedValue={units}
          width="100%"
          accessibilityLabel=""
          placeholder="Type"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="2" />,
          }}
          onValueChange={itemValue => setUnits(itemValue)}>
          <Select.Item value="flat" label="flat" />
          <Select.Item value="percentage" label="percentage" />
        </Select>
      </Box>
    </View>,
    <View style={{margin: 5}}>
      <Input placeholder="HSN Code" placeholderTextColor="black" />
    </View>,
    <Box width="100%">
      <Select
        shadow={8}
        selectedValue={units}
        width="100%"
        accessibilityLabel=""
        placeholder="Select Tax"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="2" />,
        }}
        onValueChange={itemValue => setUnits(itemValue)}>
        <Select.Item value="flat" label="flat" />
        <Select.Item value="percentage" label="percentage" />
      </Select>
    </Box>,
    <Box width="100%">
      <Select
        shadow={8}
        selectedValue={units}
        width="100%"
        accessibilityLabel=""
        placeholder="Select Inclusive/Exclusive"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="2" />,
        }}
        onValueChange={itemValue => setUnits(itemValue)}>
        <Select.Item value="flat" label="flat" />
        <Select.Item value="percentage" label="percentage" />
      </Select>
    </Box>,
    'null',
    <CustomButton
      style={{
        borderColor: '#ef4667',
        borderWidth: 1.5,
        width: '80%',
        height: 40,
        marginHorizontal: 5,
      }}
      title="Delete"
      textStyle={{
        textAlignVertical: 'center',
        fontSize: 15,
        fontWeight: '300',
        color: '#ef4667',
      }}
      onPressFunction={() => {}}
    />,
  ];
  const [content, setContent] = useState({
    unit: [],
    size: [],
    color: [],
  });

  useEffect(() => {
    let filtered = [];
    content.unit?.forEach((unitVariant, i) => {
      console.log('unitVariant', unitVariant);
      if (content.size.length !== 0) {
        console.log('im in size if ', content.size.l);
        content.size?.forEach(sizeVariant => {
          if (content.color.length !== 0) {
            console.log('im in color if ');
            content.color?.forEach(colorVariant => {
              filtered.push([
                filtered.length + 1,
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      padding: 10,
                      borderRadius: 5,
                      borderColor: 'black',
                      borderWidth: 1,
                      backgroundColor: colorVariant,
                    }}
                  />
                  <MyText>{'   ' + unitVariant}</MyText>
                  <MyText>{'   ' + sizeVariant}</MyText>
                </View>,
                'null',
                <View style={{margin: 5}}>
                  <Input placeholder="MRP" placeholderTextColor="black" />
                </View>,
                <View style={{margin: 5}}>
                  <Input
                    placeholder="Selling Price"
                    placeholderTextColor="black"
                  />
                </View>,
                <View style={{margin: 5}}>
                  <Input
                    placeholder="Stock Count"
                    placeholderTextColor="black"
                  />
                </View>,
                <View style={{margin: 5}}>
                  <Input
                    placeholder="Purchase Price"
                    placeholderTextColor="black"
                  />
                </View>,
                <View style={{margin: 5}}>
                  <Input placeholder="EAN Code" placeholderTextColor="black" />
                </View>,
                <View style={{margin: 5}}>
                  <Input
                    placeholder="Product Code"
                    placeholderTextColor="black"
                  />
                </View>,
                <View style={{margin: 5}}>
                  <Input
                    placeholder="Discount Amount"
                    placeholderTextColor="black"
                  />
                  <Box width="100%">
                    <Select
                      shadow={8}
                      selectedValue={units}
                      width="100%"
                      accessibilityLabel=""
                      placeholder="Type"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="2" />,
                      }}
                      onValueChange={itemValue => setUnits(itemValue)}>
                      <Select.Item value="flat" label="flat" />
                      <Select.Item value="percentage" label="percentage" />
                    </Select>
                  </Box>
                </View>,
                <View style={{margin: 5}}>
                  <Input placeholder="HSN Code" placeholderTextColor="black" />
                </View>,
                <Box width="100%">
                  <Select
                    shadow={8}
                    selectedValue={units}
                    width="100%"
                    accessibilityLabel=""
                    placeholder="Select Tax"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size="2" />,
                    }}
                    onValueChange={itemValue => setUnits(itemValue)}>
                    <Select.Item value="flat" label="flat" />
                    <Select.Item value="percentage" label="percentage" />
                  </Select>
                </Box>,
                <Box width="100%">
                  <Select
                    shadow={8}
                    selectedValue={units}
                    width="100%"
                    accessibilityLabel=""
                    placeholder="Select Inclusive/Exclusive"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size="2" />,
                    }}
                    onValueChange={itemValue => setUnits(itemValue)}>
                    <Select.Item value="flat" label="flat" />
                    <Select.Item value="percentage" label="percentage" />
                  </Select>
                </Box>,
                'null',
                <CustomButton
                  style={{
                    borderColor: '#ef4667',
                    borderWidth: 1.5,
                    width: '80%',
                    height: 40,
                    marginHorizontal: 5,
                  }}
                  title="Delete"
                  textStyle={{
                    textAlignVertical: 'center',
                    fontSize: 15,
                    fontWeight: '300',
                    color: '#ef4667',
                  }}
                  onPressFunction={() => {
                    console.log('clicked', i);
                    // setTableData(tableData.filter())
                    setTableData(prev =>
                      prev.filter((item, index) => {
                        item[0] = index;
                        return index !== i;
                      }),
                    );
                  }}
                />,
              ]);
            });
          } else {
            console.log('im in color else');
            filtered.push([
              filtered.length + 1,
              unitVariant + ' ' + sizeVariant,
              'null',
              <View style={{margin: 5}}>
                <Input placeholder="MRP" placeholderTextColor="black" />
              </View>,
              <View style={{margin: 5}}>
                <Input
                  placeholder="Selling Price"
                  placeholderTextColor="black"
                />
              </View>,
              <View style={{margin: 5}}>
                <Input placeholder="Stock Count" placeholderTextColor="black" />
              </View>,
              <View style={{margin: 5}}>
                <Input
                  placeholder="Purchase Price"
                  placeholderTextColor="black"
                />
              </View>,
              <View style={{margin: 5}}>
                <Input placeholder="EAN Code" placeholderTextColor="black" />
              </View>,
              <View style={{margin: 5}}>
                <Input
                  placeholder="Product Code"
                  placeholderTextColor="black"
                />
              </View>,
              <View style={{margin: 5}}>
                <Input
                  placeholder="Discount Amount"
                  placeholderTextColor="black"
                />
                <Box width="100%">
                  <Select
                    shadow={8}
                    selectedValue={units}
                    width="100%"
                    accessibilityLabel=""
                    placeholder="Type"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size="2" />,
                    }}
                    onValueChange={itemValue => setUnits(itemValue)}>
                    <Select.Item value="flat" label="flat" />
                    <Select.Item value="percentage" label="percentage" />
                  </Select>
                </Box>
              </View>,
              <View style={{margin: 5}}>
                <Input placeholder="HSN Code" placeholderTextColor="black" />
              </View>,
              <Box width="100%">
                <Select
                  shadow={8}
                  selectedValue={units}
                  width="100%"
                  accessibilityLabel=""
                  placeholder="Select Tax"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="2" />,
                  }}
                  onValueChange={itemValue => setUnits(itemValue)}>
                  <Select.Item value="flat" label="flat" />
                  <Select.Item value="percentage" label="percentage" />
                </Select>
              </Box>,
              <Box width="100%">
                <Select
                  shadow={8}
                  selectedValue={units}
                  width="100%"
                  accessibilityLabel=""
                  placeholder="Select Inclusive/Exclusive"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="2" />,
                  }}
                  onValueChange={itemValue => setUnits(itemValue)}>
                  <Select.Item value="flat" label="flat" />
                  <Select.Item value="percentage" label="percentage" />
                </Select>
              </Box>,
              'null',
              <CustomButton
                style={{
                  borderColor: '#ef4667',
                  borderWidth: 1.5,
                  width: '80%',
                  height: 40,
                  marginHorizontal: 5,
                }}
                title="Delete"
                textStyle={{
                  textAlignVertical: 'center',
                  fontSize: 15,
                  fontWeight: '300',
                  color: '#ef4667',
                }}
                onPressFunction={() => {}}
              />,
            ]);
          }
        });
      } else if (content.color.length !== 0) {
        console.log('im in color if ');
        content.color?.forEach(colorVariant => {
          filtered.push([
            filtered.length + 1,
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  // height: 20,
                  // width: 20,
                  padding: 10,
                  borderRadius: 5,
                  borderColor: 'black',
                  borderWidth: 1,
                  backgroundColor: colorVariant,
                }}
              />
              <MyText>{'   ' + unitVariant}</MyText>
            </View>,
            'null',
            <View style={{margin: 5}}>
              <Input placeholder="MRP" placeholderTextColor="black" />
            </View>,
            <View style={{margin: 5}}>
              <Input placeholder="Selling Price" placeholderTextColor="black" />
            </View>,
            <View style={{margin: 5}}>
              <Input placeholder="Stock Count" placeholderTextColor="black" />
            </View>,
            <View style={{margin: 5}}>
              <Input
                placeholder="Purchase Price"
                placeholderTextColor="black"
              />
            </View>,
            <View style={{margin: 5}}>
              <Input placeholder="EAN Code" placeholderTextColor="black" />
            </View>,
            <View style={{margin: 5}}>
              <Input placeholder="Product Code" placeholderTextColor="black" />
            </View>,
            <View style={{margin: 5}}>
              <Input
                placeholder="Discount Amount"
                placeholderTextColor="black"
              />
              <Box width="100%">
                <Select
                  shadow={8}
                  selectedValue={units}
                  width="100%"
                  accessibilityLabel=""
                  placeholder="Type"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="2" />,
                  }}
                  onValueChange={itemValue => setUnits(itemValue)}>
                  <Select.Item value="flat" label="flat" />
                  <Select.Item value="percentage" label="percentage" />
                </Select>
              </Box>
            </View>,
            <View style={{margin: 5}}>
              <Input placeholder="HSN Code" placeholderTextColor="black" />
            </View>,
            <Box width="100%">
              <Select
                shadow={8}
                selectedValue={units}
                width="100%"
                accessibilityLabel=""
                placeholder="Select Tax"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="2" />,
                }}
                onValueChange={itemValue => setUnits(itemValue)}>
                <Select.Item value="flat" label="flat" />
                <Select.Item value="percentage" label="percentage" />
              </Select>
            </Box>,
            <Box width="100%">
              <Select
                shadow={8}
                selectedValue={units}
                width="100%"
                accessibilityLabel=""
                placeholder="Select Inclusive/Exclusive"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="2" />,
                }}
                onValueChange={itemValue => setUnits(itemValue)}>
                <Select.Item value="flat" label="flat" />
                <Select.Item value="percentage" label="percentage" />
              </Select>
            </Box>,
            'null',
            <CustomButton
              style={{
                borderColor: '#ef4667',
                borderWidth: 1.5,
                width: '80%',
                height: 40,
                marginHorizontal: 5,
              }}
              title="Delete"
              textStyle={{
                textAlignVertical: 'center',
                fontSize: 15,
                fontWeight: '300',
                color: '#ef4667',
              }}
              onPressFunction={() => {}}
            />,
          ]);
        });
      } else {
        filtered.push([
          filtered.length + 1,
          unitVariant,
          'null',
          <View style={{margin: 5}}>
            <Input placeholder="MRP" placeholderTextColor="black" />
          </View>,
          <View style={{margin: 5}}>
            <Input placeholder="Selling Price" placeholderTextColor="black" />
          </View>,
          <View style={{margin: 5}}>
            <Input placeholder="Stock Count" placeholderTextColor="black" />
          </View>,
          <View style={{margin: 5}}>
            <Input placeholder="Purchase Price" placeholderTextColor="black" />
          </View>,
          <View style={{margin: 5}}>
            <Input placeholder="EAN Code" placeholderTextColor="black" />
          </View>,
          <View style={{margin: 5}}>
            <Input placeholder="Product Code" placeholderTextColor="black" />
          </View>,
          <View style={{margin: 5}}>
            <Input placeholder="Discount Amount" placeholderTextColor="black" />
            <Box width="100%">
              <Select
                shadow={8}
                selectedValue={units}
                width="100%"
                accessibilityLabel=""
                placeholder="Type"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="2" />,
                }}
                onValueChange={itemValue => setUnits(itemValue)}>
                <Select.Item value="flat" label="flat" />
                <Select.Item value="percentage" label="percentage" />
              </Select>
            </Box>
          </View>,
          <View style={{margin: 5}}>
            <Input placeholder="HSN Code" placeholderTextColor="black" />
          </View>,
          <Box width="100%">
            <Select
              shadow={8}
              selectedValue={units}
              width="100%"
              accessibilityLabel=""
              placeholder="Select Tax"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="2" />,
              }}
              onValueChange={itemValue => setUnits(itemValue)}>
              <Select.Item value="flat" label="flat" />
              <Select.Item value="percentage" label="percentage" />
            </Select>
          </Box>,
          <Box width="100%">
            <Select
              shadow={8}
              selectedValue={units}
              width="100%"
              accessibilityLabel=""
              placeholder="Select Inclusive/Exclusive"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="2" />,
              }}
              onValueChange={itemValue => setUnits(itemValue)}>
              <Select.Item value="flat" label="flat" />
              <Select.Item value="percentage" label="percentage" />
            </Select>
          </Box>,
          'null',
          <CustomButton
            style={{
              borderColor: '#ef4667',
              borderWidth: 1.5,
              width: '80%',
              height: 40,
              marginHorizontal: 5,
            }}
            title="Delete"
            textStyle={{
              textAlignVertical: 'center',
              fontSize: 15,
              fontWeight: '300',
              color: '#ef4667',
            }}
            onPressFunction={() => {}}
          />,
        ]);
      }
    });
    console.log('filtered', filtered);
    setTableData(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    // setContent(prev => prev.filter());
  }, [VUnits, sizeInfos, colors]);

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
        marginY="150"
        margin="3%"
        marginLeft="10%"
        height="90%"
        width="70%">
        {/* unit info */}
        <Modal
          zIndex="1"
          isOpen={unitMVisible}
          onClose={() => setUnitMVisible(false)}
          size={'lg'}>
          <Modal.Content>
            <Modal.Header
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <MyText style={[globalStyles.heading, {}]}>Unit Info</MyText>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <MyInput
                    width={220}
                    mr={5}
                    value={VUnitm}
                    onChangeText={e => setVUnitm(e)}
                    placeholder="Enter Measurement Value"
                  />
                  <Box width={40}>
                    <Select
                      shadow={8}
                      selectedValue={VUnit}
                      width="100%"
                      accessibilityLabel=""
                      placeholder="Units"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="2" />,
                      }}
                      onValueChange={itemValue => setVUnit(itemValue)}>
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
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  colorScheme={'rose'}
                  onPress={() => {
                    setUnitMVisible(false);
                    setVUnitm('');
                    setVUnit('');
                    setVUnits(prev => [
                      ...new Set([...prev, VUnitm + ' ' + VUnit]),
                    ]);
                    setContent(prev => ({
                      ...prev,
                      unit: [...prev.unit, VUnitm + ' ' + VUnit],
                    }));
                  }}>
                  Add
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        {/* Size info */}
        <Modal
          isOpen={sizeVisible}
          onClose={() => setSizeVisible(false)}
          size={'lg'}>
          <Modal.Content>
            <Modal.Header
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <MyText style={[globalStyles.heading, {}]}>Size Info</MyText>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <MyInput
                    width="90%"
                    value={sizeInfo}
                    onChangeText={e => setSizeInfo(e)}
                    placeholder="Enter the Size (Eg: Small)"
                  />
                </View>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  colorScheme={'rose'}
                  onPress={() => {
                    setSizeVisible(false);
                    setSizeInfo('');
                    setSizeInfos(prev => [...new Set([...prev, sizeInfo])]);
                    setContent(prev => ({
                      ...prev,
                      size: [...prev.size, sizeInfo],
                    }));
                  }}>
                  Add
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        {/* Color info */}
        <Modal
          zIndex="1"
          isOpen={colorVisible}
          onClose={() => setColorVisible(false)}
          size={'lg'}>
          <Modal.Content>
            <Modal.Header
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <MyText style={[globalStyles.heading, {}]}>Color Info</MyText>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <MyColor color="black" Color={Color} />
                  <MyColor color="white" Color={Color} />
                  <MyColor color="red" Color={Color} />
                  <MyColor color="orange" Color={Color} />
                  <MyColor color="yellow" Color={Color} />
                  <MyColor color="lightblue" Color={Color} />
                  <MyColor color="blue" Color={Color} />
                  <MyColor color="darkblue" Color={Color} />
                  <MyColor color="purple" Color={Color} />
                  <MyColor color="darkgreen" Color={Color} />
                  <MyColor color="green" Color={Color} />
                  <MyColor color="lightgreen" Color={Color} />
                  <MyColor color="brown" Color={Color} />
                </View>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  colorScheme={'rose'}
                  onPress={() => {
                    setColorVisible(false);
                    setColors(prev => [...new Set([...prev, color])]);
                    setColor('');
                    setContent(prev => ({
                      ...prev,
                      color: [...prev.color, color],
                    }));
                  }}>
                  Add
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Modal.Content>
          <Modal.Header
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text fontSize={30}>Add Item</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Checkbox
                value={variant}
                accessibilityLabel="This is a dummy checkbox"
                colorScheme="rose"
                onChange={() => setVariant(prev => !prev)}
              />
              <Text
                style={{
                  fontStyle: 'italic',
                  color: 'black',
                  fontWeight: '500',
                  marginHorizontal: 10,
                }}>
                Add Variant
              </Text>
            </View>
          </Modal.Header>
          <Modal.Body>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                }}>
                <FormControl
                  isRequired
                  mr={5}
                  style={globalStyles.shopAddInput}>
                  <FormLabel>Category</FormLabel>
                  <MyInput
                    ref={initialRef}
                    value={itemName}
                    onChangeText={e => {}}
                  />
                </FormControl>
                <FormControl
                  isRequired
                  mr={5}
                  style={globalStyles.shopAddInput}>
                  <FormLabel>Sub Category</FormLabel>
                  <MyInput value={itemName} onChangeText={e => {}} />
                </FormControl>
                <FormControl mr={5} style={globalStyles.shopAddInput}>
                  <FormLabel>Brand Name</FormLabel>
                  <MyInput value={itemName} onChangeText={e => {}} />
                  {/* <CustomButton
                    title="content"
                    color="red"
                    onPressFunction={() => console.log('content', content)}
                  />
                  <CustomButton
                    title="table"
                    color="red"
                    onPressFunction={() => console.log('tabledata', tableData)}
                  /> */}
                </FormControl>
                <FormControl isRequired style={globalStyles.shopAddInput}>
                  <FormLabel>Product Name</FormLabel>
                  <MyInput
                    value={itemName}
                    onChangeText={e => {
                      setItemName(e);
                      console.log('e', e);
                    }}
                  />
                </FormControl>
                {!variant ? null : (
                  <>
                    <FormControl mr={8}>
                      <FormLabel>Unit of Measurements</FormLabel>
                      <View style={{flexDirection: 'row'}}>
                        <MyInput
                          width={220}
                          mr={5}
                          value={unitM}
                          onChangeText={e => setUnitM(e)}
                        />
                        <Box width={40}>
                          <Select
                            shadow={8}
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
                    <FormControl w="200" style={globalStyles.shopAddInput}>
                      <FormLabel>Inventory Quantity</FormLabel>
                      <MyInput />
                    </FormControl>
                    <FormControl w="200" style={globalStyles.shopAddInput}>
                      <FormLabel>Product EAN Code</FormLabel>
                      <MyInput value={MRP} onChangeText={E => setMRP(E)} />
                    </FormControl>
                    <FormControl
                      mt="3"
                      w="200"
                      style={globalStyles.shopAddInput}>
                      <FormLabel>Product Description</FormLabel>
                      <MyInput value={Qty} onChangeText={e => setQty(e)} />
                    </FormControl>
                  </>
                )}
              </View>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  alignItems: 'center',
                }}>
                {!variant ? null : (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: 400,
                        justifyContent: 'space-between',
                      }}>
                      <FormControl w="180">
                        <FormLabel>Purchase Price (₹)</FormLabel>
                        <MyInput />
                      </FormControl>
                      <FormControl w="180" isRequired>
                        <FormLabel>Selling Price (₹)</FormLabel>
                        <MyInput
                          value={rate}
                          onChangeText={e => {
                            setRate(e);
                            console.log(e);
                          }}
                        />
                      </FormControl>
                    </View>
                    <FormControl style={globalStyles.shopAddInput}>
                      <FormLabel>Purchase rate</FormLabel>
                      <MyInput />
                    </FormControl>
                    <FormControl ml="16" mr={2}>
                      <FormLabel>Discount</FormLabel>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <MyInput
                          width={220}
                          mr={5}
                          value={unitM}
                          onChangeText={e => setUnitM(e)}
                        />
                        <Box width={40}>
                          <Select
                            shadow={8}
                            selectedValue={units}
                            width="100%"
                            accessibilityLabel=""
                            placeholder="Type"
                            _selectedItem={{
                              bg: 'teal.600',
                              endIcon: <CheckIcon size="2" />,
                            }}
                            onValueChange={itemValue => setUnits(itemValue)}>
                            <Select.Item value="flat" label="flat" />
                            <Select.Item
                              value="percentage"
                              label="percentage"
                            />
                          </Select>
                        </Box>
                      </View>
                    </FormControl>
                    <FormControl style={globalStyles.shopAddInput}>
                      <FormLabel>HSN Code</FormLabel>
                      <MyInput />
                    </FormControl>
                    <FormControl ml="16" mr={2}>
                      <FormLabel>Tax(%)</FormLabel>
                      <View
                        style={{
                          flexDirection: 'row',
                          // alignItems: 'center',
                          // justifyContent: 'center',
                        }}>
                        <MyInput
                          width={200}
                          mr={5}
                          value={unitM}
                          onChangeText={e => setUnitM(e)}
                        />
                        <Select
                          selectedValue={incExc}
                          width="180"
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
                      </View>
                    </FormControl>
                    <FormControl w="200" style={globalStyles.shopAddInput}>
                      <FormLabel>Product Code</FormLabel>
                      <MyInput
                        value={rate}
                        onChangeText={e => {
                          setRate(e);
                          console.log(e);
                        }}
                      />
                    </FormControl>
                    <FormControl w="200" style={globalStyles.shopAddInput}>
                      <FormLabel>Expiration date</FormLabel>
                      <MyInput />
                    </FormControl>
                  </>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    width: 200,
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    marginLeft: 15,
                    marginTop: variant ? 30 : 0,
                  }}>
                  <Checkbox
                    value={false}
                    accessibilityLabel="This is a dummy checkbox"
                    colorScheme="rose"
                    onChange={() => {}}
                  />
                  <Text style={{fontStyle: 'italic', color: 'black'}}>
                    Price changes frequently
                  </Text>
                </View>
              </View>
            </View>
            {variant ? null : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around',
                  }}>
                  <View
                    style={[
                      globalStyles.card,
                      {
                        width: 250,
                        minHeight: 150,
                        padding: 0,
                        justifyContent: 'flex-start',
                      },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <MyText>Unit of Measurements</MyText>
                      <CustomButton
                        title="Add"
                        textStyle={styles.buttonTitle}
                        style={styles.outLineButton}
                        onPressFunction={() => setUnitMVisible(true)}
                      />
                    </View>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      {VUnits.map((item, id) => (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            flexDirection: 'row',
                            padding: 4,
                            margin: 5,
                          }}>
                          <MyText style={{color: 'black', marginRight: 5}}>
                            {item}
                          </MyText>
                          <TouchableOpacity
                            onPress={() => {
                              setVUnits(VUnits.filter((o, i) => id !== i));
                              setContent(prev => ({
                                ...prev,
                                unit: prev.unit.filter((o, i) => o !== item),
                              }));
                            }}>
                            <CloseIcon />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View
                    style={[
                      globalStyles.card,
                      {
                        width: 250,
                        minHeight: 150,
                        padding: 0,
                        justifyContent: 'flex-start',
                      },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <MyText>Size info</MyText>
                      <CustomButton
                        title="Add"
                        textStyle={styles.buttonTitle}
                        style={styles.outLineButton}
                        onPressFunction={() => setSizeVisible(true)}
                      />
                    </View>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      {sizeInfos.map((item, id) => (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            flexDirection: 'row',
                            padding: 4,
                            margin: 5,
                          }}>
                          <MyText style={{color: 'black', marginRight: 5}}>
                            {item}
                          </MyText>
                          <TouchableOpacity
                            onPress={() => {
                              setSizeInfos(
                                sizeInfos.filter((o, i) => id !== i),
                              );
                              setContent(prev => ({
                                ...prev,
                                size: prev.size.filter((o, i) => o !== item),
                              }));
                            }}>
                            <CloseIcon />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View
                    style={[
                      globalStyles.card,
                      {
                        width: 250,
                        height: 150,
                        padding: 0,
                        justifyContent: 'flex-start',
                      },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <MyText>Color Details</MyText>
                      <CustomButton
                        title="Add"
                        textStyle={styles.buttonTitle}
                        style={styles.outLineButton}
                        onPressFunction={() => setColorVisible(true)}
                      />
                    </View>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      {colors.map((item, id) => (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            flexDirection: 'row',
                            padding: 4,
                            margin: 5,
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              padding: 7,
                              borderRadius: 15,
                              borderWidth: 2,
                              borderColor: 'black',
                              backgroundColor: item,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setColors(colors.filter((o, i) => id !== i));
                              setContent(prev => ({
                                ...prev,
                                color: prev.color.filter((o, i) => o !== item),
                              }));
                            }}>
                            <CloseIcon />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                {tableData.length !== 0 ? (
                  <ScrollView>
                    <SafeAreaView>
                      <ScrollView horizontal style={{}}>
                        <Table
                          borderStyle={{
                            borderWidth: 2,
                            borderColor: '#c8e1ff',
                          }}>
                          <Row
                            data={tableHead}
                            widthArr={[
                              80, 200, 100, 130, 130, 130, 120, 120, 120, 130,
                              120, 120, 200, 180, 100,
                            ]}
                            style={{height: 40, backgroundColor: '#f1f8ff'}}
                            textStyle={{color: 'black', margin: 10}}
                          />
                          {tableData.map((item, i) => {
                            // let row = tableData[i].map((data, index) => {
                            //   if (index === 0) {
                            //     data[0] = index + 1;
                            //   }
                            //   return data;
                            // });
                            return <MyRow data={tableData[i]} />;
                          })}
                        </Table>
                      </ScrollView>
                    </SafeAreaView>
                  </ScrollView>
                ) : null}
              </>
            )}
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
                  //   setModalVisible(false);
                  //   setItems(old => [
                  //     ...old,
                  //     {
                  //       id: Math.random() * 1000,
                  //       itemName: itemName,
                  //       MRP: MRP,
                  //       rate: rate,
                  //       Qty: Qty,
                  //       units: unitM + ' ' + units,
                  //       incExc: incExc,
                  //       subTotal: parseInt(Qty) * parseInt(rate),
                  //     },
                  //   ]);
                  //   // setData(prev => {
                  //   //   ...prev, {
                  //   //     item: old => [
                  //   //       ...old,
                  //   //       {
                  //   //         id: Math.random() * 1000,
                  //   //         itemName: itemName,
                  //   //         MRP: MRP,
                  //   //         rate: rate,
                  //   //         Qty: Qty,
                  //   //         units: unitM + ' ' + units,
                  //   //         incExc: incExc,
                  //   //         subTotal: parseInt(Qty) * parseInt(rate),
                  //   //       }]
                  //   //   }
                  //   // });
                  //   setData(prev => ({
                  //     ...prev,
                  //     items: [
                  //       ...prev.items,
                  //       {
                  //         id: Math.random() * 1000,
                  //         itemName: itemName,
                  //         MRP: MRP,
                  //         rate: rate,
                  //         Qty: Qty,
                  //         units: unitM + ' ' + units,
                  //         incExc: incExc,
                  //         subTotal: parseInt(Qty) * parseInt(rate),
                  //       },
                  //     ],
                  //   }));
                  //   try {
                  //     db.transaction(function (tx) {
                  //       tx.executeSql(
                  //         `INSERT INTO Items (itemName, rate, MRP, Qty, units, incExc, subTotal) VALUES ("${itemName}","${rate}","${MRP}","${Qty}","${
                  //           unitM + ' ' + units
                  //         }","${incExc}","${parseInt(Qty) * parseInt(rate)}")`,
                  //         [],
                  //       );
                  //       console.log('Item inserted');
                  //     });
                  //   } catch (error) {
                  //     console.log('Error in addItem: ', error);
                  //   }
                  //   setItemName('');
                  //   setRate(0);
                  //   setMRP(0);
                  //   setUnitM('');
                  //   setUnits('');
                  //   setQty(1);
                  //   setIncExc('');
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

const MyInput = ({...props}) => <Input shadow="8" mb={5} {...props} />;
const FormLabel = ({children}) => (
  <FormControl.Label>
    <Text style={{fontWeight: 'bold', color: 'black'}}>{children}</Text>
  </FormControl.Label>
);

const MyRow = ({...props}) => (
  <Row
    widthArr={[
      80, 200, 100, 130, 130, 130, 120, 120, 120, 130, 120, 120, 200, 180, 100,
    ]}
    {...props}
    textStyle={{color: 'black', margin: 10}}
  />
);
const MyColor = ({color, Color}) => (
  <TouchableOpacity
    onPress={() => {
      Color[1](color);
      console.log(color);
    }}>
    <View
      style={{
        // height: 20,
        // width: 20,
        padding: 10,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: Color[0] === color ? 3 : 1,
        backgroundColor: color,
      }}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  outLineButton: {
    borderColor: '#ef4667',
    borderWidth: 1.5,
    width: 50,
    height: 37,
    marginHorizontal: 5,
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: '300',
    color: '#ef4667',
  },
});
