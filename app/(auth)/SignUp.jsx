import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { Link } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-8">
        <View className="flex-1 justify-center gap-y-16">
          <Text className="text-3xl font-pbold text-white">SIGN UP</Text>

          <View className="gap-8">
            <CustomInput
              placeholder="john doe"
              label="Enter Your Full Name"
              value={name}
              setvalue={setName}
            />
            <CustomInput
              placeholder="email"
              label="Enter Your Email Id"
              value={email}
              setvalue={setEmail}
            />
            <CustomInput
              placeholder="mobile"
              label="Enter Your Mobile Number"
              value={mobile}
              setvalue={setMobile}
            />
            <CustomInput
              placeholder="password"
              label="Enter Your Password"
              value={password}
              setvalue={setPassword}
              password={true}
            />
            <CustomBtn text="Sign Up" />
            <Text className="font-pregular text-white text-center">
              Already Have an account?{" "}
              <Link
                href="Login"
                className="font-pregular text-[#FF6600]"
              >
                Log In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
