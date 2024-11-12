import { View, Text, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAttendance } from "../constants/useAttendance";
import { imageUrl } from "../constants/url";

const logo = require("../assets/images/ngslogo.jpg");

export default function Header() {
  const navigation = useNavigation();
  const {data} = useAttendance()

  console.log(`${imageUrl}${data?.image} from header`);
  
  return (
    <View className="flex-row w-full h-10 justify-between mb-8">
      <Image source={logo} className="h-10 w-[100px]" resizeMode="contain" />

      <TouchableOpacity
        className="bg-[#ff6600] h-14 w-14 rounded-full items-center justify-center"
        onPress={() => navigation.openDrawer()}
      >
        <Image
          source={{ uri: `${imageUrl}${data?.image}` }}
          className="h-[95%] w-[95%] rounded-full" 
         resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}
