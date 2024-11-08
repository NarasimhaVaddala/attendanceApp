import {  Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CustomBtn({text, onclick, icon}) {
  return (
    <TouchableOpacity onPress={onclick} className="h-16 bg-[#f60] w-full rounded-xl items-center justify-center gap-8 flex-row">
      <Text className="text-white font-ubold text-2xl">{text}</Text>
      {icon &&   <Icon name={icon} size={20} color="#FFF" />}
    </TouchableOpacity>
  );
}
