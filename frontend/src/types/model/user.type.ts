export interface UserModel {
  id: string;
  fullname: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  active: boolean;
  data: {
    role: "student" | "admin";
    points: number;
    biography: string;
    profilePhoto?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
