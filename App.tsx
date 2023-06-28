/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface IState {
  id: number;
  createdAt: Date;
  name: string;
  avatar: string;
  city: string;
  address: string;
  phone: string;
  target?: boolean;
}

const App = () => {
  const initState = [] as any;

  const [state, setState] = useState(initState);

  useEffect(() => {
    fetch('https://6499a30479fbe9bcf83fa986.mockapi.io/list')
      .then(res => res.json())
      .then(
        result => {
          setState(result);
        },
        error => {
          console.log(error);
        },
      );
  }, []);

  const renderUser = (el: IState) => {

    const imgStyle = { width: 100, height: 100, borderRadius: 50 };

    const avatar = (
      <Pressable onPress={(): void => {
        const newState = state.map((elState: IState) => {
          elState.target = elState.id === el.id ? true : false;
          return elState;
        });
        setState(newState);
      }} >
        <Image
          source={{
            uri: el.avatar,
          }}
          style={imgStyle}
        />
      </Pressable>
    );
    const name = <Text style={{ marginTop: 25, fontSize: 13 }}>{el.name}</Text>;

    const strDate = <Text>{el.createdAt.toString()}</Text>;
    const date = <Text style={styles.text}>date: {strDate}</Text>;
    const city = <Text style={styles.text}>city: {el.city}</Text>;
    const address = <Text style={styles.text}>address: {el.address}</Text>;
    const phone = <Text style={styles.text}>phone: {el.phone}</Text>;

    const checkbox = <BouncyCheckbox
      bounceVelocityIn={1}
      fillColor="green"
      unfillColor="#FFFFFF"
      iconStyle={{ borderColor: 'red' }}
      innerIconStyle={{ borderWidth: 1 }}
      style={{ position: 'absolute', right: -30, bottom: 0 }}
      onPress={() => {
        const newState = state.map((elState: IState) => {
          elState.target = elState.id === el.id;
          return elState;
        });
        setState([...newState]);
      }}
    />


    return (
      <View style={styles.bloc}>
        <View>
          {avatar}
          {name}
        </View>
        <View style={{ marginLeft: 5 }} >
          {date}
          {city}
          {address}
          {phone}
          {checkbox}
        </View>
      </View>
    );
  };

  return (
    <>
      <Text style={styles.h1}>Выберите кандидата</Text>
      <ScrollView>{state.map((el: IState) => renderUser(el))}</ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  h1: {
    backgroundColor: '#7FFFD4',
    color: '#000',
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
  },
  add: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default App;
