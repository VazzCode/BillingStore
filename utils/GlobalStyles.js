import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  text: {
    color: 'black',
  },
  errorText: {
    color: 'red',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    color: 'black',
    padding: 10,
    backgroundColor: '#f1f2f6',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    marginBottom: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  mainscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: null,
    height: 60,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  heading: {
    color: '#ef4667',
    fontSize: 30,
  },
  card: {
    padding: 42,
    width: '20%',
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
  },
  itemInput: {
    width: 250,
  },
  shopAddInput: {
    width: 400,
  },
  itemHeader: {
    color: 'black',
    fontSize: 17,
    marginHorizontal: 10,
  },
  adv: {
    height: '95%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    flex: 1,
    margin: 10,
  },
  shortCutBox: {
    borderBottomWidth: 0.25,
    borderBottomColor: 'grey',
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
});
