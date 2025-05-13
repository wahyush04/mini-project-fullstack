import type { UserRole } from "../enum/role";

export interface LoginModel {
  status: string;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      data: LoginDataModel;
    };
    token: string;
  };
}
export interface LoginDataModel {
  points: number;
  role: UserRole;
}


export interface RegisterResponseModel {
  user: {
    id: string;
    name: string;
    email: string;
  };
}


