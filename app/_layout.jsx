import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// Prevent the splash screen from automatically hiding
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // Load custom fonts
  const [fontsLoaded, error] = useFonts({
    "Urbanist-Regular": require("../assets/fonts/urbanist/Urbanist-Regular.ttf"),
    "Urbanist-Bold": require("../assets/fonts/urbanist/Urbanist-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    // Check for font loading errors
    if (error) {
      console.log("Font loading error:", error);
      throw error; // You can handle the error as needed
    }

    // Hide splash screen once fonts are loaded
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // While fonts are loading, render nothing
  if (!fontsLoaded) {
    console.log("Fonts are not loaded yet");
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </>
  );
};

export default RootLayout;
