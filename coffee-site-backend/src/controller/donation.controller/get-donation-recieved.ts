import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getDonationsForRecipient = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const donations = await prisma.donation.findMany({
      where: { recipientId: parseInt(userId) },
      include: {
        donor: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { timestamps: "desc" },
    });

    res.status(200).json(donations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
