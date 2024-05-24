import { StyleSheet, View } from "react-native";
import Movies from "./src/screens/Movies/Movies";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    ArchivoSemiBold: require("./src/assets/fonts/Archivo-SemiBold.ttf"),
    SairaSemiBold: require("./src/assets/fonts/Saira-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return;
  }

  return (
    <View className="flex-1 bg-app_bg">
      <Movies />
    </View>
  );
}

const styles = StyleSheet.create({});
