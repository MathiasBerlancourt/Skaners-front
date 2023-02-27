import { Button, Text, TextInput, View } from "react-native";
import Register from "../components/Register";

export default function SignUpScreen({ setToken }) {
  return (
    <View>
      <View>
        <Text>Je suis le screen signup</Text>
        <TextInput placeholder="Username" />
        <Text>Password: </Text>
        <TextInput placeholder="Password" secureTextEntry={true} />
        <Button
          title="Sign up"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />

        <Register />
      </View>
    </View>
  );
}
