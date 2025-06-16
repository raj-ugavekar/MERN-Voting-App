import axios from "axios";

const baseUrl = import.meta.env.BACKEND_URL;

export class Service {

  getToken() {
    return JSON.parse(localStorage.getItem("token"));
  }

  async getCandidates() {
    try {
      const candidateData = await axios.get(`${baseUrl}/candidate/`);
      return candidateData.data.response;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.log("Service :: getCandidate :: error", error);
    }
  }

  async getUsers() {
    const token = this.getToken();
    try {
      const usersData = await axios.get(`${baseUrl}/user/`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return usersData.data.response;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.log("Service :: getCandidate :: error", error);
    }
  }

  async addCandidate({ name, party, age }) {
    const token = this.getToken();
    const payload = {
      name: name,
      party: party,
      age: age,
    };
    try {
      const candidateData = await axios.post(`${baseUrl}/candidate/`, payload, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return candidateData.data.response;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.log("Service :: addCandidate :: error", error);
    }
  }

  async addUser({name,
    age,
    mobile,
    email,
    address,
    aadharCardNumber,
    password,}) {
    const token = this.getToken();
    const payload = {
      name: name,
      age: age,
      mobile: mobile,
      email: email,
      address: address,
      aadharCardNumber: aadharCardNumber,
      password: password,
    };
    try {
      const userData = await axios.post(`${baseUrl}/user/`, payload, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return userData.data.response;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.log("Service :: addUser :: error", error);
    }
  }

  async updateCandidate(candidateId , {age, name, party }) {
    const token = this.getToken();
    const payload = {
      name: name,
      party: party,
      age: age,
    };
    try {
      const candidateData = await axios.put(
        `${baseUrl}/candidate/` + candidateId,
        payload,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      return candidateData.data.response;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.log("Service :: updateCandidate :: error", error);
    }
  }

    async updateUser(userId , {name, age, mobile,email, address, aadharCardNumber }) {
    const token = this.getToken();
    const payload = {
      name: name,
      age: age,
      mobile: mobile,
      email: email,
      address: address,
      aadharCardNumber: aadharCardNumber
    };
    try {
      const userData = await axios.put(
        `${baseUrl}/user/` + userId,
        payload,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      return userData.data.response;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.log("Service :: updateCandidate :: error", error);
    }
  }


  async deleteUser(userId) {
    const token = this.getToken();
    try {
      const userData = await axios.delete(`${baseUrl}/user/` + userId, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return userData.data.message;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.log("Service :: deleteCandidate :: error", error);
    }
  }

  async deleteCandidate(candidateId) {
    const token = this.getToken();
    try {
      const candidateData = await axios.delete(`${baseUrl}/candidate/` + candidateId, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return candidateData.data.message;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.log("Service :: deleteCandidate :: error", error);
    }
  }

  async getVoteCount() {
    try {
      const candidateData = await axios.get(`${baseUrl}/candidate/vote/count`);
      return candidateData.data.response;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.log("Service :: getVoteCount :: error", error);
    }
  }

  async voteCandidate(candidateId) {
    try {
    const token = this.getToken();
      const payload = "";
      const candidateData = await axios.post(
        `${baseUrl}/candidate/vote/` + candidateId,
        payload,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      return candidateData.data.message;
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.log("Service :: voteCandidate :: error", error);
    }
  }
}

const service = new Service();

export default service;
