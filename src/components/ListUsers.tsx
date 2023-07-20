/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { RootState } from '../slices/store';
import { useSelector, useDispatch } from 'react-redux';
import { IState, addUsers, choiceUser } from '../slices/tasksSlice';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Picker } from '@react-native-picker/picker';

const ListUsers = ({ navigation }: any) => {

  const state = useSelector((state: RootState) => state.state);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('');

  const [selectedValue, setSelectedValue] = useState('');

  if (state.users.length === 0) {
    fetch('https://6499a30479fbe9bcf83fa986.mockapi.io/list')
      .then(res => res.json())
      .then(
        result => {
          dispatch(addUsers(result));
        },
        error => {
          console.log(error);
        },
      );
    return null;
  }

  const renderUser = (el: IState, i: number) => {
    const imgStyle = { width: 100, height: 100, borderRadius: 50 };

    const avatar = (
      <Pressable onPress={(): void => {
        navigation.navigate('Viewer');
        // dispatch(choiceUser({el}));
        // console.log(state.users.filter((el) => el.id === '1'));
        // const newState = state.map((elState: IState) => {
        //   elState.target = elState.id === el.id ? true : false;
        //   return elState;
        // });
        // setState(newState);
      }}>
        <Image
          source={{
            uri: el.avatar,
          }}
          style={imgStyle}
        />
      </Pressable>
    );
    const name = <Text style={{ marginTop: 25, fontSize: 13 }}>{el.name}</Text>;

    const date1 = new Date(el.date);

    const year = String(date1.getFullYear()).length === 1 ? `0${date1.getFullYear()}` : String(date1.getFullYear());
    const month = String(date1.getMonth()).length === 1 ? `0${date1.getMonth()}` : String(date1.getMonth());
    const day = String(date1.getDate()).length === 1 ? `0${date1.getDate()}` : String(date1.getDate());

    const strDate = <Text>{`${year} ${month} ${day}`}</Text>;
    const date = <Text style={styles.text}>date: {strDate}</Text>;
    const city = <Text style={styles.text}>city: {el.city}</Text>;
    const address = <Text style={styles.text}>address: {el.address}</Text>;
    const phone = <Text style={styles.text}>phone: {el.phone}</Text>;

    const checkbox = <BouncyCheckbox
      bounceVelocityIn={10}
      fillColor="green"
      unfillColor="#FFFFFF"
      iconStyle={{ borderColor: 'red' }}
      innerIconStyle={{ borderWidth: 2 }}
      style={{ position: 'absolute', right: -10, bottom: 5 }}
      onPress={() => {
        dispatch(choiceUser(el));
      }}
    />;
    return (
      <View key={i} style={styles.bloc}>
        <View >
          {avatar}
          {name}
        </View>
        <View style={{ marginLeft: 25 }} >
          {date}
          {city}
          {address}
          {phone}
        </View>
        {checkbox}
      </View>
    );
  };

  const keyExceptions = ['id', 'avatar', 'description', 'target', 'date'];

  const keyPicker = Object.keys(state.users[0]).filter((el: string) => !keyExceptions.includes(el));

  const renderState = selectedValue === '' ? state.users : state.users.filter((el) => (el[selectedValue].toLocaleLowerCase().startsWith(filter.toLocaleLowerCase())));

  // const renderState = state.users;

  return (<View>
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", }} >
      <TextInput
        style={styles.input}
        onChangeText={setFilter}
        value={filter}
      />
      <View style={styles.Picker} >
        <Picker
          style={{ width: 150, position: 'relative', top: -7, color: '#000000', }}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {keyPicker.map((key: string, i: number) => <Picker.Item key={i} label={key} value={key} style={{ fontSize: 12 }} />)}
        </Picker>
      </View>
    </View>
    <Button
      title="Посмотреть Избранные"
      onPress={() => navigation.navigate('Details')}
    />
    <ScrollView>{renderState.map((el: IState, i: number) => renderUser(el, i))}</ScrollView>
  </View>);
};

const styles = StyleSheet.create({
  h1: {
    backgroundColor: '#7FFFD4',
    color: '#000000',
    fontSize: 25,
    fontWeight: '700',
    padding: 20,
    textAlign: 'center',
  },
  bloc: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(245, 245, 220)',
    padding: 5,
    margin: 5,
    borderWidth: 5,
  },
  text: {
    fontSize: 15,
    marginLeft: 0,
    marginTop: 5,
    color: '#000000',
  },
  add: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  input: {
    color: '#000000',
    height: 35,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  Picker: {
    width: 'auto',
    height: 35,
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 25,
  },
});

export default ListUsers;
