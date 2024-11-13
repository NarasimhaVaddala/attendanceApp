// EditProfile.js
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { router } from "expo-router";
import { pickImage, takePhoto } from "../../constants/imagePick";
import { imageUrl } from "../../constants/url";
import { API } from "../../constants/url";
import { useAttendance } from "../../constants/useAttendance";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getToken } from "../../constants/getsettoken";
import axios from "axios";

export default function EditProfile() {
  const { data } = useAttendance();
    console.log(data);
    
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setEmail(data.email || "");
      setEmpId(data.empId || "");
      setRole(data.role || "");
      setRoleType(data.roleType || "");
      setImageUri(`${imageUrl}${data.image}`);
      setPhone(data.mobile || "");
    }
  }, [data]);

  // Prepopulate the fields with existing data
  const [name, setName] = useState(data?.name || "");
  const [email, setEmail] = useState(data?.email || "");
  const [phone, setPhone] = useState(data?.mobile || "");
  const [empId, setEmpId] = useState(data?.empId || "");
  const [role, setRole] = useState(data?.role || "");
  const [roleType, setRoleType] = useState(data?.roleType || "");
  const [imageUri, setImageUri] = useState(null); // State to hold the selected/captured image URI

  // Image picking and capturing functions
  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) setImageUri(uri);
  };

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) setImageUri(uri);
  };

  // Update profile data
  const sendData = async () => {
    const formData = new FormData();

    // Append form fields
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("roleType", roleType);
    formData.append("mobile" , phone)

    // Append image file if one is selectedus
    if (imageUri) {
      const filename = imageUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("image", {
        uri: imageUri,
        name: filename,
        type,
      });
    }

    try {
      console.log();

      const token = await getToken();
      const response = await axios.put(
        "http://192.168.29.36:7000/user/editprofile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      console.log("res", response);

      if (response.data?.message === "Profile updated successfully") {
        setTimeout(() => {
          router.push("Profile"); // Adjust this to navigate to the appropriate screen
        }, 500);

        console.log("Profile update successful:", response.data);
      } else {
        console.error("Profile update failed:", response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-8">
        <View className="flex-1 justify-center gap-y-16">
          <Text className="text-3xl font-pbold text-white">Edit Profile</Text>

          <View className="gap-8">
            {imageUri ? (
              <View className="relative mb-8">
                <Image
                  source={{ uri: imageUri }}
                  className="mb-8 h-[100px] w-[100px] rounded-full absolute -top-16 left-[35%] border-4 border-[#FF6600] object-cover"
                />
                <Pressable
                  onPress={handleTakePhoto}
                  className="absolute left-56"
                >
                  <Ionicons name="create-outline" size={30} color="#fff" />
                </Pressable>
              </View>
            ) : (
              <View className="relative mb-8">
                <Image
                  source={{ uri: `${imageUrl}${data?.image}` }}
                  className="h-[100px] w-[100px] rounded-full absolute -top-16 left-[35%] border-4 border-[#FF6600] object-cover"
                />
                <Pressable
                  onPress={handleTakePhoto}
                  className="absolute left-56"
                >
                  <Ionicons name="create-outline" size={30} color="#fff" />
                </Pressable>
              </View>
            )}

            <CustomInput
              placeholder="john doe"
              label="Your Full Name"
              value={name}
              setvalue={setName}
            />
            <CustomInput
              placeholder="email"
              label="Email Id"
              value={email}
              setvalue={setEmail}
            />

            <CustomInput
              placeholder="mobile"
              label="Mobile"
              value={phone}
              setvalue={setPhone}
              number={true}
            />

            <CustomInput
              placeholder="javascript developer"
              label="Enter Your Job Title"
              value={role}
              setvalue={setRole}
            />
            <CustomInput
              placeholder="Intern"
              label="Enter Your Role"
              value={roleType}
              setvalue={setRoleType}
            />
            <CustomBtn text="Confirm" onclick={sendData} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
