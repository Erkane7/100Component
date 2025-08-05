import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

export const getProfileExplore = async (req: Request, res: Response) => {
  try {
    const usersProfile = await prisma.profile.findMany();

    res.status(200).json({ usersProfile });
  } catch (error) {
    res.status(500).json({ error });
  }
};
