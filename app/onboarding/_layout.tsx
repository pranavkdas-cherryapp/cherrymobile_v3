// import Header from "@/components/Header";
// import StyledText from "@/components/StyledText";
// import { logout } from "@/services/logoutService";
// import { sendWhatsAppMessage } from "@/services/sendWhatsAppMessage";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { Provider } from "react-native-paper";

export default function OnboardingLayout() {
  return (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="CheckBackLaterScreen"
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: false,
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "black",
              },
              headerRight: () => (
                <>
                  <TouchableOpacity> 
                    <MaterialIcons name="help-outline" size={24} color="black" />
                  </TouchableOpacity>
                </>
              ),
            }}
          />
        </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 110,
    height: 30,
  },
  menuIcon: {
    padding: 5,
  },
  optionStyle: {
    marginVertical: 10,
    color: "white",
    marginHorizontal: 10,
    textDecorationLine: "underline",
  },
});
