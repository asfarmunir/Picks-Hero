import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/helper/dbconnect';
import { generateCustomId } from '@/helper/keyGenerator';


function generateInvoice (account: any, newAccount: any, userId: any) {
  
  // strip $ from accounPrice
  const accountPrice = account.accountPrice.replace('$', '');
  
  const invoice = {
    amount: parseFloat(accountPrice),
    invoiceNumber: generateCustomId(false, false),
    accountId: newAccount.id,
    status: 'paid',
    userId: userId,
    paymentMethod: 'card',
    paymentDate: new Date()
  }
  return invoice;
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { account, billingDetails, card, userId } = await req.json();
    
    try {

        await connectToDatabase();

        const startingBalance = parseFloat(account.accountSize.replace('K', '000'));
        
        // Create a new account linked to the user      
        const newAccount = await prisma.account.create({
            data: {
                accountSize: account.accountSize,
                accountType: account.accountType,
                status: account.status,
                balance: startingBalance,
                accountNumber: generateCustomId(),
                userId: userId,
            }
        });

        // save billing address
        const billingAddress = await prisma.billingAddress.create({
            data: {
                address: billingDetails.address,
                city: billingDetails.city,
                country: billingDetails.country,
                email: billingDetails.email,
                firstName: billingDetails.firstName,
                lastName: billingDetails.lastName,
                phone: billingDetails.phone,
                zipCode: billingDetails.postalCode,
                state: billingDetails.state,
                accountId: newAccount.id
            }
        });

        console.log("Billing address saved!")

        // save payment card

        const existingCard = await prisma.paymentCard.findFirst({
            where: {
                cardNumber: card.cardNumber
            }
        });

        if (existingCard) {

          await prisma.accountInvoices.create({
            data: {
              ...generateInvoice(account, newAccount, userId),
              paymentCardId: existingCard.id
            }
          }); 
          
          return NextResponse.json({ newAccount }, { status: 200 });
        }

        const paymentCard = await prisma.paymentCard.create({
            data: {
                cardNumber: card.cardNumber,
                cardExpiry: card.cardExpiry,
                zipCode: card.zipCode,
                cardCvv: card.cardCvv,
                country: card.country,
                userId: userId,
                accountId: newAccount.id
            }
        });

        console.log("Payment card saved!")
      
        await prisma.accountInvoices.create({
          data: {
            ...generateInvoice(account, newAccount, userId),
            paymentCardId: paymentCard.id
          }
        });
        
        return NextResponse.json({ newAccount }, { status: 200 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}
