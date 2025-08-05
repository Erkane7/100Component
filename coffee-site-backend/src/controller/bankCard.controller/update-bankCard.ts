import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

export const UpdateBankCard = async (req: Request, res: Response) => {
  const { country, firstName, lastName, cardNumber, expiryDate } = req.body;
  try {
    const bankCard = await prisma.bankCard.update({
      where: { id: Number(req.params.bankCardId) },
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate: new Date(expiryDate),
      },
    });

    res.status(200).json({ bankCard });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
