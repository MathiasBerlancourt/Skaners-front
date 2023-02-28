import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const login = async () => {
      try {
        if (submit) {
          setErrorMessage("");
          const response = await axios.post(
            `https://site--skaners-back--jhlzj9jljvpm.code.run/signin`,
            { email: email, password: password }
          );
          if (response.data.token) {
            setToken(response.data.token);
            alert("Connexion réussi");
          }
        }
      } catch (error) {
        setErrorMessage("Email ou mot de passe incorrect");
        setSubmit(false);
      }
    };
    login();
  }, [submit]);

  return (
    <KeyboardAwareScrollView style={styles.background}>
      <View>
        <View>
          <TouchableOpacity
            style={styles.loginBtn}
            disabled={submit}
            onPress={() => {
              if (!email || !password) {
                return setErrorMessage("Vous devez remplir tous les champs");
              }
              setSubmit(true);
            }}
          >
            <Text style={styles.loginTxt}>CONNEXION</Text>
          </TouchableOpacity>

          <Text style={styles.errorTxt}>{errorMessage}</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(input) => {
              setEmail(input);
            }}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={(input) => {
              setPassword(input);
            }}
            value={password}
          />

          <TouchableOpacity
            onPress={() => {
              alert("Wesh Crack pourquoi t'as oublié ton mot de passe");
            }}
          >
            <Text style={styles.passwordForgetTxt}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "lightgray",
    height: 30,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    paddingLeft: 10,
  },

  loginBtn: {
    height: 50,
    backgroundColor: "#FF7E00",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 70,
    marginBottom: 20,
  },

  loginTxt: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  passwordForgetTxt: {
    marginHorizontal: 35,
    color: "grey",
  },

  errorTxt: {
    color: "#F86F00",
    marginHorizontal: 20,
    fontWeight: "bold",
  },

  background: {
    backgroundColor: "white",
    flex: 1,
  },
});
