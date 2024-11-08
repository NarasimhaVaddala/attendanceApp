import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";

export default function CustomInput({
  label,
  placeholder,
  value,
  setvalue,
  password,
  disabled,
  number
}) {
  const [pass, showPass] = useState(true);
  const [isFocused, setIsFocused] = useState(false); // State for tracking focus

  // Border color based on focus state
  const borderColor = isFocused ? "#FF6600" : "white"; // Change this to your desired focus color

  return (
    <View className="w-full gap-2 relative">
      <Text className="text-white font-ubold">{label}</Text>
      <TextInput
        keyboardType={number && "number-pad"}
        editable={!disabled}
        value={value}
        onChangeText={setvalue}
        className={`rounded-xl h-16 w-full p-4 text-white ${disabled ? "bg-[#808080]" :""}`}
        placeholder={placeholder}
        placeholderTextColor="#808080"
        secureTextEntry={pass && password}
        onFocus={() => setIsFocused(true)} // Handle focus
        onBlur={() => setIsFocused(false)} // Handle blur
        style={{ borderColor: borderColor, borderWidth: 1 }} // Apply dynamic border color
      />

      {password && (
        <TouchableOpacity
          className="absolute top-12 right-4"
          onPress={() => showPass(!pass)}
        >
          {pass ? (
            <Icon name="eye" size={25} color="#fff" />
          ) : (
            <Icon name="eye-slash" size={25} color="#fff" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
