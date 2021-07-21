import React,{ useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';

import firebase from '../database/firebase';

const CreateUserScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const { name, email, phone } = state;

    const handleChangeText = ( name, value ) => {
        setState({ ...state, [name]: value });
    }

    const saveNewUser = async () => {
        //console.log( state );

        if( state.name === '' ) {
            alert( 'Please provide a name' );
        } else {
            try {
                await firebase.db.collection('users').add({
                    name,
                    email,
                    phone,
                });
    
                alert( 'Guardado!' );
                navigation.navigate( 'UsersListScreen' );
            } catch (error) {
                console.error(error);
                alert( 'Error!' );
            }

        }

    }

    return (
        <ScrollView style={ styles.container } >
            <View style={ styles.inputGroup } >
                <TextInput 
                    placeholder="Name User" 
                    onChangeText={ (value) => handleChangeText( 'name', value ) } 
                />
            </View>
            <View style={ styles.inputGroup } >
                <TextInput 
                    placeholder="Email User" 
                    onChangeText={ (value) => handleChangeText( 'email', value ) } 
                />
            </View>
            <View style={ styles.inputGroup } >
                <TextInput 
                    placeholder="Phone User" 
                    onChangeText={ (value) => handleChangeText( 'phone', value ) } 
                />
            </View>
            <View>
                <Button 
                    title="Save User" 
                    onPress={ () => saveNewUser() }
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
});


export default CreateUserScreen;