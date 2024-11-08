import { View, Text, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const logo = require("../assets/images/ngslogo.jpg");
const imgUrl =
  "https://plus.unsplash.com/premium_photo-1694557636097-5969bae91ba8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Header() {
  const navigation = useNavigation();
  return (
    <View className="flex-row w-full h-10 justify-between mb-8">
      <Image source={logo} className="h-10 w-[100px]" resizeMode="contain" />

      <TouchableOpacity
        className="bg-[#ff6600] h-14 w-14 rounded-full items-center justify-center"
        onPress={() => navigation.openDrawer()}
      >
        <Image
          source={{ uri: imgUrl }}
          className="h-[95%] w-[95%] rounded-full" 
         resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}
