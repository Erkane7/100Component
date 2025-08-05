import { Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../utils/prisma";

export const getCurrentProfile = async (req: Request, res: Response) => {
  try {
    const authHeaderUser = req.headers.authorization || "";

    if (!authHeaderUser || !authHeaderUser.startsWith("Bearer ")) {
      res.status(400).json({ success: false });
      return;
    }

    const userFromHeaders = authHeaderUser.split(" ")[1];
    console.log("userIdFromHeaders", userFromHeaders);

    const secret = "Secret-key";
    const decoded = jwt.verify(userFromHeaders, secret) as JwtPayload;
    console.log("decoded: ", decoded.UserData);

    const user = await prisma.user.findUnique({
      where: { id: decoded?.UserData?.user },
    });

    if (!user) {
      res.status(400).json({ message: "No user info in request" });
    }
    console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};
