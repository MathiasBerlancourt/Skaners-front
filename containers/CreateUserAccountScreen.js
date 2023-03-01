import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import imagesAvatar from "../assets/Json/avatar-url.json";
import Avatar from "../components/Avatars";

const CreateUserAccountScreen = ({ setToken, setId }) => {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [favoriteBrand, setFavoriteBrand] = useState();
  const [shoeSize, setShoeSize] = useState("");
  const [username, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();
  return (
    <View>
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
        <View />
      </View>
      <TouchableOpacity
        style={styles.signUpBtn}
        disabled={submit}
        onPress={() => {
          if (!email || !userName || !password || !confirmPassword) {
            return setErrorMessage("Remplissez tous les champs");
          }
          if (password !== confirmPassword) {
            return setErrorMessage("Mot de passe différents");
          }
          // setSubmit(true);
          //METTRE UN NAVIGATION VERS LA SUITE
        }}
      >
        <Text style={styles.signUpTxt}>CONTINUER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Finalize User Account", {
            email: email,
            userName: userName,
            password: password,
          });
        }}
      >
        <Text>BOUTTON TEST</Text>
      </TouchableOpacity>
      <Text style={styles.errorTxt}>{errorMessage}</Text>
    </View>
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
