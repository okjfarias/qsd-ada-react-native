import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const Home = () => {
  function signOut() {
    auth().signOut();
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />

      <Icon
        name="home"
        size={64}
        color="#4D0AB8"
        style={{textAlign: 'center'}}
      />
      <Text style={styles.title}>Bem-vindo(a) </Text>
      <Text>
        Oba! Você criou uma conta e conseguiu efetuar o login no app. Esta é a
        tela inicial.
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={{color: 'white', textAlign: 'center'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    marginTop: 32,
    color: '#4D0AB8',
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
  },
  logoutButton: {
    marginTop: 16,
    padding: 16,
    borderColor: '#4D0AB8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#4D0AB8',
  },
});
