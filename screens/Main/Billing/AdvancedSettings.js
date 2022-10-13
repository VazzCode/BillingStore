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
  Select,
  Box,
  CheckIcon,
  Radio,
  Checkbox,
  ScrollView,
} from 'native-base';
import {SafeAreaView, TextInput, View} from 'react-native';
import {globalStyles} from '../../../utils/GlobalStyles';

export default function AdvancedSettings({
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
            <Text fontSize={30}> Advanced Settings</Text>
            <Text fontSize={17} marginRight={-740}>
              Printer Type:
            </Text>
            <Radio.Group
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={printerType}
              onChange={nextValue => setPrinterType(nextValue)}>
              <Radio value="thermal">Thermal </Radio>
              <Radio value="a4">A4</Radio>
            </Radio.Group>
          </Modal.Header>
          <Modal.Body>
            <View
              style={{
                height: '100%',
                flexDirection: 'row',
              }}>
              {/* Bill Settings */}
              <View style={[globalStyles.adv]}>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'black',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      globalStyles.heading,
                      {paddingVertical: 10, paddingBottom: 20},
                    ]}>
                    Bill Settings
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      Add Discount
                    </Text>
                    <Checkbox
                      value={discountVisible}
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                      onChange={() => setDiscountVisible(prev => !prev)}
                    />
                  </View>
                  <Text style={{color: 'grey', fontSize: 0}}>
                    Discount will be applied on the sub total.
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'black',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      Other Charges
                    </Text>
                    <Checkbox
                      value="test"
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                    />
                  </View>
                  <Text style={{color: 'grey', fontSize: 0}}>
                    Create your own custom charges
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'black',
                    padding: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      Delivery Address
                    </Text>
                    <Checkbox
                      value="test"
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                    />
                  </View>
                </View>
                <View
                  style={{
                    padding: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16, width: 300}}>
                      Disable Customer name and Customer mobile number
                    </Text>
                    <Checkbox
                      value={customerDetails}
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                      onChange={() => setCustomerDetails(prev => !prev)}
                    />
                  </View>
                </View>
              </View>
              {/* Line Item Settings */}
              <View style={globalStyles.adv}>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'black',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      globalStyles.heading,
                      {paddingVertical: 10, paddingBottom: 20},
                    ]}>
                    Line Item Settings
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>Item MRP</Text>
                    <Checkbox
                      value={MRPvisible}
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                      onChange={() => setMRPvisible(prev => !prev)}
                    />
                  </View>
                  <Text style={{color: 'grey', fontSize: 0}}>
                    Add MRP of the product.
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'black',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      Item Discount
                    </Text>
                    <Checkbox
                      value="test"
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                    />
                  </View>
                  <Text style={{color: 'grey', fontSize: 0}}>
                    Discount will be added to the product level.
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'black',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>HSN Code</Text>
                    <Checkbox
                      value={HSNvisible}
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                      onChange={() => setHSNvisible(prev => !prev)}
                    />
                  </View>
                  <Text style={{color: 'grey', fontSize: 0}}>
                    Add HSN code of the product if available.
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'black',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      Item Level Taxes
                    </Text>
                    <Checkbox
                      value={taxVisible}
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                      onChange={() => setTaxVisible(prev => !prev)}
                    />
                  </View>
                  <Text style={{color: 'grey', fontSize: 0}}>
                    Apply Tax for separate Items
                  </Text>
                </View>
                <View
                  style={{
                    padding: 20,
                    paddingBottom: 30,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      IMEI1/IMEI2
                    </Text>
                    <Checkbox
                      value="test"
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                    />
                  </View>
                  <Text style={{color: 'grey', fontSize: 0}}>
                    Add IMEI number of the product
                  </Text>
                </View>
              </View>
              <View style={globalStyles.adv}>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'black',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      globalStyles.heading,
                      {paddingVertical: 10, paddingBottom: 20},
                    ]}>
                    Invoice Settings
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      Terms and Conditions
                    </Text>
                    <Checkbox
                      value="test"
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                    />
                  </View>
                  <Text style={{color: 'grey', fontSize: 0}}>
                    Add your terms and conditions(displayed in invoice)
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'black',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      Payment Terms and Conditions
                    </Text>
                    <Checkbox
                      value="test"
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                    />
                  </View>
                  <Text style={{color: 'grey', fontSize: 0}}>
                    Add your payment terms and conditions(displayed in invoice).
                  </Text>
                </View>
                <View
                  style={{
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      Invoice Prefix/Suffix
                    </Text>
                    <Checkbox
                      value="test"
                      accessibilityLabel="This is a dummy checkbox"
                      colorScheme="rose"
                    />
                  </View>
                  <Text style={{color: 'grey', fontSize: 0}}>
                    Add Invoice Prefix and Suffix.{' '}
                  </Text>
                </View>
              </View>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  setModalVisible(false);
                }}>
                Go Back
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}
