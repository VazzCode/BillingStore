/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  Button,
  Input,
  FormControl,
  Center,
  NativeBaseProvider,
  Text,
  CloseIcon,
  Select,
  Box,
  CheckIcon,
  Radio,
  Checkbox,
  ScrollView,
} from 'native-base';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../../utils/GlobalStyles';

export default function ShortCuts({
  modalVisible,
  setModalVisible,
  setMRPvisible,
  MRPvisible,
  HSNvisible,
  setHSNvisible,
  taxVisible,
  setTaxVisible,
  customerDetails,
  setCustomerDetails,
  discountVisible,
  setDiscountVisible,
}) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [itemName, setItemName] = useState('');
  const [MRP, setMRP] = useState(0);
  const [rate, setRate] = useState(0);
  const [unitM, setUnitM] = useState('');
  const [units, setUnits] = useState(null);
  const [Qty, setQty] = useState(0);
  const [incExc, setIncExc] = useState(null);

  const [printerType, setPrinterType] = useState('');

  return (
    <SafeAreaView>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        size={'full'}
        // margin={20}
        // paddingX={50}
        // paddingX={10}
        margin="2%"
        height="90%"
        width="95%">
        <Modal.Content>
          {/* <Modal.CloseButton /> */}
          <Modal.Header
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text fontSize={30} color={'#ff4757'}>
              ShortCut Keys
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </Modal.Header>
          <Modal.Body>
            <View
              style={{
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              {/* Bill Settings */}
              <View style={{}}>
                <View style={globalStyles.shortCutBox}>
                  <Text fontSize={25} color={'#ff4757'} mb={3}>
                    DashBoard
                  </Text>
                  <ShortView shrt={'Ctrl'} desc={'+ F1 - Dashboard'} />
                </View>
                <View style={globalStyles.shortCutBox}>
                  <Text fontSize={25} color={'#ff4757'} mb={3}>
                    Billing
                  </Text>
                  <ShortView shrt={'Ctrl'} desc={'+ F2 - Billing'} />
                  <ShortView shrt={'Alt'} desc={'+ S - Search and Add Item'} />
                  <ShortView shrt={'Alt'} desc={'+ K - Scan Product'} />
                  <ShortView shrt={'Alt'} desc={'+ B - Generate Bill'} />
                  <ShortView shrt={'Alt'} desc={'+ P - Payment Mode'} />
                  <ShortView shrt={'Alt'} desc={'+ I - Add New Item'} />
                  <ShortView shrt={'Alt'} desc={'+ H - Hold Bill'} />
                  <ShortView
                    shrt={'Alt'}
                    desc={'+ C - Enter Customer details'}
                  />
                  <ShortView shrt={'Alt'} desc={'+ D - Coupon Discount'} />
                  <ShortView shrt={'Alt'} desc={'+ A - Delivery Address'} />
                  <ShortView shrt={'Alt'} desc={'+ N - Notes'} />
                  <ShortView shrt={'Alt'} desc={' + T - Advance Settings'} />
                </View>
              </View>
              {/* Line Item Settings */}
              <View style={{}}>
                <View style={globalStyles.shortCutBox}>
                  <Text fontSize={25} color={'#ff4757'} mb={3}>
                    Shop Items
                  </Text>
                  <ShortView shrt={'Ctrl'} desc={'+ F3 - Shop Items'} />
                  <ShortView shrt={'Alt'} desc={' + N - Add Item/product'} />
                  <ShortView
                    shrt={'Alt'}
                    desc={'+ U - Add Excel upload for product'}
                  />
                  <ShortView shrt={'Alt'} desc={'+ T - Tax Master'} />
                </View>
                <View style={globalStyles.shortCutBox}>
                  <Text fontSize={25} color={'#ff4757'} mb={3}>
                    Reports
                  </Text>
                  <ShortView shrt={'Ctrl'} desc={'+ F5 - Reports'} />
                  <ShortView shrt={'Alt'} desc={'+ D - Download Report'} />
                  <ShortView shrt={'Alt'} desc={'+ S - Search'} />
                  <ShortView shrt={'Alt'} desc={'+ E - Export'} />
                </View>
                <View style={globalStyles.shortCutBox}>
                  <Text fontSize={25} color={'#ff4757'} mb={3}>
                    Stock Value Report
                  </Text>
                  <ShortView shrt={'Ctrl'} desc={'+ F6 - Stock Value Report'} />
                  <ShortView shrt={'Alt'} desc={'+ S - Search'} />
                  <ShortView shrt={'Alt'} desc={'+ E - Export'} />
                </View>
              </View>
              <View style={{}}>
                <View style={globalStyles.shortCutBox}>
                  <Text fontSize={25} color={'#ff4757'} mb={3}>
                    Loyalty Points
                  </Text>
                  <ShortView shrt={'Ctrl'} desc={'+ F7 - Loyalty Points'} />
                  <ShortView shrt={'Alt'} desc={'+ A - Add Point'} />
                  <ShortView shrt={'Alt'} desc={'+ R - Redeem Coupon'} />
                  <ShortView shrt={'Alt'} desc={'+ H - Points History'} />
                </View>
                <View style={globalStyles.shortCutBox}>
                  <Text fontSize={25} color={'#ff4757'} mb={3}>
                    Customer Management
                  </Text>
                  <ShortView
                    shrt={'Ctrl'}
                    desc={'+ F8 - Customer Management'}
                  />
                  <ShortView shrt={'Alt'} desc={'+ S - Search Customer'} />
                </View>
                <View style={globalStyles.shortCutBox}>
                  <Text fontSize={25} color={'#ff4757'} mb={3}>
                    Vendor Managementement
                  </Text>
                  <ShortView shrt={'Ctrl'} desc={'+ F9 - Vendor Management'} />
                  <ShortView shrt={'Alt'} desc={'+ A - Add Vender'} />
                  <ShortView
                    shrt={'Alt'}
                    desc={'+ T - Download tax input report'}
                  />
                </View>
                <View style={globalStyles.shortCutBox}>
                  <Text fontSize={25} color={'#ff4757'} mb={3}>
                    Employee Access
                  </Text>
                  <ShortView shrt={'Ctrl'} desc={'+ F10 - Employee Access'} />
                </View>
                <View style={globalStyles.shortCutBox}>
                  <Text fontSize={25} color={'#ff4757'} mb={3}>
                    Settings
                  </Text>
                  <ShortView shrt={'Ctrl'} desc={'+ F11 - Settingss'} />
                </View>
              </View>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}

const ShortView = ({shrt, desc}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    }}>
    <View
      style={{
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        paddingHorizontal: 15,
        borderRadius: 5,
        borderColor: 'black',
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 1,
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 16,
          fontWeight: '700',
        }}>
        {shrt}
      </Text>
    </View>
    <Text style={{color: 'black', fontSize: 16, fontWeight: '700'}}>
      {'  ' + desc}
    </Text>
  </View>
);
