import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { promisify } from 'util';

const formParse = promisify(IncomingForm.prototype.parse); // To use async/await

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const form = new IncomingForm({ multiples: false });

    // Parse the form using formidable
    const { fields, files }: any = await formParse(form, req);

    const file = files.file;
    const tempFilePath = file.filepath; 
    const fileName = file.originalFilename;

    console.log('File uploaded:', fileName);

    // Respond with success
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      fileName,
    }, { status: 200 });
  } catch (error) {
    console.error('File upload error:', error);

    // Return an error response
    return NextResponse.json({
      success: false,
      message: 'Failed to upload the file',
    }, { status: 500 });
  }
}
