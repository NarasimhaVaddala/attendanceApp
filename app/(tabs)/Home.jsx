import { View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAttendance } from "../../constants/useAttendance";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { data, attendance, checkedIn, checkedOut, checkIn, checkOut } = useAttendance();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <SafeAreaView className="p-4 bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Header />
        <View className="flex-1 mt-4">
          <Text className="text-white font-pbold text-4xl">
            Hi {data?.name}
          </Text>
          <Text className="text-white font-pregular mt-4">
            Let's be Productive Today!
          </Text>
        </View>

        <View className="h-[75%] bg-[#f5f5f5ee] rounded-[30px]">
          <View className="p-8 w-full flex-row justify-between">
            <Text className="font-psbold text-xl">Overview</Text>
            <Text className="font-psbold text-xl">May 2024</Text>
          </View>

          <View className="justify-between p-8 flex-row">
            <View className="gap-3 border-r pr-2 items-center justify-center flex-1">
              <Text className="font-pregular text-xl">Present</Text>
              <Text className="font-pbold text-xl">47</Text>
            </View>
            <View className="gap-3 pr-2 items-center justify-center flex-1">
              <Text className="font-pregular text-xl">Absent</Text>
              <Text className="font-pbold text-xl">47</Text>
            </View>
          </View>

          <View className="flex-1 bg-white rounded-[30px] m-4 p-6">
            <Text className="text-center font-pbold text-sm mb-4 p-4 rounded-lg bg-[#f5f5f5d2]">
              {new Date().toDateString()}
            </Text>

            {!checkedOut && (
              <View className="flex-row justify-between gap-x-2">
                <Text className="text-center w-[100%] font-pbold text-xl p-4 rounded-lg bg-[#f5f5f5d2]">
                  {formatTime(currentTime)}
                </Text>
              </View>
            )}

            {checkedIn && (
              <View className="flex-row justify-center items-center bg-[#f5f5f5d2] mt-4 rounded-lg">
                <Text className="text-center font-psbold text-xl p-4">
                  Check In {attendance?.checkIn}
                </Text>
                <Icon name="check-circle" size={24} color="green" />
              </View>
            )}

            {checkedOut && (
              <View className="flex-row justify-center items-center bg-[#f5f5f5d2] mt-4 rounded-lg">
                <Text className="text-center font-psbold text-xl p-4">
                  Check Out {attendance.checkOut}
                </Text>
                <Icon name="check-circle" size={24} color="green" />
              </View>
            )}

            {attendance.noOfHours && (
              <View className="flex-row justify-between gap-x-2 mt-4">
                <Text className="text-center w-[100%] font-pbold text-xl p-4 rounded-lg bg-[#f5f5f5d2]">
                  Hours Worked: {attendance.noOfHours}
                </Text>
              </View>
            )}

            {!checkedIn && (
              <TouchableOpacity
                onPress={checkIn}
                className="w-[100%] mt-4 p-4 rounded-lg bg-[#FF6600] flex-row items-center justify-center gap-2"
              >
                <Text className="text-center font-pbold text-xl text-white">
                  Check In
                </Text>
                <Icon name="sign-in" size={24} color={"white"} />
              </TouchableOpacity>
            )}

            {(checkedIn && !checkedOut) && (
              <TouchableOpacity
                onPress={() => checkOut(attendance._id)}
                className="text-center font-pbold text-sm mt-4 p-4 rounded-lg bg-[#FF6600] flex-row items-center justify-center gap-4"
              >
                <Text className="text-center font-pbold text-xl text-white">
                  Check Out
                </Text>
                <Icon name="sign-out" size={24} color={"white"} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
