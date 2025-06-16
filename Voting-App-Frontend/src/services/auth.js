import axios from "axios";

const baseUrl = import.meta.env.BACKEND_URL;

export class AuthService {

  setToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  getToken() {
    return JSON.parse(localStorage.getItem("token"));
  }

  clearToken() {
    localStorage.removeItem("token");
  }

  async userSignup({
    name,
    age,
    mobile,
    email,
    address,
    aadharCardNumber,
    password,
  }) {
    try {
      const payload = {
        name: name,
        age: age,
        mobile: mobile,
        email: email,
        address: address,
        aadharCardNumber: aadharCardNumber,
        password: password,
      };
      const userData = await axios.post(`${baseUrl}/user/signup/`, payload);
      this.setToken(userData.data.response.token);
      return userData.data.response.user;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
      console.log("Service :: userSignup :: error", error);
    }
  }

  async userLogin({ aadharCardNumber, password }) {
    try {
      const payload = {
        aadharCardNumber: aadharCardNumber,
        password: password,
      };
      const userData = await axios.post(`${baseUrl}/user/login/`, payload);
      this.setToken(userData.data.response.token);
      alert(userData.data.message);
      return userData.data.response.user;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
      console.log("Service :: userLogin :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      const token = this.getToken();
      const userData = await axios.get(`${baseUrl}/user/profile`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return userData.data;
    } catch (error) {
      // alert(error.response?.data?.message || "Something went wrong. Please try again.");
      console.log("Service :: getCurrentUser :: error", error);
    }
  }

  async changeUserPassword({ oldPassword, newPassword }) {
    const token = this.getToken();
    const payload = {
      currentPassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      const userData = await axios.post(`${baseUrl}/user/profile/password`, payload, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return userData.data.message;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
      console.log("Service :: changeUserPassword :: error", error);
    }
  }

  logout() {
    clearToken();
    alert("Logged out successfully.");
  }
}


const authService = new AuthService();

export default authService;
