import { API } from "./url";
import { getTimeIn12HourFormat } from "./timeFormat";
import { getToken } from "./getsettoken";

export const checkIn = async () => {
    const token = await getToken();        
    if (!token) return;
    
    try {
        const time = getTimeIn12HourFormat();
        const response = await API.post('/attendance/add', { checkIn: time }, { headers: { token } });
        console.log(response.data);
        return  response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred during check-in.";
        console.error(errorMessage);
        
        // Return the error message to display on the UI
        return { success: false, message: errorMessage };
    }
};

export const checkOut = async (id) => {
    console.log(id);
    
    const token = await getToken();
    if (!token) return;

    const time = getTimeIn12HourFormat();
    try {
        const response = await API.put(`/attendance/end/${id}`, { checkOut: time }, { headers: { token } });
        return { success: true, message: "Checked out successfully" };
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred during check-out.";
        console.error(errorMessage);
        
        // Return the error message to display on the UI
        return { success: false, message: errorMessage };
    }
};

export const getTodayAttendance = async () => {
    const token = await getToken();
    if (!token) return;

    try {
        const response = await API.get('/attendance/today', { headers: { token } });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data;
        if (errorMessage === "Attendance not found today") return "not found";
        console.error("An error occurred while fetching today's attendance:", errorMessage);
        return "something went wrong";
    }
};
