import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password || !password) {
      res.status(400).json({ message: "try again" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);

    if (isMatch) {
      const UserData = {
        user: user?.id,
        email: user?.email,
        username: user?.username,
      };
      const secret = "Secret-key";
      const hour = Math.floor(Date.now() / 1000) * 60 * 60;

      const accesstoken = jwt.sign({ exp: hour, UserData }, secret);
      res.status(200).json({ accesstoken });
    } else {
      res.status(400).json({ message: "Email and password invalid" });
    }
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};
