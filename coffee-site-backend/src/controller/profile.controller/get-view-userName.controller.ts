import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";
import { AuthRequest } from "../../middleware/authToken";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { username } = req.params;
    const userId = req.user?.userId;

    console.log("Authenticated userId:", userId);

    const profile = await prisma.user.findUnique({
      where: { username },
    });

    if (!profile) {
      return res.status(404).json({ message: "User profile not found." });
    }

    res.status(200).json({ userProfile: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
