/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { RootState } from '../slices/store';
import { useSelector, useDispatch } from 'react-redux';
import { IState, setDescription } from '../slices/tasksSlice';

const arrKey = ['city', 'address', 'phone', 'description'];

const Viewer = ({ navigation }: any) => {

  const state = useSelector((state: RootState) => state.state);
  const dispatch = useDispatch();

  const [iState, setIniState] = useState({});

  const [count, setCount] = useState(0);

  const el: IState = state.users[count];

  const keys = Object.keys(el);

  const resArr = keys.map((key: string) => {
    if (arrKey.includes(key)) {
      return { [key]: false };
    }
  }).filter((el) => el !== undefined);

  const [infoUser, setInfoUser] = useState({ ...el, resArr });

  const avatar = (
    <Pressable
    // onPress={(): void => {
    // }}
    >
      <Image
        source={{
          uri: infoUser.avatar,
        }}
        style={styles.avatar}
      />
    </Pressable>
  );

  const iconСhange = (
    <Pressable
    // onPress={(): void => {
    // }}
    >
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/124/124474.png',
        }}
        style={styles.iconSave}
      />
    </Pressable>
  );

  const iconSave = (
    <Pressable
    // onPress={(): void => {
    // }}
    >
      <Image
        source={{
          uri: 'https://img.icons8.com/?size=512&id=41684&format=png',
        }}
        style={styles.iconSave}
      />
    </Pressable>
  );

  const content = () => {
    return infoUser.resArr.map((el: string) => {
      const key = Object.keys(el)[0];
      const icon = el[key] ? iconSave : iconСhange;

      const inputValue = <TextInput
        style={{
          height: 30,
          margin: 12,
          borderWidth: 1,
          padding: 5,
          color: '#000000',
        }}
        onChangeText={(e) => {
          const news: string = infoUser[key] = e;
          setInfoUser({ ...infoUser, [key]: news });
        }}
        value={infoUser.description}
      />;

      const i = el[key] ? inputValue : <Text style={styles.text}>{infoUser[key]}</Text>

      const res = (
        <View style={styles.infoText}>
          <Text style={styles.text}>{key}: </Text>
          {i}
          {icon}
        </View>
      );
      return <View style={{ marginLeft: 15 }} >{res}</View>;
    });
  };

  // const chache =

  const name = <Text style={{ marginTop: 25, fontSize: 25, color: '#000000' }}>{el.name}</Text>;

  const date1 = new Date(infoUser.date);

  const year = String(date1.getFullYear()).length === 1 ? `0${date1.getFullYear()}` : String(date1.getFullYear());
  const month = String(date1.getMonth()).length === 1 ? `0${date1.getMonth()}` : String(date1.getMonth());
  const day = String(date1.getDate()).length === 1 ? `0${date1.getDate()}` : String(date1.getDate());

  const strDate = <Text style={styles.text} >{`${year}-${month}-${day}`}</Text>;

  const date = <View style={styles.infoText}>
    <Text style={styles.text}>date: </Text>
    <Text style={styles.text}>{strDate}</Text>
    {iconСhange}
    {iconSave}
  </View>;

  const i = <TextInput
    style={{
      height: 30,
      margin: 12,
      borderWidth: 1,
      padding: 5,
      color: '#000000',
    }}
    onChangeText={(e) => {
      const news: string = infoUser.description = e;
      setInfoUser({ ...infoUser, description: news });
    }}
    value={infoUser.description}
  />;


  // const buttonSave = <Button
  //   onPress={async () => {
  //     let response = await fetch('https://6499a30479fbe9bcf83fa986.mockapi.io/list/1', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //       },
  //       body: JSON.stringify({ description: infoUser.description }),
  //     });
  //     const status = response.status;
  //     if (status === 200) {
  //       dispatch(setDescription({ value: infoUser.description, key: 'description', id: '1' }));
  //       alert('данные успешно обновлены');
  //       return;
  //     }
  //     alert(response.status);
  //   }}
  //   title="save"
  //   color="#841584"
  // />;

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
    <View style={styles.infoBloc}>
      {avatar}
      {name}
    </View>
    {/* <SafeAreaView>{inp}</SafeAreaView> */}
    {content()}
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginLeft: 0,
    color: '#000000',
  },
  add: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  infoText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 5,
  },
  iconSave: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  avatar: {
    width: 250,
    height: 250,
  },
  infoBloc: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
  },
  nameUser: {
    marginTop: 25,
    fontSize: 25,
    color: '#000000',
  },
});

export default Viewer;
