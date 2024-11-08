// SignUp.js
import { View, Text, ScrollView, Image } from "react-native";
import React, { useState, Suspense } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { Link, router } from "expo-router";
import { useLocalSearchParams } from 'expo-router';
import { pickImage, takePhoto } from "../../constants/imagePick";  
import { API } from "../../constants/url";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [phone, setphoneS] = useState('');
  const { mobile } = useLocalSearchParams();
  const [empId, setEmpId] = useState('')
  const [role, setRole] = useState('')
  const [roleType, setroleType] = useState('')
  const [imageUri, setImageUri] = useState(null);  // State to hold the selected/captured image URI

  // Function to handle image selection from gallery
  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) setImageUri(uri);
  };

  // Function to handle capturing an image with the camera
  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) setImageUri(uri);
  };



 
const sendData = async () => {
  const formData = new FormData();

// const { name, mobile, email, empId, password, role, roleType, joinDate } = req.body;
  // Append form fields
  formData.append("name", name);
  formData.append("mobile" , mobile)
  formData.append("email", email);
  formData.append("empId", empId);
  formData.append("password", password);
  formData.append("role", role);
  formData.append("roleType", roleType);


  // Append image file if one is selected
  if (imageUri) {
    const filename = imageUri.split('/').pop(); // Get the filename from URI
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`; // Determine image type

    formData.append("image", {
      uri: imageUri,
      name: filename,
      type,
    });
  }

  try {
    const response = await API.post("/auth/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data?.message === "User signed up successfully") {

      setTimeout(() => {
        router.push("Login")
      }, 500);

      console.log("Signup successful:", response.data);
    } else {
      console.error("Signup failed:", response.data);
    }
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};
 


  return (
    <Suspense fallback={<Text>Loading...</Text>}>
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
                placeholder="password"
                label="Enter Your Password"
                value={password}
                setvalue={setPassword}
                password={true}
              />

              <CustomInput
                placeholder="24120021"
                label="Enter Your Employee Id"
                value={empId}
                setvalue={setEmpId}
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
                setvalue={setroleType}
              />

              <Text className="text-white font-ubold">Upload Your Image</Text>

              <View className="flex-row gap-4 justify-between items-center relative">
                <CustomBtn onclick={handleTakePhoto} text="Take Photo" style="w-[30%]" textStyl="text-sm"/>
                <Text className="text-white">OR</Text>
                <CustomBtn onclick={handlePickImage} text="Pick From Gallery" style="w-[30%]" textStyl="text-sm"/>
              </View>

              {imageUri && (
                <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, marginTop: 10 }} />
              )}

              <CustomBtn text="Sign Up" onclick={sendData}/>
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
    </Suspense>
  );
}
