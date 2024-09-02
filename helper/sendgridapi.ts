import sendgrid from '@sendgrid/mail';
import { FaCode } from 'react-icons/fa';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendGreetingEmail(to: string, name: string) {
  const message = {
    to,
    from: 'aligatorabdullah@gmail.com', 
    subject: 'Welcome to the PicksHero!',
    text: `Hello ${name},\n\nThank you for signing up to PicksHero. We're excited to have you on board!`,
    html: `<p>Hello <strong>${name}</strong>,</p><p>Thank you for signing up to <strong>PicksHero</strong>. We're excited to have you on board!</p>`,
  };

  try {
      const response = await sendgrid.send(message);
    console.log('Greeting email sent successfully:', response);
  } catch (error) {
    console.error('Error sending greeting email:', error);
  }
}

export async function send2FACodeEmail(userEmail: string, code: string) {
    const message = {
      to: userEmail,
      from: 'aligatorabdullah@gmail.com',
      subject: 'Your 2FA Code',
      text: `Your 2FA code is: ${code}. It is valid for 10 minutes.`,
      html: `<strong>Your 2FA code is: ${code}</strong>. It is valid for 10 minutes.`,
    };
  
    try {
     const FAcode = await sendgrid.send(message);
     console.log('2FA code is sent : ', FAcode)
      console.log('2FA code sent successfully');
    } catch (error) {
      console.error('Error sending 2FA code:', error);
    }
  }