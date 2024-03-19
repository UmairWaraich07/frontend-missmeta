import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updatePhoneVerification,
} from "@/api/userApi";
import { ILoginUser, IRegisterUser } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: ({ userData, role }: IRegisterUser) =>
      registerUser({
        userData,
        role,
      }),
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({ username, email, password }: ILoginUser) =>
      loginUser({
        username,
        email,
        password,
      }),
  });
};

export const useUpdatePhoneVerification = () => {
  return useMutation({
    mutationFn: (phone: string) => updatePhoneVerification(phone),
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentuser"],
    queryFn: () => getCurrentUser(),
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: () => logoutUser(),
  });
};
