/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { RootState } from '../slices/store';
import { useSelector, useDispatch } from 'react-redux';
import { IState, setDescription } from '../slices/tasksSlice';



const Viewer = ({ navigation }: any) => {

  const state = useSelector((state: RootState) => state.state);
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  const el: IState = state.users[count];

  const [infoUser, setInfoUser] = useState(el);

  // const st = (key, value, object) => {

  // };

  const imgStyle = { width: 250, height: 250 };

  const avatar = (
    <Pressable onPress={(): void => {
      // navigation.navigate('Details');
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

  const name = <Text style={{ marginTop: 25, fontSize: 25 }}>{el.name}</Text>;

  const date1 = new Date(el.date);

  const year = String(date1.getFullYear()).length === 1 ? `0${date1.getFullYear()}` : String(date1.getFullYear());
  const month = String(date1.getMonth()).length === 1 ? `0${date1.getMonth()}` : String(date1.getMonth());
  const day = String(date1.getDate()).length === 1 ? `0${date1.getDate()}` : String(date1.getDate());

  const strDate = <Text style={styles.text} >{`${year}-${month}-${day}`}</Text>;
  const date = <Text style={styles.text}>date: {strDate}</Text>;
  const city = <Text style={styles.text}>city: {el.city}</Text>;
  const address = <Text style={styles.text}>address: {el.address}</Text>;
  const phone = <Text style={styles.text}>phone: {el.phone}</Text>;

  const i = <TextInput
    style={{
      height: 30,
      margin: 12,
      borderWidth: 1,
      padding: 5,
    }}
    onChangeText={(e) => {
      const news: string = infoUser.description = e;
      setInfoUser({ ...infoUser, description: news });
    }}
    value={infoUser.description}
  />;

  const description = <Text style={styles.text}>description:</Text>;

  // const keys = Object.keys(el);

  // const inp = keys.map((key, i: number) => {
  //   return (
  //     <TextInput
  //       key={i}
  //       style={{
  //         height: 35,
  //         width: 200,
  //         margin: 12,
  //         borderWidth: 1,
  //         padding: 10,
  //       }}
  //       onChangeText={(e) => {
  //         infoUser[key] + e;

  //         setInfoUser({ ...infoUser });
  //       }}
  //     // value={infoUser.key}
  //     />);
  // });

  return (<View  >
    <View style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', padding: 10 }}>
      {avatar}
      {name}
    </View>
    <View style={{ marginLeft: 5 }} >
      {date}
      {city}
      {address}
      {phone}
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} >
        {description}
        {i}
        <Button
          onPress={async () => {
            let response = await fetch('https://6499a30479fbe9bcf83fa986.mockapi.io/list/1', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify({ description: infoUser.description }),
            });
           const status = response.status;
            if (status === 200) {
              dispatch(setDescription({ value: infoUser.description, key: 'description', id: '1' }));
              alert('данные успешно обновлены');
              return;
            }
            alert(response.status);
          }}
          title="save"
          color="#841584"
        />
      </View>
    </View>
    {/* <SafeAreaView>{inp}</SafeAreaView> */}
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginLeft: 0,
    // marginTop: 5,
  },
  add: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default Viewer;
