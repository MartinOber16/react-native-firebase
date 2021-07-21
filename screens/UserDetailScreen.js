import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import firebase from '../database/firebase';

const UserDetailScreen = ({ route, navigation }) => {
    //console.log(route.params.userId);
    const [loading, setLoading] = useState(true);

    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: '',
    }

    const [user, setUser] = useState( initialState );

    const { id, name, email, phone } = user;

    const getUserById = async (userId) => {
        try {
            const dbRef = await firebase.db.collection('users').doc(userId);
            const doc = await dbRef.get();
            const userDB = doc.data();
            //console.log(userDB);
            setUser({ 
                ...userDB,
                id: doc.id,
            });
            
        } catch (error) {
            console.error(error);
            alert('Error!');
        }
        setLoading(false);
    }

    const updateUser = async () => {
        try {
            const dbRef = await firebase.db.collection('users').doc(id);
            await dbRef.set({
                name,
                email,
                phone,
            });
            setUser( initialState );
            navigation.navigate('UsersListScreen');
        } catch (error) {
            console.error(error);
            alert('Error!');
        }
    }

    const deleteUser = async () => {
        try {
            const dbRef = await firebase.db.collection('users').doc(id);
            await dbRef.delete();
            navigation.navigate('UsersListScreen');
        } catch (error) {
            console.error(error);
            alert('Error!');
        }
    }

    const openConfirmationAlert = () => {
        Alert.alert( 'Remove the user', 'Are you sure?', [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log(false) }
        ]);
    }

    useEffect(() => {
        getUserById(route.params.userId);
    }, [])

    const handleChangeText = ( name, value ) => {
        setUser({ ...user, [name]: value });
    }
    
    if( loading ) {
        return (
            <View>
                <ActivityIndicator 
                    color="#9e9e9e"
                    size="large"
                />
            </View>
        )
    }


    return (
        <ScrollView style={ styles.container } >
            <View style={ styles.inputGroup } >
                <TextInput 
                    placeholder="Name User" 
                    value={ name }
                    onChangeText={ (value) => handleChangeText( 'name', value ) } 
                />
            </View>
            <View style={ styles.inputGroup } >
                <TextInput 
                    placeholder="Email User" 
                    value={ email }
                    onChangeText={ (value) => handleChangeText( 'email', value ) } 
                />
            </View>
            <View style={ styles.inputGroup } >
                <TextInput 
                    placeholder="Phone User" 
                    value={ phone }
                    onChangeText={ (value) => handleChangeText( 'phone', value ) } 
                />
            </View>
            <View>
                <Button 
                    color="#19AC52"
                    title="Update User" 
                    onPress={ () => updateUser() }
                />
            </View>
            <View>
                <Button 
                    color="#E37399"
                    title="Delete User" 
                    onPress={ () => openConfirmationAlert() }
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',

    }
})

export default UserDetailScreen;