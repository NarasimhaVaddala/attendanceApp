import { View, Text, ScrollView, TextInput, StyleSheet, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { Link, useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { API } from "../../constants/url";
import { useRouter } from 'expo-router';

export default function Login() {
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("")
    const [open, setOpen] = useState(false)
    const { type } = useLocalSearchParams();
    const inputs = useRef([]);
    const router = useRouter()




    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        if (text && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
        setOtp(newOtp);
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
            inputs.current[index - 1].focus();
        }
    };


    const sendOtp = async () => {

        try {
            const response = await API.post("/auth/sendotp", { mobile });
            if (response?.data?.message === "Otp Sent Successfully") setOpen(true)
            setError(null)
        } catch (error) {
            setError(error.message);
        }


    }


    const VerifyOtp = async () => {
        try {
                console.log("Otp call");
                console.log(otp.join(""));                
                const response = await API.post("/auth/verifyotp", { mobile: mobile, otp: otp.join("") })
                console.log(response.data);
                setError(null)
                if (type == "new") router.push(`/SignUp?mobile=${mobile}`); 
                else router.push(`Login`); 
            

        } catch (error) {
            setError(error.message);
        }
    }

    //   developing an ai driven solution to enhance captcha for improved user experience and security



    return (
        <SafeAreaView className="flex-1 bg-primary">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-8">
                <View className="flex-1 justify-center gap-y-16">
                    <Text className="text-3xl font-pbold text-white">
                        {
                            type === "new" ? "SIGNUP" : "FORGOT PASSWORD"
                        }
                    </Text>

                    <View className="gap-8">
                        <CustomInput
                            placeholder="mobile"
                            label="Enter Your Mobile"
                            value={mobile}
                            setvalue={setMobile}
                            disabled={open}
                            number={true}
                        />






                        {(mobile.length == 10 && !open) && <CustomBtn text="Send Otp" onclick={sendOtp} />}


                        {
                            error && <Text className="text-red-600 text-center">{error}</Text>
                        }

                        {open && <Text className="text-white font-ubold">Enter Otp</Text>}





                        {open && <View className="flex-row justify-between">


                            {otp.map((value, index) => (
                                <TextInput
                                    key={index}
                                    ref={(input) => (inputs.current[index] = input)} // Store refs for each input
                                    maxLength={1}
                                    keyboardType="numeric"
                                    className={`rounded-lg w-[40px] h-[40px] border border-white ${value ? "border-[#ff6600]" : "border-white"}border-white text-center text-white`}
                                    onChangeText={(text) => handleChange(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)} // Detect backspace
                                    value={value}
                                    textAlign="center" // Ensure text is centered
                                    onFocus={() => {
                                        inputs.current[index].setNativeProps({
                                            style: { borderColor: "#FF6600" }, // Change border color to pink on focus
                                        });
                                    }}
                                    onBlur={() => {
                                        inputs.current[index].setNativeProps({
                                            style: { borderColor: value ? "#FF6600" : "#A9A9A9" }, // Revert based on value
                                        });
                                    }}
                                />
                            ))}

                        </View>}


                        {
                            open && <CustomBtn text="Verify Otp" onclick={VerifyOtp} />
                        }

                        <Text className="font-pregular text-white text-center">Already Have an account? <Link href="Login"
                            className=" font-pregular text-[#FF6600]">Login</Link>

                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    },
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
    },
    input: {
        width: 40,
        height: 40,
        backgroundColor: "#FFFFFF", // White background
        borderRadius: 25, // Fully rounded input
        borderWidth: 1,
        textAlign: "center", // Center the text
        fontSize: 18, // Adjust font size
        color: "#000000", // Text color
    },
    resentOtpCard: {
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    errorCard: {
        width: "100%",
    },
    errorMsg: {
        color: "red",
        fontSize: 14,
    },
});
