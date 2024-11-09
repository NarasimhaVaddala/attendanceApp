import {API} from "./url"
import {getTimeIn12HourFormat} from "./timeFormat"
import { getToken } from "./getsettoken"

export const checkIn = async()=>{
    const token = await getToken();        
    if (!token) return;
    try {
        const time =  getTimeIn12HourFormat()
        const response = await API.post('/attendance/add' , {
            checkIn:time
        } ,
       { headers: { token }}
    )
    console.log(response.data);

    } catch (error) {
        console.log(error);
        
    }
}


export const checkOut = async()=>{
    const token = await getToken();    
    const time =  getTimeIn12HourFormat()
    if (!token) return;
    try {
        const response = await API.put(`/attendance/end/672f6199615810d09f0cdd86`, {checkOut:time} , {
            headers: { token }
        })
        console.log(response.data);
        
    } catch (error) {
        console.log(error);
        
    }

}
