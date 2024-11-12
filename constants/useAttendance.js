import { useEffect, useState } from "react";
import { API } from "./url";
import { getToken } from "./getsettoken";
import { getTimeIn12HourFormat } from "./timeFormat";
import { Alert } from "react-native";

export const useAttendance = () => {
  const [data, setData] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);  
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  const getUser = async () => {
    try {
      const token = await getToken();
      const response = await API.get("/user/getuser", {
        headers: { token },
      });
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodayAttendance = async () => {
    const token = await getToken();
    if (!token) return;

    try {
      const response = await API.get("/attendance/today", { headers: { token } });
      if (response.data === "not found" || response.data === "something went wrong") {
        setAttendance({});
      } else {
        setAttendance(response.data);
        setCheckedIn(!!response.data?.checkIn);
        setCheckedOut(!!response.data?.checkOut);
      }
    } catch (error) {
      const errorMessage = error.response?.data;
      if (errorMessage === "Attendance not found today") return "not found";
      console.error("An error occurred while fetching today's attendance:", errorMessage);
      return "something went wrong";
    }
  };

  const checkIn = async () => {
    const token = await getToken();
    if (!token) return;

    try {
      const time = getTimeIn12HourFormat();
      const response = await API.post("/attendance/add", { checkIn: time }, { headers: { token } });
      setCheckedIn(true);
      getTodayAttendance(); // Refresh attendance after check-in
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during check-in.";
      Alert.alert(errorMessage);
    }
  };

  const checkOut = async (id) => {
    const token = await getToken();
    if (!token) return;

    try {
      const time = getTimeIn12HourFormat();
      const response = await API.put(`/attendance/end/${id}`, { checkOut: time }, { headers: { token } });
      setCheckedOut(true);
      getTodayAttendance(); // Refresh attendance after check-out
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during check-out.";
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };


  const getAllattendance = async () => {
    const token = await getToken();
    if (!token) return;

    try {
      const response = await API.get("/attendance/userattendance", { headers: { token } });
      setAttendanceHistory(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch attendance data.";
      console.error("Error fetching all attendance:", errorMessage);
      Alert.alert("Error", errorMessage);
    }
  };

  useEffect(() => {
    getUser();
    getTodayAttendance();
    getAllattendance(); // Fetch attendance history on mount
  }, []);

  return {
    data,
    attendance,
    checkedIn,
    checkedOut,
    attendanceHistory, // Provide attendance history to be used in the component
    checkIn,
    checkOut,
  };
};
