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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const CreateUserAccountScreen = () => {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("jj/mm/aaaa");
  const navigation = useNavigation();
  //DATE PICKER-------
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateOfBirth(date);

    hideDatePicker();
  };
  //DATE PICKER------

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.createUserContainer}>
        <Text style={styles.title}>CRÉER MON COMPTE</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#515151"
            placeholder="Adresse email"
            onChangeText={(input) => {
              setEmail(input);
            }}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#515151"
            placeholder="Username"
            onChangeText={(input) => {
              setUsername(input);
            }}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#515151"
            placeholder="Mot de Passe"
            onChangeText={(input) => {
              setPassword(input);
            }}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#515151"
            placeholder="Confirme le mot de passe"
            onChangeText={(input) => {
              setConfirmPassword(input);
            }}
            secureTextEntry={true}
          />

          <View style={styles.containerDoB}>
            <TouchableOpacity onPress={showDatePicker}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.txtDoB}>
                  {dateOfBirth instanceof Date ? "" : "Date de naissance :"}
                </Text>
                <Text
                  style={
                    dateOfBirth instanceof Date ? styles.txtDoA : styles.txtDoB
                  }
                >
                  {dateOfBirth instanceof Date
                    ? dateOfBirth.toLocaleDateString("fr-FR")
                    : dateOfBirth}
                </Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              locale="fr_FR"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
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
                dateOfBirth: dateOfBirth.toLocaleDateString("fr-FR"),
              });
            }}
          >
            <Text style={styles.signUpTxt}>Valider</Text>
          </TouchableOpacity>
          <Text style={styles.errorTxt}>{errorMessage}</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateUserAccountScreen;

const styles = StyleSheet.create({
  createUserContainer: {
    paddingTop: hp("7%"),
    height: hp("90%"),
    alignContent: "flex-end",
    backgroundColor: "white",
  },
  formContainer: {
    paddingTop: hp("2%"),
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "LemonMilkBold",
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 30,
    borderBottomColor: "#FF7E00",
    borderBottomWidth: 2,
    textAlign: "center",
    marginVertical: 40,
  },

  containerDoB: {
    backgroundColor: "lightgray",
    flexDirection: "row",
    height: 35,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    paddingLeft: 10,
  },
  txtDoB: {
    color: "#515151",
    fontFamily: "LouisGeorge",
    paddingVertical: 10,
  },
  txtDoA: {
    fontFamily: "LouisGeorge",
    paddingVertical: 10,
  },

  input: {
    fontFamily: "LouisGeorge",
    backgroundColor: "lightgray",
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    padding: 10,
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
    fontFamily: "LouisGeorgeBold",
    color: "white",
    fontSize: 23,
  },
  errorTxt: {
    fontFamily: "LouisGeorge",
    color: "#F86F00",
    marginHorizontal: 20,
    fontWeight: "bold",
  },
});
