import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      console.log("Token set Success");
      
    } catch (error) {
      console.error('Error storing token from getsettoken :', error);
    }
  };
  

  export const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log("Token get Success");
      return token;
    } catch (error) {
      console.error('Error retrieving token from getsettoken :', error);
    }
  };


  export const removeToken = async ()=>{
    try {
      AsyncStorage.removeItem("userToken")
      return true;
    } catch (error) {
      return false;
    }
  }
  