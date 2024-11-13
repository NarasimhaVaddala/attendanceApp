import { router, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Profile from "./Profile";
import History from "./History";
import Home from "./Home";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeToken } from "../../constants/getsettoken";
import EditProfile from "./EditProfile";

const Drawer = createDrawerNavigator();

const TabIcon = ({ icon, color, focused, name }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Icon name={icon} size={25} color={color} />
      <Text
        className={`text-white text-xs ${
          focused ? "font-pbold" : "font-pregular"
        }`}
      >
        {name}
      </Text>
    </View>
  );
};

// Custom Drawer Content with Label-First Icon-Next Logout Button
const CustomDrawerContent = (props) => {
  const handleLogout = async() => {
    const data = await removeToken()
    Alert.alert("Logout", "You have been logged out!");
    router.push("/Login")
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Drawer Items for screens */}
      <DrawerItemList {...props} />
      {/* Custom Logout Button */}
      <DrawerItem
        label={() => (
          <View style={{gap:40, flexDirection: "row", alignItems: "center", justifyContent: "start", width: "100%" }}>
            <Text style={{ color: "black" }}>Logout</Text>
            <Icon name="sign-out" size={20} color="#FF6600" />
          </View>
        )}
        onPress={handleLogout}
        style={{backgroundColor:"#B2B2B2",  marginTop: 10 }}
      />
    </DrawerContentScrollView>
  );
};

const AuthLayout = () => {
  return (
    <>
      <StatusBar style="light" />

      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "#FF6600",
          drawerInactiveBackgroundColor:"#B2B2B2",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "black",
          drawerStyle: {
            backgroundColor: "#808080",
          },
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="History" component={History} />
        <Drawer.Screen name="EditProfile" component={EditProfile} />
      </Drawer.Navigator>
    </>
  );
};

export default AuthLayout;
