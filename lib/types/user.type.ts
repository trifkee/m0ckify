export type RegisterUserType = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserType = {
  id: string;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  projects: string[];
  createdAt: string;
  updatedAt: string;
};
