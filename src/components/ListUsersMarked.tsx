/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { RootState } from '../slices/store';
import { useSelector, useDispatch } from 'react-redux';
import { IState, addUsers } from '../slices/tasksSlice';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ListUsersMarked = ({ navigation }: any) => {

    const state = useSelector((state: RootState) => state.state);
    const dispatch = useDispatch();

    const markedUser = state.users.filter((el) => el.target);

    if (markedUser.length === 0) {
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', color: '#000000', }}>
            <Text>Вы не добавили ни одного  пользователя в избраные</Text>
            <Button
                title="вернуться к листу с пользователями"
                onPress={() => navigation.navigate('Home')}
            />
        </View>);
    }

    const renderUser = (el: IState, i: number) => {

        const imgStyle = { width: 100, height: 100, borderRadius: 50 };

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
        const name = <Text style={{ marginTop: 25, fontSize: 13, color: '#000000', }}>{el.name}</Text>;


        const date1 = new Date(el.date);

        const year = String(date1.getFullYear()).length === 1 ? `0${date1.getFullYear()}` : String(date1.getFullYear());
        const month = String(date1.getMonth()).length === 1 ? `0${date1.getMonth()}` : String(date1.getMonth());
        const day = String(date1.getDate()).length === 1 ? `0${date1.getDate()}` : String(date1.getDate());

        const strDate = <Text>{`${year}-${month}-${day}`}</Text>;

        const date = <Text style={styles.text}>date: {strDate}</Text>;
        const city = <Text style={styles.text}>city: {el.city}</Text>;
        const address = <Text style={styles.text}>address: {el.address}</Text>;
        const phone = <Text style={styles.text}>phone: {el.phone}</Text>;

        // const checkbox = <BouncyCheckbox
        //     bounceVelocityIn={10}
        //     fillColor="green"
        //     unfillColor="#FFFFFF"
        //     iconStyle={{ borderColor: 'red' }}
        //     innerIconStyle={{ borderWidth: 2 }}
        //     style={{ position: 'absolute', right: -30, bottom: 0 }}
        //     onPress={() => {
        //         dispatch(choiceUser(el));
        //     }}
        // />
        return (
            <View key={i} style={styles.bloc}>
                <View>
                    {avatar}
                    {name}
                </View>
                <View style={{ marginLeft: 5 }} >
                    {date}
                    {city}
                    {address}
                    {phone}
                    {/* {checkbox} */}
                </View>
            </View>
        );
    };

    const usersMarker = state.users.filter((el) => el.target);

    return (<View>
        <ScrollView>{usersMarker.map((el: IState, i: number) => renderUser(el, i))}</ScrollView>
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
        color: '#000000',
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

export default ListUsersMarked;
