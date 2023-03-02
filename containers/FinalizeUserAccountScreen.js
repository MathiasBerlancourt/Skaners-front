import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const FinalizeUserAccountScreen = ({ route }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [favoriteBrand, setFavoriteBrand] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const navigation = useNavigation();
  const accountInfos = {
    email: route.params.email,
    userName: route.params.userName,
    password: route.params.password,
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: route.params.dateOfBirth,
    phoneNumber: phoneNumber,
    sex: sex,
    favoriteBrand: favoriteBrand,
    shoeSize: shoeSize,
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.finalizeContainer}>
        <View>
          <Text style={styles.title}>Finalise ton inscription !</Text>
          <Text style={styles.notaBene}>
            Tu pourras compléter ces informations plus tard dans ton profil
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Prénom</Text>
          <TextInput
            style={styles.inputWithTitle}
            placeholder="Michael"
            placeholderTextColor="whitesmoke"
            onChangeText={(input) => {
              setFirstName(input);
            }}
            value={firstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Nom</Text>
          <TextInput
            style={styles.inputWithTitle}
            placeholder="Jordan"
            placeholderTextColor="whitesmoke"
            onChangeText={(input) => {
              setLastName(input);
            }}
            value={lastName}
          />
        </View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Numéro de téléphone</Text>
          <TextInput
            placeholder="07-XX-XX-XX-XX"
            placeholderTextColor="whitesmoke"
            value={phoneNumber}
            style={styles.inputWithTitle}
            onChangeText={(input) => {
              setPhoneNumber(input);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Sexe</Text>
          <TextInput
            placeholder="M"
            placeholderTextColor="whitesmoke"
            style={styles.inputWithTitle}
            onChangeText={(input) => {
              setSex(input);
            }}
            value={sex}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Marque(s) favorite(s)</Text>
          <TextInput
            placeholder="Air Jordan"
            placeholderTextColor="whitesmoke"
            style={styles.inputWithTitle}
            onChangeText={(input) => {
              setFavoriteBrand(input);
            }}
            value={favoriteBrand}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Pointure</Text>
          <TextInput
            placeholder="43"
            placeholderTextColor="whitesmoke"
            style={styles.inputWithTitle}
            onChangeText={(input) => {
              setShoeSize(input);
            }}
            value={shoeSize}
          />
        </View>
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => {
            navigation.navigate("Choose Avatar", accountInfos);
          }}
        >
          <Text style={styles.signUpTxt}>CONTINUER</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FinalizeUserAccountScreen;

const styles = StyleSheet.create({
  notaBene: {
    color: "grey",
    fontStyle: "italic",
    fontSize: 12,
    textAlign: "center",
  },

  inputWithTitle: {
    backgroundColor: "lightgray",
    height: 30,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingLeft: 10,
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
  inputTitle: {
    marginHorizontal: 30,
    color: "gray",
    marginTop: 15,
    marginBottom: 3,
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
});
