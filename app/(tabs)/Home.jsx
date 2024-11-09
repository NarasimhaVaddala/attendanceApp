import { View, ScrollView, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { API } from "../../constants/url";
import { getToken } from "../../constants/getsettoken"
import {checkIn, checkOut}  from "../../constants/checkinout"
export default function Home() {
  const [data, setData] = useState(true);

  const getUser = async () => {
    try {
      const token = await getToken()
      const response = await API.get('/user/getuser', {
        headers: { token }
      })

      setData(response?.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser()
  }, [])


  return (
    <SafeAreaView className="p-4 bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Header />
        <View className="flex-1 mt-4">
          <Text className="text-white font-pbold text-4xl">Hi {data?.name}</Text>
          <Text className="text-white font-pregular mt-4">
            Lets be Productive Today !
          </Text>
        </View>

        <View className="h-[75%]  bg-[#f5f5f5ee] rounded-[30px]">
          <View className="p-8 w-full flex-row justify-between">
            <Text className="font-psbold text-xl">Overview</Text>

            <Text className="font-psbold text-xl">May 2024</Text>
          </View>

          <View className="justify-between p-8 flex-row">
            <View className="gap-3 border-r pr-2 items-center justify-center flex-1">
              <Text className="font-pregular text-xl">Present</Text>
              <Text className="font-pbold text-xl">47</Text>
            </View>
            <View className="gap-3  pr-2 items-center justify-center flex-1">
              <Text className="font-pregular text-xl">Absent</Text>
              <Text className="font-pbold text-xl">47</Text>
            </View>
            {/* <View className="gap-3 items-center justify-center flex-1">
              <Text className="font-pregular text-xl">Late</Text>
              <Text className="font-pbold text-xl">47</Text>
            </View> */}
          </View>

          <View className="flex-1  bg-white rounded-[30px] m-4 p-6">
            <Text className="text-center font-pbold text-sm mb-4 p-4 rounded-lg bg-[#f5f5f5d2]">
              Thursday 05th November 2024
            </Text>

            <View className="flex-row justify-between gap-x-2">
              <Text className="text-center w-[100%] font-pbold text-xl  p-4 rounded-lg bg-[#f5f5f5d2]">
                08:10 AM
              </Text>
            </View>

            {/* <TouchableOpacity disabled={checkin} className={`w-[100%] mt-4 p-4 rounded-lg ${checkin ? "bg-[#ff6600a6]": "bg-[#FF6600]"} flex-row items-center justify-center gap-2`}>
                  <Text className="text-center font-pbold text-xl text-white">Check In</Text>
                  <Icon name="sign-in" size={24} color={"white"} />
                </TouchableOpacity> */}

            <View className="flex-row justify-center items-center bg-[#f5f5f5d2] mt-4 rounded-lg ">
              <Text className="text-center font-psbold text-xl  p-4 ">
                Checked In 08:10 AM
              </Text>
              <Icon name="check-circle" size={24} color="green" />
            </View>

            <TouchableOpacity onPress={checkOut} className="text-center font-pbold text-sm mt-4 p-4 rounded-lg bg-[#FF6600] flex-row items-center justify-center gap-4">
              <Text className="text-center font-pbold text-xl text-white">
                Check Out
              </Text>
              <Icon name="sign-out" size={24} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
