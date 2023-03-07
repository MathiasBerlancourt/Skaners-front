import { useState, Date } from "react";
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
  const [dateOfBirth, setDateOfBirth] = useState("");
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
              <Text style={styles.txtDoB}>Date de naissance :</Text>
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

        {/* ANCIEN TEXT INPUT A CONSERVER AU CAS OU LE DATE PICKER NE FONCTIONNE PAS
      
      <TextInput
        style={styles.input}
        placeholder="Date de naissance (format mm-jj-aaaa)"
        placeholderTextColor="#515151"
        onChangeText={(input) => {
          setDateOfBirth(input);
        }}
      /> */}
        {/* {console.log("CONTROLE DE LA DATE DE NAISSANCE :", dateOfBirth)} */}
        {/* Commentaire de controle de la date de naissance */}

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
                dateOfBirth: dateOfBirth,
              });
            }}
          >
            <Text style={styles.signUpTxt}>CONTINUER</Text>
          </TouchableOpacity>
          <Text style={styles.errorTxt}>{errorMessage}</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateUserAccountScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: "LemonMilkBold",
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 30,
    borderBottomColor: "#FF7E00",
    borderBottomWidth: 2,
    textAlign: "center",
    marginVertical: 50,
  },

  containerDoB: {
    backgroundColor: "lightgray",
    flexDirection: "row",
    height: 30,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    paddingLeft: 10,
    width: "40%",
  },
  txtDoB: {
    color: "#515151",

    paddingVertical: 5,
  },

  input: {
    fontFamily: "LouisGeorge",
    backgroundColor: "lightgray",
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    padding: 10,
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
