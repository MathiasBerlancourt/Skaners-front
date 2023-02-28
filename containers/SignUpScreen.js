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

export default function SignUpScreen({ setToken }) {
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

  useEffect(() => {
    const signUp = async () => {
      try {
        if (submit) {
          const response = await axios.post(
            "https://site--skaners-back--jhlzj9jljvpm.code.run/signup",
            {
              email: email,
              username: userName,
              pictureUrl: avatar,
              password: password,
            }
          );
          setErrorMessage("");
          if (response.data.token) {
            setToken(response.data.token);
            alert("Connexion réussi");
          }
        }
      } catch (error) {
        setErrorMessage("Adresse email ou username déjà utilisé");
        setSubmit(false);
      }
    };
    signUp();
  }, [submit]);

  return (
    <KeyboardAwareScrollView style={styles.background}>
      <ScrollView>
        <View>
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

          <TextInput
            style={styles.input}
            placeholder="Adresse email"
            onChangeText={(input) => {
              setEmail(input);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(input) => {
              setUsername(input);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de Passe"
            onChangeText={(input) => {
              setPassword(input);
            }}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme le mot de passe"
            onChangeText={(input) => {
              setConfirmPassword(input);
            }}
            secureTextEntry={true}
          />
        </View>
        <View>
          <Text style={styles.title}>Choisis ton avatar</Text>
          <ScrollView horizontal={true}>
            <View style={styles.avatarsList}>
              {imagesAvatar.avatars.map((img, index) => {
                return (
                  <Avatar
                    key={index}
                    picture={img}
                    setAvatar={setAvatar}
                    avatar={avatar}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View>
          <View>
            <Text style={styles.title}>Finalise ton inscription !</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Prénom</Text>
            <TextInput
              style={styles.inputWithTitle}
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
              onChangeText={(input) => {
                setLastName(input);
              }}
              value={lastName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Date de naissance</Text>
            <TextInput
              style={styles.inputWithTitle}
              onChangeText={(input) => {
                setDateOfBirth(input);
              }}
              value={dateOfBirth}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Numéro de téléphone</Text>
            <TextInput
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
              style={styles.inputWithTitle}
              onChangeText={(input) => {
                setShoeSize(input);
              }}
              value={shoeSize}
            />
          </View>
          <Text style={styles.txtEnd}>
            Passe à l'étape suivante pour devenir un crack !
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log(avatar);
            }}
            style={styles.btnValid}
          >
            <Text style={styles.txtValid}>VALIDER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  inputWithTitle: {
    backgroundColor: "lightgray",
    height: 30,
    borderRadius: 20,
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

  passwordForgetTxt: {
    marginHorizontal: 35,
    color: "grey",
  },

  errorTxt: {
    color: "#F86F00",
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  avatarsList: {
    flexDirection: "row",
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
  btnValid: {
    backgroundColor: "black",
    marginHorizontal: 90,
    borderRadius: 20,
    height: 30,
    marginBottom: 30,
  },
  txtValid: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  txtEnd: {
    color: "gray",
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  background: {
    backgroundColor: "white",
    flex: 1,
  },
});
