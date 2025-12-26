import "dotenv/config";
import express ,{json, Request , Response} from 'express'
import { prismaClient } from '@repo/db/client'
import bcrypt from 'bcrypt'

const app = express()

app.use(express.json())

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const {userId , password, email, name } = req.body;

    console.log("REQ BODY:", req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismaClient.user.create({
      data: {
        userId,
        email,
        password: hashedPassword,
        name,
      },
    });

    return res.json({ message: "User Signed Up", newUser });
  } catch (e: any) {
    console.error("🔥 PRISMA ERROR");
    console.error("code:", e.code);
    console.error("message:", e.message);
    console.error("meta:", e.meta);

    return res.status(500).json({
      code: e.code,
      message: e.message,
      meta: e.meta,
    });
  }
});


app.listen(3001, () => {
  console.log('Server running at http://localhost:3001')
})
