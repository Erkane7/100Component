import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(req.body);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
