/* eslint-disable react-native/no-inline-styles */
import {
  KeyboardEvent,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
// import Feather from 'react-native-vector-icons';
import React, {useEffect, useState, useMemo} from 'react';
import {globalStyles} from '../../../utils/GlobalStyles';
import {Picker} from '@react-native-picker/picker';
import {
  NativeBaseProvider,
  ScrollView,
  Button,
  Radio,
  Icon,
  Input,
  Stack,
  Box,
  Row,
  FormControl,
  Select,
  CheckIcon,
  DeleteIcon,
  IconButton,
  Pressable,
  Modal,
  TextArea,
  Checkbox,
  InputLeftAddon,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons';
import CustomButton from '../../../utils/CustomButton';
import CustomerDetails from './CustomerDetails';
import {ModalTitle} from 'react-native-modals';
import {ModalButton} from 'react-native-modals';
import {ModalContent} from 'react-native-modals';
import AddItemModal from './AddItem';
import Autocomplete from 'react-native-autocomplete-input';
import AdvancedSettings from './AdvancedSettings';
import ShortCuts from './ShortCuts';
import {useItem} from '../../../utils/ItemsProvider';
// import Modal from './Modal';

import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('main.db', '1.0', '', 1);

const Item = ({
  itemName,
  rate,
  MRP,
  Qty,
  units,
  incExc,
  subTotal,
  items,
  setItems,
  item,
  MRPvisible,
  HSNvisible,
  taxVisible,
}) => (
  <View
    style={{
      backgroundColor: items.indexOf(item) % 2 !== 0 ? '#f3f3f3' : 'white',
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center',
      paddingRight: 20,
    }}>
    <View style={{flex: 1, paddingRight: 10, justifyContent: 'center'}}>
      <Text style={[globalStyles.itemHeader, {fontSize: 13}]}>{itemName}</Text>
      <Text style={[globalStyles.itemHeader, {fontSize: 10}]}>{units}</Text>
    </View>
    {MRPvisible ? (
      <Text style={[globalStyles.itemHeader, {flex: 1}]}>
        {parseInt(MRP).toFixed(2)}
      </Text>
    ) : null}
    <Text style={[globalStyles.itemHeader, {flex: 1}]}>{rate}</Text>
    <Text style={[globalStyles.itemHeader, {flex: 1}]}>{Qty}</Text>
    {HSNvisible ? (
      <Text style={[globalStyles.itemHeader, {flex: 1}]}>NIL</Text>
    ) : null}
    {taxVisible ? (
      <>
        <Text style={[globalStyles.itemHeader, {flex: 1}]}></Text>
        <Text style={[globalStyles.itemHeader, {flex: 1}]}>{incExc}</Text>
      </>
    ) : null}
    <Text style={[globalStyles.itemHeader, {flex: 1}]}>
      {subTotal.toFixed(2)}
    </Text>
    <TouchableOpacity
      onPress={() => setItems(prev => prev.filter(el => el.id !== item.id))}>
      <DeleteIcon />
    </TouchableOpacity>
  </View>
);

const Draft = ({
  createdAt,
  itemCount,
  total,
  draft,
  setItems,
  setData,
  setCurrent,
  drafts,
  details,
}) => (
  <View
    style={{
      backgroundColor: drafts.indexOf(draft) % 2 !== 0 ? '#f3f3f3' : 'white',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 20,
      justifyContent: 'space-evenly',
    }}>
    <Text style={[globalStyles.itemHeader, {fontSize: 15, flex: 1}]}>
      {createdAt}
    </Text>
    <Text
      style={[
        globalStyles.itemHeader,
        {fontSize: 15, flex: 1, marginLeft: 10},
      ]}>
      {details.num}
    </Text>
    <Text style={[globalStyles.itemHeader, {flex: 1}]}>{details.name}</Text>
    <Text style={[globalStyles.itemHeader, {flex: 1, marginLeft: 50}]}>
      {itemCount}
    </Text>
    <Text style={[globalStyles.itemHeader, {flex: 1, marginRight: -50}]}>
      {total}
    </Text>
    <CustomButton
      style={{
        marginRight: 100,
        borderColor: '#5194c6',
        borderWidth: 1,
        width: 150,
        height: 40,
        marginHorizontal: 5,
      }}
      title="Move to Billing"
      color="#5194c6"
      textStyle={{
        fontSize: 15,
        fontWeight: '300',
        // color: 'black',
      }}
      onPressFunction={() => {
        setItems(draft.items);
        setData(prev => ({
          ...prev,
          drafts: [
            ...prev.drafts,
            prev.drafts.filter(el => el.key !== draft.key),
          ],
        }));
        setCurrent(true);
        details.setName(details.name);
        details.setNum(details.num);
      }}
    />
    <TouchableOpacity
      onPress={() =>
        setData(prev => ({
          ...prev,
          drafts: [
            ...prev.drafts,
            prev.drafts.filter(el => el.key !== draft.key),
          ],
        }))
      }>
      <DeleteIcon />
    </TouchableOpacity>
  </View>
);

const SearchList = ({name, setsearch, setFiltered, setItem, item}) => (
  <TouchableOpacity
    onPress={() => {
      setFiltered([]);
      setsearch(null);
      setItem(old => [...old, item]);
      console.log('item selected', item);
    }}
    style={{
      // marginTop: -5,
      padding: 15,
      backgroundColor: 'white',
      borderColor: 'grey',
      borderWidth: 0.5,
      borderTopWidth: 0,
      width: '100%',
    }}>
    <Text
      style={{
        fontSize: 18,
        color: 'black',
      }}>
      {name}
    </Text>
  </TouchableOpacity>
);

function Billing() {
  const [current, setCurrent] = useState(true);
  const [invoiceNo, setInvoice] = useState(0);
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState([]);

  const [query, setquery] = useState('');
  const [total, setTotal] = useState(0);
  const [MRPvisible, setMRPvisible] = useState(false);
  const [HSNvisible, setHSNvisible] = useState(false);
  const [taxVisible, setTaxVisible] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(false);
  const [discountVisible, setDiscountVisible] = useState(false);

  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState(null);
  const [num, setNum] = useState(null);

  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  const [isShippingDisabled, setShippingAbled] = useState(false);

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const totalAmount = useMemo(() => {
    let result = 0;
    if (items?.length > 0) {
      items.forEach(i => {
        result += i.subTotal;
      });
    }
    return result;
  }, [items]);

  const renderItem = ({item}) => {
    return (
      <Item
        itemName={item.itemName}
        rate={item.rate}
        MRP={item.MRP}
        Qty={item.Qty}
        setItems={setItems}
        units={item.units}
        incExc={item.incExc}
        subTotal={parseInt(item.subTotal)}
        items={items}
        item={item}
        MRPvisible={MRPvisible}
        HSNvisible={HSNvisible}
        taxVisible={taxVisible}
      />
    );
  };

  const renderDraft = ({item}) => {
    console.log('item', item.items);
    let tots = 0;
    if (item.items !== undefined) {
      item.items.forEach(i => {
        tots += parseInt(i.subTotal);
      });
    }
    // console.log('draft', item, '\ntotal:', tots);
    return (
      <Draft
        createdAt={item.createdAt}
        itemCount={item.items.length}
        total={tots}
        draft={item}
        setItems={setItems}
        setData={setData}
        setCurrent={setCurrent}
        drafts={data.drafts}
        details={{
          name: item.name,
          num: item.num,
          setName: setName,
          setNum: setNum,
        }}
      />
    );
  };

  // useEffect(() => {
  //   console.log('item changed');
  //   updateItems();
  // }, [items, updateItems]);

  const [data, setData] = useItem();

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const updateItems = () => {
  //   console.log('updateitem ran');
  //   db.transaction(function (tx) {
  //     // tx.executeSql('DROP TABLE IF EXISTS Users', []);
  //     tx.executeSql(`SELECT * FROM "Items" `, [], function (tx, res) {
  //       console.log('items', res.rows);
  //       console.log('item res', res.rows.item);
  //       console.log('allitem before for loop :', data);
  //       for (let i = 0; i < res.rows.length; i++) {
  //         console.log(res.rows.item(i));
  //         setData(old => [...old, res.rows.item(i)]);
  //       }
  //     });
  //   });
  // };

  // useEffect(() => {
  //   console.log('allitems', data);
  // }, [data]);

  const [filtered, setFiltered] = useState(items);

  const searchFilter = text => {
    if (text) {
      const newData = data.items.filter(item => {
        const itemData = item.itemName
          ? item.itemName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.includes(textData);
      });
      setFiltered(newData);
      setSearchPhrase(text);
    } else {
      setFiltered([]);
      setSearchPhrase(text);
    }
  };

  const renderSearch = ({item}) => {
    return (
      <SearchList
        name={item.itemName}
        setsearch={setSearchPhrase}
        setFiltered={setFiltered}
        setItem={setItems}
        item={item}
      />
    );
  };

  const [isAddItemVisible, setAddItemVisible] = useState(false);
  const [isAdvSetVisible, setAdvSetVisible] = useState(false);
  const [couponVisible, setCouponVisible] = useState(false);

  const getTime = () => {
    return (
      new Date().getFullYear() +
      '-' +
      (parseInt(new Date().getMonth()) + 1) +
      '-' +
      new Date().getDate() +
      ' ' +
      new Date().getHours() +
      ':' +
      new Date().getMinutes() +
      ':' +
      new Date().getSeconds()
    );
  };

  useEffect(() => {
    console.log('draft:', data.drafts);
    console.log('items:', items);
  }, [data.drafts, items]);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [deliveryVisible, setDeliveryVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [isShortCutVisible, setIsShortCutVisible] = useState(false);

  return (
    <View style={{backgroundColor: '#f1f2f6', flex: 1}}>
      <AddItemModal
        modalVisible={isAddItemVisible}
        setModalVisible={setAddItemVisible}
        setItems={setItems}
        setData={setData}
      />
      <AdvancedSettings
        modalVisible={isAdvSetVisible}
        setModalVisible={setAdvSetVisible}
        setMRPvisible={setMRPvisible}
        MRPvisible={MRPvisible}
        HSNvisible={HSNvisible}
        setHSNvisible={setHSNvisible}
        taxVisible={taxVisible}
        setTaxVisible={setTaxVisible}
        customerDetails={customerDetails}
        setCustomerDetails={setCustomerDetails}
        discountVisible={discountVisible}
        setDiscountVisible={setDiscountVisible}
      />

      <ShortCuts
        modalVisible={isShortCutVisible}
        setModalVisible={setIsShortCutVisible}
      />

      {/* Delivery Address */}
      <Modal
        isOpen={deliveryVisible}
        onClose={() => setDeliveryVisible(false)}
        size={'lg'}>
        <Modal.Content>
          <Modal.Header>
            <Text style={[globalStyles.heading, {}]}>Delivery Address</Text>
          </Modal.Header>
          <Modal.Body>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <FormControl maxW={230}>
                <FormControl.Label>Billing address</FormControl.Label>
                <TextArea
                  placeholder="Enter Billing address"
                  blurOnSubmit
                  value={billingAddress}
                  onChangeText={e => setBillingAddress(e)}
                />
              </FormControl>
              <FormControl maxW={230}>
                <FormControl.Label>Shipping address</FormControl.Label>
                <TextArea
                  placeholder="Enter shipping address"
                  blurOnSubmit
                  value={isShippingDisabled ? billingAddress : shippingAddress}
                  onChangeText={e => setShippingAddress(e)}
                  isDisabled={isShippingDisabled}
                />
                <Box flexDirection={'row'} alignItems={'center'}>
                  <Checkbox
                    style={{margin: 10}}
                    onChange={() => {
                      setShippingAbled(prev => !prev);
                    }}
                  />
                  <Text style={{color: 'black'}}>Same as Billing Address</Text>
                </Box>
              </FormControl>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                onPress={() => {
                  setDeliveryVisible(false);
                  setBillingAddress('');
                  setShippingAddress('');
                }}>
                Cancel
              </Button>
              <Button
                colorScheme={'rose'}
                onPress={() => {
                  setDeliveryVisible(false);
                }}>
                Add Address
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Coupon */}
      <Modal
        size={'md'}
        isOpen={couponVisible}
        onClose={() => setCouponVisible(false)}>
        <Modal.Content>
          <Modal.Header>
            <FormControl>
              <FormControl.Label> Apply Coupons</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Header>
          <Modal.Body alignItems={'center'}>
            <Text style={{color: 'black'}}>No Coupons to Show</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {/* Notes */}
      <Modal
        isOpen={notesVisible}
        onClose={() => setNotesVisible(false)}
        size={'lg'}>
        <Modal.Content>
          <Modal.Header>
            <Text style={[globalStyles.heading, {}]}>Notes</Text>
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <TextArea
                placeholder="Add notes"
                value={notes}
                onChangeText={e => setNotes(e)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                onPress={() => {
                  setNotesVisible(false);
                  setNotes('');
                }}>
                Cancel
              </Button>
              <Button
                colorScheme={'rose'}
                onPress={() => {
                  setNotesVisible(false);
                }}>
                Add Notes
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <ScrollView>
        <View style={[globalStyles.header, {justifyContent: 'space-between'}]}>
          {/* <Feather
            name="search"
            size={20}
            color="black"
            style={{marginLeft: 1}}
          /> */}
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'column',
                width: '42%',
                height: 800,
                alignItems: 'center',
                zIndex: 1,
                marginLeft: 5,
              }}>
              <TextInput
                style={[
                  globalStyles.input,
                  {
                    width: '100%',
                    fontSize: 16,
                    textAlignVertical: 'center',
                    height: 40,
                    backgroundColor: 'white',
                  },
                ]}
                placeholder={'Search items by typing product name or by code'}
                placeholderTextColor={'lightgrey'}
                value={searchPhrase}
                onChangeText={text => searchFilter(text)}
              />
              {filtered.length !== 0 ? (
                <View style={{width: '100%', height: '100%', marginTop: -20}}>
                  <FlatList data={filtered} renderItem={renderSearch} />
                </View>
              ) : null}
            </View>
            <TextInput
              style={[
                globalStyles.input,
                {
                  width: '42%',
                  fontSize: 16,
                  textAlignVertical: 'center',
                  height: 40,
                  backgroundColor: 'white',
                },
              ]}
              placeholder={
                'Place your cursor here and start scanning the product'
              }
              placeholderTextColor={'lightgrey'}
            />
          </View>
          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              marginRight: 20,
              fontSize: 12,
            }}>
            {new Date().getDate()},{months[new Date().getMonth()]},
            {new Date().getFullYear()}
          </Text>
        </View>
        <View
          style={{
            zIndex: filtered.length === 0 ? 0 : -1,
            width: current ? '70%' : '99.5%',
            height: 50,
            backgroundColor: 'lightyellow',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setCurrent(true)}
              style={{
                justifyContent: 'center',
                paddingHorizontal: 10,
                backgroundColor: current ? 'white' : 'lightyellow',
                borderBottomColor: 'black',
                borderBottomWidth: current ? 3 : 0,
              }}>
              <Text style={{color: 'black', fontSize: 20}}>Current</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrent(false)}
              style={{
                justifyContent: 'center',
                paddingHorizontal: 10,
                backgroundColor: !current ? 'white' : 'lightyellow',
                borderBottomColor: 'black',
                borderBottomWidth: !current ? 3 : 0,
              }}>
              <Text style={{color: 'black', fontSize: 20}}>Draft</Text>
            </TouchableOpacity>
          </View>
          {current ? (
            <View style={{flexDirection: 'row'}}>
              <CustomButton
                style={{width: 'auto', height: 50, margin: 0}}
                title="ShortCut Keys"
                textStyle={{color: '#5194c6', fontSize: 13, marginTop: 15}}
                onPressFunction={() => setIsShortCutVisible(!isShortCutVisible)}
              />
              <CustomButton
                style={{width: 'auto', height: 50, margin: 0}}
                title="+Add New Items"
                textStyle={{color: '#5194c6', fontSize: 13, marginTop: 15}}
                onPressFunction={() => setAddItemVisible(!isAddItemVisible)}
              />
              <CustomButton
                style={{width: 'auto', height: 50, margin: 0}}
                title="Advance Settings"
                textStyle={{color: '#5194c6', fontSize: 13, marginTop: 15}}
                onPressFunction={() => setAdvSetVisible(!isAdvSetVisible)}
              />
              <CustomButton
                style={{width: 'auto', height: 50, margin: 0, marginRight: 10}}
                title="Clear All"
                textStyle={{
                  color: '#5194c6',
                  fontSize: 13,
                  marginTop: 15,
                }}
                onPressFunction={() => setItems([])}
              />
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <CustomButton
                style={{width: 'auto', height: 50, margin: 0, marginRight: 10}}
                title="Remove All"
                textStyle={{
                  color: '#5194c6',
                  fontSize: 13,
                  marginTop: 15,
                }}
                onPressFunction={() => setDraft([])}
              />
            </View>
          )}
        </View>
        {current ? (
          <View
            style={{
              flexDirection: 'row',
              zIndex: filtered.length === 0 ? 0 : -1,
            }}>
            {/* Current */}
            <View style={{width: '70%'}}>
              <View
                style={[
                  globalStyles.card,
                  {
                    marginTop: 10,
                    height: 400,
                    width: '100%',
                    alignItems: 'baseline',
                    padding: 10,
                  },
                ]}>
                <Text style={{color: 'black'}}>
                  Order items({items.length}) | Invoice No: {invoiceNo}
                </Text>
                {items.length === 0 ? (
                  <View
                    style={{
                      alignItems: 'center',
                      height: 300,
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        margin: 10,
                      }}
                      source={{
                        uri: 'data:image/png;base64,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',
                      }}
                    />
                    <Text
                      style={{
                        color: 'black',
                        width: 300,
                        textAlign: 'center',
                      }}>
                      Start billing your items by scanning or add items from
                      inventory using search
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      // backgroundColor: 'lightgrey',
                      height: 300,
                      width: '100%',
                    }}>
                    <View
                      style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                        marginTop: 10,
                        paddingRight: 38,
                      }}>
                      <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                        Item
                      </Text>
                      {MRPvisible ? (
                        <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                          MRP(₹)
                        </Text>
                      ) : null}
                      <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                        Rate(₹)
                      </Text>
                      <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                        Qty.
                      </Text>
                      {HSNvisible ? (
                        <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                          HSN
                        </Text>
                      ) : null}
                      {taxVisible ? (
                        <>
                          <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                            Tax(%)
                          </Text>

                          <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                            Inclusive/Exclusive
                          </Text>
                        </>
                      ) : null}
                      <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                        Subtotal(₹)
                      </Text>
                    </View>
                    <View>
                      <SafeAreaView>
                        <FlatList
                          data={items}
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                        />
                      </SafeAreaView>
                    </View>
                  </View>
                )}
              </View>
              <View
                style={[
                  globalStyles.card,
                  {
                    width: '100%',
                    padding: 2,
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                ]}>
                <CustomButton
                  style={{
                    marginLeft: 5,
                  }}
                  title="Hold Bill"
                  color="#5194c6"
                  onPressFunction={() => {
                    if (items.length !== 0) {
                      setData(prev => ({
                        ...prev,
                        drafts: [
                          ...prev.drafts,
                          {
                            key: Math.random() * 100,
                            items: items,
                            createdAt: getTime(),
                            name: name,
                            num: num,
                          },
                        ],
                      }));
                      // setDraft(old => [
                      //   ...old,
                      //   {
                      //     key: Math.random() * 100,
                      //     items: items,
                      //     createdAt: getTime(),
                      //     name: name,
                      //     num: num,
                      //   },
                      // ]);
                      var time = getTime();
                      var stringItem = JSON.stringify({
                        items: items,
                      });
                      console.log('stringItem', stringItem);
                      try {
                        db.transaction(function (tx) {
                          tx.executeSql(
                            `INSERT INTO DraftDetails (createdAt, num, name, itemCount, amount, items) VALUES ("${time}","${num}","${name}","${items.length}","${totalAmount}","${items}")`,
                            [],
                          );
                          console.log('Draft inserted');
                        });
                      } catch (error) {
                        console.log('Error in addItem: ', error);
                      }
                      setItems([]);
                      setName(null);
                      setNum(null);
                    }
                  }}
                />
                <View style={{flexDirection: 'row'}}>
                  <CustomButton
                    style={{
                      borderColor: '#5194c6',
                      borderWidth: 1,
                      width: 150,
                      height: 40,
                      marginHorizontal: 5,
                    }}
                    title="Delivery Address"
                    textStyle={{
                      fontSize: 15,
                      fontWeight: '300',
                      color: 'black',
                    }}
                    onPressFunction={() => setDeliveryVisible(true)}
                  />
                  <CustomButton
                    style={{
                      borderColor: '#5194c6',
                      borderWidth: 1,
                      width: 150,
                      height: 40,
                      marginHorizontal: 5,
                    }}
                    title="Coupon Disc."
                    textStyle={{
                      fontSize: 15,
                      fontWeight: '300',
                      color: 'black',
                    }}
                    onPressFunction={() => setCouponVisible(true)}
                  />
                  <CustomButton
                    style={{
                      borderColor: '#5194c6',
                      borderWidth: 1,
                      width: 150,
                      height: 40,
                      marginHorizontal: 5,
                    }}
                    title="Notes"
                    textStyle={{
                      fontSize: 15,
                      fontWeight: '300',
                      color: 'black',
                    }}
                    onPressFunction={() => setNotesVisible(true)}
                  />
                </View>
              </View>
            </View>
            <CustomerDetails
              items={items}
              customerDetails={customerDetails}
              discountVisible={discountVisible}
              details={{
                name: name,
                num: num,
                setName: setName,
                setNum: setNum,
              }}
            />
          </View>
        ) : (
          <View
            style={[
              globalStyles.card,
              {
                marginVertical: 10,
                height: 400,
                width: '99.5%',
                padding: 0,
                alignItems: 'center',
              },
            ]}>
            {data.drafts.length === 0 ? (
              <Text style={{color: 'black', marginTop: 100}}>
                No Data to display
              </Text>
            ) : (
              <View
                style={{
                  // backgroundColor: 'lightgrey',
                  height: 300,
                  width: '100%',
                }}>
                <View
                  style={{
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderColor: 'black',
                    borderBottomWidth: 0.5,
                    paddingRight: 38,
                  }}>
                  <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                    Created at
                  </Text>
                  <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                    Mobile No.
                  </Text>
                  <Text style={[globalStyles.itemHeader, {flex: 1}]}>Name</Text>
                  <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                    Item Count
                  </Text>
                  <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                    Amount(Rs.)
                  </Text>
                  <Text style={[globalStyles.itemHeader, {flex: 1}]}>
                    Action
                  </Text>
                </View>
                <View>
                  <SafeAreaView>
                    <FlatList data={data.drafts} renderItem={renderDraft} />
                  </SafeAreaView>
                </View>
              </View>
            )}
          </View>
        )}
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          }}>
          <CustomButton
            title="items"
            color="grey"
            onPressFunction={() => {
              db.transaction(function (tx) {
                tx.executeSql(`SELECT * FROM "Items" `, [], function (tx, res) {
                  console.log('items button press', res.rows);
                });
              });
            }}
          />
          <CustomButton
            title="DraftDetails"
            color="grey"
            onPressFunction={() => {
              db.transaction(function (tx) {
                tx.executeSql(
                  `SELECT * FROM "DraftDetails" `,
                  [],
                  function (tx, res) {
                    console.log('Drafts button press', res.rows);
                  },
                );
              });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default ({navigation}) => {
  return (
    <NativeBaseProvider>
      <Billing />
    </NativeBaseProvider>
  );
};
