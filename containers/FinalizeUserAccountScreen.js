import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.inputTitle}>Prénom</Text>
            <TextInput
              style={styles.inputWithTitle}
              placeholder="Michael"
              placeholderTextColor="#717171"
              onChangeText={(input) => {
                setFirstName(input);
              }}
              value={firstName}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Nom</Text>
            <TextInput
              style={styles.inputWithTitle}
              placeholder="Jordan"
              placeholderTextColor="#717171"
              onChangeText={(input) => {
                setLastName(input);
              }}
              value={lastName}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Numéro de téléphone</Text>
            <TextInput
              placeholder="07-XX-XX-XX-XX"
              placeholderTextColor="#717171"
              value={phoneNumber}
              style={styles.inputWithTitle}
              onChangeText={(input) => {
                setPhoneNumber(input);
              }}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Sexe</Text>
            <TextInput
              placeholder="M"
              placeholderTextColor="#717171"
              style={styles.inputWithTitle}
              onChangeText={(input) => {
                setSex(input);
              }}
              value={sex}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Marque(s) favorite(s)</Text>
            <TextInput
              placeholder="Air Jordan"
              placeholderTextColor="#717171"
              style={styles.inputWithTitle}
              onChangeText={(input) => {
                setFavoriteBrand(input);
              }}
              value={favoriteBrand}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Pointure</Text>
            <TextInput
              placeholder="43"
              placeholderTextColor="#717171"
              style={styles.inputWithTitle}
              onChangeText={(input) => {
                setShoeSize(input);
              }}
              value={shoeSize}
            />
          </View>
        </View>
        <View>
          <Text style={styles.outroTxt}>
            Passe à l'étape suivante pour devenir un crack !
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => {
              navigation.navigate("Choose Avatar", accountInfos);
            }}
          >
            <Text style={styles.signUpTxt}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FinalizeUserAccountScreen;

const styles = StyleSheet.create({
  finalizeContainer: {
    justifyContent: "space-around",

    height: hp("85%"),
  },
  notaBene: {
    fontFamily: "LouisGeorgeItalic",
    color: "grey",
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
    justifyContent: "center",
    textAlign: "center",
    fontSize: 28,
    paddingVertical: 15,
    fontFamily: "LemonMilkBold",
    textAlign: "left",
    color: "#FF7E00",
    paddingLeft: 15,
    fontFamily: "LouisGeorge",
  },
  formContainer: { justifyContent: "space-around" },

  inputTitle: {
    fontFamily: "LouisGeorge",
    marginHorizontal: 30,
    color: "gray",
    marginTop: 15,
    marginBottom: 3,
  },
  outroTxt: {
    fontFamily: "LouisGeorge",
    color: "#717171",
    fontSize: 20,
    paddingHorizontal: wp("6%"),
    textAlign: "center",
  },
  buttonContainer: {
    paddingTop: hp("4%"),
    alignItems: "center",
  },
  signUpBtn: {
    height: hp("5%"),
    width: wp("60%"),
    backgroundColor: "#FF7E00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },

  signUpTxt: {
    fontFamily: "LouisGeorge",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
