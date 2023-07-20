/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { RootState } from '../slices/store';
import { useSelector, useDispatch } from 'react-redux';
import { IState, setDescription } from '../slices/tasksSlice';

const arrKey = ['city', 'address', 'phone', 'description'];

const Viewer = ({ navigation }: any) => {

  const state = useSelector((state: RootState) => state.state);

  const dispatch = useDispatch();

  // const [iState, setIniState] = useState({});

  const count = 0;

  const el: IState = state.users[count];

  const keys = Object.keys(el);

  const resArr = keys.map((key: string) => {
    if (arrKey.includes(key)) {
      return { [key]: false };
    }
  }).filter((el) => el !== undefined);

  const [infoUser, setInfoUser] = useState<IState>({ ...el, resArr });

  const avatar = (
    <Pressable
      onPress={(): void => {
        console.log('ff');
      }}
    >
      <Image
        source={{
          uri: infoUser.avatar,
        }}
        style={styles.avatar}
      />
    </Pressable>
  );

  const iconСhange = (key: string) => {
    return <Pressable
      onPress={(): void => {
        const resArr = infoUser.resArr.map((elArr: { [key: string]: boolean; }) => {
          if (elArr.hasOwnProperty(key)) {
            elArr[key] = true;
          }
          return elArr;
        });
        setInfoUser({ ...infoUser, resArr });
      }}
    >
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/124/124474.png',
        }}
        style={styles.iconSave}
      />
    </Pressable>;
  };

  const iconSave = (key: string) => {
    return <Pressable
      onPress={(): void => {
        const resArr = infoUser.resArr.map((elArr: { [key: string]: boolean; }) => {
          if (elArr.hasOwnProperty(key)) {
            elArr[key] = false;
          }
          return elArr;
        });
        setInfoUser({ ...infoUser, resArr });
      }}
    >
      <Image
        source={{
          uri: 'https://img.icons8.com/?size=512&id=41684&format=png',
        }}
        style={styles.iconSave}
      />
    </Pressable>;
  };

  const content = () => {
    return infoUser.resArr.map((elNew: IState, iNum: number) => {
      const key = Object.keys(elNew)[0];
      const icon = elNew[key] ? iconSave(key) : iconСhange(key);

      const inputValue = <TextInput
        style={{
          height: 30,
          margin: 12,
          borderWidth: 1,
          padding: 5,
          marginRight: 20,
          width: '50%',
          flex: 0,
        }}
        onChangeText={(e) => {
          const news: string = infoUser[key] = e;
          setInfoUser({ ...infoUser, [key]: news });
        }}
        // editable
        multiline
        value={infoUser[key]}
      />;

      const valueText: string = infoUser[key];

      const value = elNew[key] ? inputValue : <Text style={styles.text}>{valueText}</Text>;

      const res = (
        <View style={styles.infoText}>
          <Text style={styles.text}>{key}: </Text>
          {value}
          {icon}
        </View>
      );
      return <View key={iNum} style={{ marginLeft: 15 }} >{res}</View>;
    });
  };

  const name = <Text style={{ marginTop: 25, fontSize: 25, color: '#000000' }}>{el.name}</Text>;
  // const date1 = new Date(infoUser.date);
  // const year = String(date1.getFullYear()).length === 1 ? `0${date1.getFullYear()}` : String(date1.getFullYear());
  // const month = String(date1.getMonth()).length === 1 ? `0${date1.getMonth()}` : String(date1.getMonth());
  // const day = String(date1.getDate()).length === 1 ? `0${date1.getDate()}` : String(date1.getDate());
  // const strDate = <Text style={styles.text} >{`${year}-${month}-${day}`}</Text>;

  return (<View  >
    <View style={styles.infoBloc}>
      {avatar}
      {name}
    </View>
    {content()}
  </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginLeft: 0,
    color: '#000000',
    flex: 0,
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
    backgroundColor: 'red',
    marginRight: 10,
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
