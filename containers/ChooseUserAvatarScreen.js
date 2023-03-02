import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import imagesAvatar from "../assets/Json/avatar-url.json";
import Avatar from "../components/Avatars";

const ChooseUserAvatarScreens = ({ route, setToken, setId }) => {
  const [avatar, setAvatar] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const accountInfos = {
    email: route.params.email,
    userName: route.params.userName,
    password: route.params.password,
    firstName: route.params.firstName,
    lastName: route.params.lastName,
    dateOfBirth: route.params.dateOfBirth,
    phoneNumber: route.params.phoneNumber,
    sex: route.params.sex,
    favoriteBrand: route.params.favoriteBrand,
    pictureUrl: avatar,
  };

  useEffect(() => {
    const signUp = async () => {
      try {
        if (submit) {
          const response = await axios.post(
            "https://site--skaners-back--jhlzj9jljvpm.code.run/signup",
            // "http://localhost:3310/signup",
            {
              email: accountInfos.email,
              userName: accountInfos.userName,
              password: accountInfos.password,
              firstName: accountInfos.firstName,
              lastName: accountInfos.lastName,
              dateOfBirth: accountInfos.dateOfBirth,
              phoneNumber: accountInfos.phoneNumber,
              sex: accountInfos.sex,
              favoriteBrand: accountInfos.favoriteBrand,
              pictureUrl: avatar,
            }
          );

          setErrorMessage("");
          if (response.data.token) {
            setToken(response.data.token);
            setId(response.data.user._id);
            alert("Connexion réussie");
          }
        }
      } catch (error) {
        console.log("error message server : ", error.message);
        console.log("email: ", accountInfos.email);
        console.log("userName: ", accountInfos.userName);
        console.log("password: ", accountInfos.password);
        console.log("firstName:", accountInfos.firstName);
        console.log("lastName: ", accountInfos.lastName);
        console.log("dateOfBirth:", accountInfos.dateOfBirth);
        console.log(" phoneNumber:", accountInfos.phoneNumber);
        console.log("sex:", accountInfos.sex);
        console.log("favoriteBrand:", accountInfos.favoriteBrand);

        setErrorMessage("Adresse email ou userName déjà utilisé");
        setSubmit(false);
      }
    };
    signUp();
  }, [submit]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.finalizeContainer}>
        <Text style={styles.title}>Choisis ton avatar</Text>

        <View style={styles.avatarsList}>
          {imagesAvatar.avatars.map((img, index) => {
            return (
              <View key={index} style={{ marginTop: 50 }}>
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
          setSubmit(true);
        }}
      >
        <Text style={styles.signUpTxt}>CREER MON COMPTE</Text>
      </TouchableOpacity>
      <Text style={styles.errorTxt}>{errorMessage}</Text>
    </KeyboardAwareScrollView>
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
