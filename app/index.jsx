import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import CustomBtn from "../components/CustomBtn";
import { Link, router } from "expo-router";
import { getToken } from "../constants/getsettoken";

const index = () => {

  useEffect(() => {
    (async function () {
      const token = await getToken();
      if (token) router.push("Home");
      if(!token) router.push("Login")
    })()
  }, []);
  return (
    <>
      
      <SafeAreaView className="p-8 bg-primary">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-center text-3xl font-ubold">
              WELCOME
            </Text>

            <Image
              source={require("../assets/images/homeicon.png")}
              className="h-[500px] w-full"
              resizeMode="contain"
            />

              <CustomBtn text="PROCEED TO LOGIN"  onclick={()=>router.push("Login")}/>
     
          
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default index;
