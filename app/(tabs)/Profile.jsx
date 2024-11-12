import { View, ScrollView, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import CustomBtn from "../../components/CustomBtn";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import { useAttendance } from "../../constants/useAttendance";
import { imageUrl } from "../../constants/url";
import { router } from "expo-router";

export default function Profile() {
  const { data, attendance, checkedIn, checkedOut, checkIn, checkOut } =
    useAttendance();

  console.log(data);
  console.log(`${imageUrl}/${data?.image}`);

  return (
    <SafeAreaView className="p-4 bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Header />
        <View className="flex-1 items-center justify-center">
          <View className="h-[250px] bg-[#f5f5f5e3] w-full relative rounded-xl">
            <Image
              source={{ uri: `${imageUrl}${data?.image}` }}
              className="h-[100px] w-[100px] rounded-full absolute -top-16 left-[35%] border-4 border-[#FF6600] object-cover"
            />

            <View className="relative top-5 p-4 justify-evenly h-full">
              <Text className="font-psbold text-2xl text-center">
                {data?.name}
              </Text>

              <View className="flex-row justify-between mt-4">
                <Text className="font-pregular text-sm text-center">
                  {data?.roleType} ⁌
                </Text>
                <Text className="font-pregular text-sm text-center">
                  {data?.role} ⁌
                </Text>
                <Text className="font-pregular text-sm text-center">
                  Joined{" "}
                  {new Date(data?.joinDate).toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </View>

              <Text className="font-pregular text-xs text-center">
                +91 {data?.mobile} | {data?.email}
              </Text>

              <View className="mt-4">
                <CustomBtn text="Edit Profile" icon="chevron-right" />
              </View>
            </View>
          </View>

          <View className="bg-[#f0f0f0] w-full mt-4 flex-row justify-between p-4 rounded-xl">
            {/* First Section - Checked In */}
            <View
              className="gap-2 items-center justify-center"
              style={{
                borderRightWidth: 1,
                borderRightColor: "#ddd",
                paddingRight: 10,
              }}
            >
              <Text className="font-pbold">Checked In</Text>
              {checkedIn ? <Icon name="check-circle" size={24} color="green" /> : <Icon name="times-circle" size={24} color="red" />}
            </View>

            {/* Second Section - Checked Out */}
            <View
              className="gap-2 items-center justify-center"
              style={{
                borderRightWidth: 1,
                borderRightColor: "#ddd",
                paddingRight: 10,
              }}
            >
              <Text className="font-pbold">Checked Out</Text>
              {checkedOut ? <Icon name="check-circle" size={24} color="green" /> : <Icon name="times-circle" size={24} color="red" />}
            </View>

            {/* Third Section - No of Hours */}
            <View className="gap-2 items-center justify-center">
              <Text className="font-pbold">No of Hours</Text>
              <Text className="font-pbold">{attendance?.noOfHours ? attendance?.noOfHours:"NA" }</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-[#f5f5f5e3] w-full mt-4 flex-row justify-between items-center p-6 rounded-xl" onPress={()=>router.push("History")}>
            <View className="flex-row items-center gap-4">
              <Icon name="book" size={24} color="#000" />
              <Text className="font-psbold">View Your Attendance History</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#ff6600" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#f0f0f0] w-full mt-4 flex-row justify-between items-center p-6 rounded-xl">
            <View className="flex-row items-center gap-4">
              <Icon name="envelope" size={24} color="#000" />
              <Text className="font-psbold">Contact For Assistance</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#ff6600" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#f5f5f5e3] w-full mt-4 flex-row justify-between items-center p-6 rounded-xl">
            <View className="flex-row items-center gap-4">
              <Icon name="exclamation-triangle" size={24} color="#000" />
              <Text className="font-psbold">Report any Technical Problem</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#ff6600" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
