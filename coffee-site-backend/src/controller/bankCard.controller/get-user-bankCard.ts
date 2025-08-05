import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

export const getUserBankCard = async (req: Request, res: Response) => {
  try {
    const user = await prisma.bankCard.findUnique({
      where: { userId: Number(req.params.userId) },
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
