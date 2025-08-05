import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

// function isValidCardNumber(cardNumber: string): boolean {
//   if (!/^\d{16}$/.test(cardNumber)) return false;

//   let sum = 0;
//   let shouldDouble = false;

//   for (let i = cardNumber.length - 1; i >= 0; i--) {
//     let digit = parseInt(cardNumber[i], 10);

//     if (shouldDouble) {
//       digit *= 2;
//       if (digit > 9) digit -= 9;
//     }

//     sum += digit;
//     shouldDouble = !shouldDouble;
//   }

//   return sum % 10 === 0;
// }

export const createUserBankCard = async (req: Request, res: Response) => {
  const { country, firstName, lastName, cardNumber, expiryDate } = req.body;
  const { userId } = req.params;

  try {
    const existingBankCard = await prisma.bankCard.findFirst({
      where: {
        cardNumber,
      },
    });
    if (existingBankCard) {
      throw new Error("exising card");
    }
    const bankCard = await prisma.bankCard.create({
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate: new Date(),
        userId: Number(userId),
      },
    });

    res.status(200).json({ bankCard });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
