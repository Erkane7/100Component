import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    console.log("username", username);
    const profile = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    console.log("prfile :", profile);

    res.status(200).json({ profile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
