import { ILoginUser, IRegisterUser } from "@/types";
import api from "./api";

const registerUser = async ({ userData, role }: IRegisterUser) => {
  console.log(userData);
  try {
    const response = await api.post(
      `/users/register-${role}`,
      {
        ...userData,
        role,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(`Error while registering the ${role} : ${error}`);
  }
};

const loginUser = async ({ username, email, password }: ILoginUser) => {
  try {
    const response = await api.post(
      `/users/login`,
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(`Error on logging the user in : ${error}`);
  }
};

const updatePhoneVerification = async (phone: string) => {
  console.log(phone);
  try {
    const response = await api.patch(
      `/users/update-phone`,
      {
        phone: phone,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error on updating the phone verification status : ${error}`);
  }
};

const getCurrentUser = async () => {
  try {
    const response = await api.get(`/users/current-user`);

    return response.data;
  } catch (error) {
    console.log(`Error on getting the current user in : ${error}`);
  }
};

const logoutUser = async () => {
  try {
    const response = await api.post(`/users/logout`);
    return response.data;
  } catch (error) {
    console.log(`Error on logging out the user : ${error}`);
  }
};

export {
  registerUser,
  updatePhoneVerification,
  loginUser,
  logoutUser,
  getCurrentUser,
};
