import { View, ScrollView, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAttendance } from "../../constants/useAttendance"; // Import your custom hook

export default function History() {
  const { attendanceHistory } = useAttendance(); // Get attendance history from the hook

  const renderItem = ({ item }) => (
    <View className="flex-row items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-md mx-2">
      <View>
        <Text className="text-lg font-semibold text-black">{item.date}</Text>
        <Text className="text-gray-600">Check-In: {item.checkIn}</Text>
        <Text className="text-gray-600">Check-Out: {item.checkOut}</Text>
      </View>
      <View className="items-center">
        <Icon name="clock-o" size={20} color="#FFA500" />
        <Text className="text-orange-500 font-bold mt-1">{item.noOfHours}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="p-4 bg-primary h-full">
      {/* <ScrollView contentContainerStyle={{ height: "100%" }}> */}
        <Header />
        <View className="flex-1 mt-4">
          <Text className="text-white font-pbold text-4xl">Hi {attendanceHistory[0]?.name}</Text>
          <Text className="text-white font-pregular mt-4">
            Your Attendance History
          </Text>
        </View>

        <View className="h-[75%] mt-8">
          <FlatList
            data={attendanceHistory}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
