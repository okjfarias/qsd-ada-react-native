import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);

  function login() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Usuário logado');
      })
      .catch(error => {
        console.log(error);

        if (error.code == 'auth/invalid-email') {
          ToastAndroid.show(
            'Insira um email válido.',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );

          if (
            error.code == 'auth/invalid-credential' ||
            'auth/wrong-password'
          ) {
            ToastAndroid.show(
              'Email ou senha incorretos.',
              ToastAndroid.CENTER,
              ToastAndroid.SHORT,
            );
          }
        }
      });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />

      <Icon
        name="rocket"
        size={64}
        color="#4D0AB8"
        style={{textAlign: 'center'}}></Icon>

      <Text style={styles.title}>Entrar</Text>
      <Text>Entre na sua conta para continuar utilizando o app</Text>

      <TextInput
        style={styles.inputField}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Senha"
        secureTextEntry={seePassword}
        value={password}
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
          style={styles.buttonDisabled}
          onPress={login}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Entrar na conta
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Entrar na conta
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.registerButton}>
        <Text>Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
          <Text
            style={{
              color: '#4D0AB8',
              textAlign: 'center',
              textDecorationLine: 'underline',
            }}>
            Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

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
  inputField: {
    marginTop: 16,
    padding: 16,
    borderColor: '#4D0AB8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
  },
  loginButton: {
    marginTop: 16,
    padding: 16,
    borderColor: '#4D0AB8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#4D0AB8',
  },
  registerButton: {
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
