import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);

  function createUser() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('user: ' + userCredential);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show(
            'Já existe uma conta com o endereço de email fornecido.',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
        }
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show(
            'O endereço de e-mail não é válido.',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
        }
      });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />

      <Icon
        name="user-plus"
        size={64}
        color="#4D0AB8"
        style={{textAlign: 'center'}}></Icon>

      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        style={styles.inputField}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Senha"
        value={password}
        secureTextEntry={seePassword}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.showPassword}
        onPress={() => setSeePassword(!seePassword)}>
        <Icon
          name={seePassword ? 'eye' : 'eye-slash'}
          size={28}
          color="black"
        />
      </TouchableOpacity>

      {email === '' || password === '' ? (
        <TouchableOpacity
          disabled
          style={styles.buttonDisabled}>
          <Text style={{color: 'white', textAlign: 'center'}}>Criar conta</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={createUser}>
          <Text style={{color: 'white', textAlign: 'center'}}>Criar conta</Text>
        </TouchableOpacity>
      )}

      <View style={styles.loginPageButton}>
        <Text>Já possui uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
          <Text
            style={{
              color: '#4D0AB8',
              textAlign: 'center',
              textDecorationLine: 'underline',
            }}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 32,
    color: '#4D0AB8',
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
  },
  inputField: {
    marginTop: 16,
    padding: 16,
    borderColor: '#4D0AB8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
  },
  createAccountButton: {
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#4D0AB8',
  },
  loginPageButton: {
    marginTop: 4,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  showPassword: {
    position: 'relative',
    bottom: 45,
    left: 330,
  },
  buttonDisabled: {
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#808080',
  },
});
