import {View, Text, TextInput, Dimensions} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Radio} from 'native-base';
import {globalStyles} from '../../../utils/GlobalStyles';
import CustomButton from '../../../utils/CustomButton';
import Barcode from '@kichiyaki/react-native-barcode-generator';

export default function CustomerDetails({
  items,
  customerDetails,
  discountVisible,
  details,
}) {
  const [value, setValue] = React.useState(null);
  const subTotal = useMemo(() => {
    let result = 0;
    if (items.length > 0) {
      items.forEach(i => {
        result += parseInt(i.subTotal);
      });
    }
    return result;
  }, [items]);

  return (
    <View
      style={[
        globalStyles.card,
        {
          marginTop: -50,
          height: 540,
          width: '28%',
          margin: 10,
          alignItems: 'flex-start',
          padding: 10,
        },
      ]}>
      {!customerDetails ? (
        <>
          <Text style={{color: 'grey', marginLeft: 5}}>Customer Details</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Number"
              placeholderTextColor="grey"
              textContentType="telephoneNumber"
              value={details.num}
              onChangeText={details.setNum}
              style={[
                globalStyles.input,
                {
                  width: '47%',
                  height: 40,
                  fontSize: 16,
                  fontStyle: 'italic',
                  borderWidth: 1,
                  backgroundColor: 'white',
                  borderColor: 'grey',
                  margin: 5,
                },
              ]}
            />
            <TextInput
              placeholder="Name"
              placeholderTextColor="grey"
              value={details.name}
              onChangeText={details.setName}
              style={[
                globalStyles.input,
                {
                  width: '47%',
                  fontSize: 16,
                  fontStyle: 'italic',
                  height: 40,
                  borderWidth: 1,
                  backgroundColor: 'white',
                  borderColor: 'grey',
                  margin: 5,
                },
              ]}
            />
          </View>
        </>
      ) : null}
      <Text style={{color: 'grey', marginLeft: 5}}>Payment Method</Text>

      <Radio.Group
        style={{
          margin: 10,
          height: 100,
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
        name="myRadioGroup"
        accessibilityLabel="favorite number"
        value={value}
        onChange={nextValue => {
          setValue(nextValue);
        }}>
        <Radio value="cash" my={1}>
          <Text style={{color: 'black', fontStyle: 'italic', fontSize: 16}}>
            Cash Amount
          </Text>
        </Radio>
        <Radio value="card" my={1}>
          <Text style={{color: 'black', fontStyle: 'italic', fontSize: 16}}>
            Debit/Credit Card
          </Text>
        </Radio>
        <Radio value="upi" my={1}>
          <Text style={{color: 'black', fontStyle: 'italic', fontSize: 16}}>
            UPI Pay
          </Text>
        </Radio>
        <Radio value="creditsale" my={1}>
          <Text style={{color: 'black', fontStyle: 'italic', fontSize: 16}}>
            Credit Sale
            {'               '}
          </Text>
        </Radio>
      </Radio.Group>
      <View
        style={{
          width: '100%',
          height: customerDetails ? 380 : 300,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: 32,
            paddingHorizontal: 24,
          }}></View>
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderRadius: 1,
            borderColor: 'black',
            width: '100%',
            marginHorizontal: 20,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            margin: 10,
          }}>
          <Text style={{color: 'black'}}>Subtotal</Text>
          <Text style={{color: 'black'}}>₹{subTotal.toFixed(2)}</Text>
        </View>
        {discountVisible ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 10,
            }}>
            <Text style={{color: 'black', fontWeight: '300', fontSize: 12}}>
              Discount
            </Text>
            {/* <Text style={{color: 'black'}}>₹{discoun.toFixed(2)}</Text> */}
          </View>
        ) : null}
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderRadius: 1,
            borderColor: 'black',
            width: '100%',
            marginHorizontal: 20,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            margin: 10,
          }}>
          <Text style={{color: '#128c7e', fontSize: 16, fontWeight: '300'}}>
            Total Amount
          </Text>
          <Text style={{color: '#128c7e', fontSize: 16, fontWeight: '300'}}>
            ₹{subTotal.toFixed(2)}
          </Text>
        </View>
        <CustomButton
          style={{
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.2,
            width: '100%',
            marginBottom: 0,
          }}
          title="Generate Bill"
          color="#ff4757"
          onPressFunction={() => {}}
        />
      </View>
    </View>
  );
}
