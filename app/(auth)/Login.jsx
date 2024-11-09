import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { Link, router } from "expo-router";
import { API } from "../../constants/url"
import {setToken} from "../../constants/getsettoken"

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')

  const loginUser = async () => {
    

    try {
      const response = await API.post("/auth/login", { userId, password })
      if (response.data?.message == "user not found") setError("user not found")
      if (response.data?.token){
         await setToken(response.data.token);
         router.push("Home")
      }
      
    } catch (error) {
      console.log(error);      
      if(error.response?.data?.message == "user not found") setError("User Not Found")

    }

  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-8">
        <View className="flex-1 justify-center gap-y-16">
          <Text className="text-3xl font-pbold text-white">LOGIN</Text>

          <View className="gap-8">
            <CustomInput
              placeholder="email or phone or employee id"
              label="Enter Your Email or Mobile or Employee Id"
              value={userId}
              setvalue={setUserId}
            />
            <CustomInput
              placeholder="password"
              label="Enter Your Password"
              value={password}
              setvalue={setPassword}
              password={true}
            />

            <Link href="ForgotPassword" className="text-white font-pregular self-end">Forgot Password ?</Link>

            <CustomBtn text="Login" onclick={loginUser} />

            <Text className="font-pregular text-white text-center">Don't Have an account?

              <Link href={{ pathname: "Otp", params: { type: "new" } }}
                className=" font-pregular text-[#FF6600]">Sign Up</Link>

            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
