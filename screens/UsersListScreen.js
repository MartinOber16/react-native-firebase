import React, { useEffect, useState } from 'react';
import { Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar } from 'react-native-elements';

import firebase from '../database/firebase';

const UsersListScreen = ({ navigation }) => {

    const [users, setUsers] = useState([]);

    const getData = async () =>{
        try {
            await firebase.db.collection( 'users' ).onSnapshot( querySnapshot => {
                const usersDB = [];
                querySnapshot.docs.forEach( doc => {
                    //console.log( doc.data() );
                    const { name, email, phone } = doc.data()
                    usersDB.push({
                        id: doc.id,
                        name,
                        email,
                        phone,
                    });

                });

                setUsers( usersDB );
            });
        } catch (error) {
            console.error(error);
            alert('Error!');
        }

    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <ScrollView>
            <Button 
                title="Create user" 
                onPress={ () => navigation.navigate( 'CreateUserScreen' ) } 
            />
            {
                users.map( user => {
                    return (
                        <ListItem 
                            key={ user.id }
                            bottomDivider
                            onPress={ () => navigation.navigate( 'UserDetailScreen', {
                                userId: user.id,
                            }) }
                        >
                            <ListItem.Chevron />
                            <Avatar 
                                source={{ uri: 'https://www.soycarmin.com/__export/1494106008205/sites/debate/img/2017/05/06/blogmio.jpg_2120446623.jpg' }} 
                                rounded
                            />
                            <ListItem.Content>
                                <ListItem.Title>{ user.name }</ListItem.Title>
                                <ListItem.Subtitle>{ user.email }</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }

        </ScrollView>

    )
}


export default UsersListScreen;