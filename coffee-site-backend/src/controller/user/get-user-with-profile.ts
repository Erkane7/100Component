import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

export const getUsersWithProfile = async (req: Request, res: Response) => {
  
  try {
    const user = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });
    console.log("User prisma: ",prisma.user);
    

    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
