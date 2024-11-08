import { View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

export default function History() {
  return (
    <SafeAreaView className="p-8 bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Header/>
        <View className="flex-1 items-center justify-center">



        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
