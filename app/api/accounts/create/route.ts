// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/prisma/client';


// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { accountSize, userId } = req.body;

//     try {
//       // Create a new account linked to the user
//       const newAccount = await prisma.account.create({
//         data: {
//           accountSize,
//           status: 'challenge',  // Set default status to 'challenge'
//           user: { connect: { id: userId } },  // Link account to user
//         },
//       });
//       res.status(200).json(newAccount);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create account' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
