import { prisma } from "../../db";
import { signToken } from "../../lib/jwt";

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("user already exist ");
  }
  const hashedpassword = await Bun.password.hash(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedpassword,
    },
  });
  return {
    message: "user created succesfully ",
    userId: user.id,
  };
};

export const signin = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!existingUser) {
    throw new Error("Invalid credential");
  }
  const isMatch = await Bun.password.verify(password, existingUser.password);
  if (!isMatch) {
    throw new Error("Invalid credential");
  }
  const token = signToken(existingUser.id);
  return {
    message: "Signin successful",
    token,
  };
};
