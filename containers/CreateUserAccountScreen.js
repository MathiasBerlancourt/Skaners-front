import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CreateUserAccountScreen = () => {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView>
      <Text style={styles.title}>Inscris toi !</Text>
      <View style={styles.createContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor="whitesmoke"
          placeholder="Adresse email"
          onChangeText={(input) => {
            setEmail(input);
          }}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="whitesmoke"
          placeholder="Username"
          onChangeText={(input) => {
            setUsername(input);
          }}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="whitesmoke"
          placeholder="Mot de Passe"
          onChangeText={(input) => {
            setPassword(input);
          }}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="whitesmoke"
          placeholder="Confirme le mot de passe"
          onChangeText={(input) => {
            setConfirmPassword(input);
          }}
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Date de naissance (format jj-mm-aaaa)"
          placeholderTextColor="whitesmoke"
          onChangeText={(input) => {
            setDateOfBirth(input);
          }}
        />

        <View />
      </View>
      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => {
          if (
            !email ||
            !userName ||
            !password ||
            !confirmPassword ||
            !dateOfBirth
          ) {
            return setErrorMessage("Remplissez tous les champs");
          }
          if (password !== confirmPassword) {
            return setErrorMessage("Mot de passe différents");
          }
          navigation.navigate("Finalize User Account", {
            email: email,
            userName: userName,
            password: password,
            dateOfBirth: dateOfBirth,
          });
        }}
      >
        <Text style={styles.signUpTxt}>CONTINUER</Text>
      </TouchableOpacity>
      <Text style={styles.errorTxt}>{errorMessage}</Text>
    </KeyboardAwareScrollView>
  );
};

export default CreateUserAccountScreen;

const styles = StyleSheet.create({
  createContainer: {
    height: "65%",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 30,
    borderBottomColor: "orange",
    borderBottomWidth: 2,
    textAlign: "center",
    marginVertical: 20,
  },

  input: {
    backgroundColor: "lightgray",
    height: 30,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    paddingLeft: 10,
  },
  signUpBtn: {
    height: 50,
    backgroundColor: "#FF7E00",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },

  signUpTxt: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorTxt: {
    color: "#F86F00",
    marginHorizontal: 20,
    fontWeight: "bold",
  },
});
