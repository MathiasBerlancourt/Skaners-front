import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import imagesAvatar from "../assets/Json/avatar-url.json";
import Avatar from "../components/Avatars";

const ChooseUserAvatarScreens = () => {
  // {
  //   email,
  //   userName,
  //   password,
  //   confirmPassword,
  //   errorMessage,
  //   setErrorMessage,
  // }

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
  return (
    <View>
      <View style={styles.finalizeContainer}>
        <Text style={styles.title}>Choisis ton avatar</Text>

        <View style={styles.avatarsList}>
          {imagesAvatar.avatars.map((img, index) => {
            return (
              <View style={{ marginTop: 50 }}>
                <Avatar
                  key={index}
                  picture={img}
                  setAvatar={setAvatar}
                  avatar={avatar}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                />
              </View>
            );
          })}
        </View>
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
          setSubmit(true);
        }}
      >
        <Text style={styles.signUpTxt}>CREER MON COMPTE</Text>
      </TouchableOpacity>
      <Text style={styles.errorTxt}>{errorMessage}</Text>
    </View>
  );
};

export default ChooseUserAvatarScreens;
const styles = StyleSheet.create({
  finalizeContainer: {
    height: "80%",
  },
  avatarsList: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  errorTxt: {
    color: "#F86F00",
    marginHorizontal: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpTxt: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
