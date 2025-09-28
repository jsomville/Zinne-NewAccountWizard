import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create transporter outside for reuse
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
    }
});

const generatePDF = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const chunks = [];

            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));

            // Add logo
            doc.image(join(__dirname, '..', 'public', 'images', 'logo.png'), 50, 50, { width: 50 });
            
            // Add title
            doc.moveDown();
            doc.fontSize(20).text('Registration Form', { align: 'center' });
            doc.moveDown();

            // Add registration info
            doc.fontSize(12);
            doc.text(`Date: ${new Date().toLocaleDateString()}`);
            doc.moveDown();
            doc.text(`Personal Information:`);
            doc.text(`  First Name: ${data.firstname}`);
            doc.text(`  Last Name: ${data.lastname}`);
            doc.text(`  Date of Birth: ${data.dateofbirth}`);
            doc.moveDown();
            doc.text(`Contact Information:`);
            doc.text(`  Email: ${data.email}`);
            doc.text(`  Address: ${data.street} ${data.number} ${data.postalCode} ${data.city}`);
            doc.moveDown();

            // Add signature
            if (data.signature) {
                doc.text('Signature:');
                doc.moveDown();
                doc.image(data.signature, { fit: [200, 100] });
            }

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

export const sendTestEmail = async (req, res) => {
    try {
        const code = Math.floor(100000 + Math.random() * 900000);
        console.log(`Generated code: ${code}`);

        await transporter.sendMail({
            from: '"No-Reply" <no-reply@zinne.brussels>',
            to: "jsomville@hotmail.com",
            subject: `Your Email Confirmation Code is ${code}`,
            text: "Your Email confirmation code is " + code,
            html: "<b>Thank you for registering!</b>"
        });

        res.status(200).send({ message: 'Registration confirmed and email sent'});
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Error sending email'});
    }
};

export const register = async (req, res) => {
    try {
        const { firstname, lastname, dateofbirth, street, number, postalCode, city, email, signature } = req.body;

        // Validate required fields
        if (!firstname || !lastname || !dateofbirth || !street || 
            !number || !postalCode || !city || !email || !signature) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate postal code format
        if (!/^\d{4}$/.test(postalCode)) {
            return res.status(400).json({ message: 'Invalid postal code format' });
        }

        // Load cities from JSON file for validation
        const citiesPath = join(__dirname, '..', 'public', 'data', 'cities.json');
        const citiesData = JSON.parse(readFileSync(citiesPath, 'utf8'));
        const validCity = citiesData.cities.find(c => c.value === city);
        
        if (!validCity) {
            return res.status(400).json({ message: 'Invalid city selected' });
        }

        // Validate postal code matches selected city
        if (validCity.postalCode !== postalCode) {
            return res.status(400).json({ message: 'Postal code does not match selected city' });
        }

        const code = Math.floor(100000 + Math.random() * 900000);

        // Generate PDF
        const pdfBuffer = await generatePDF(req.body);

        // Send email with PDF attachment
        await transporter.sendMail({
            from: '"No-Reply" <no-reply@zinne.brussels>',
            to: email,
            subject: `Registration Confirmation - Code: ${code}`,
            html: `
                <h2>Registration Confirmation</h2>
                <p>Hello ${firstname} ${lastname},</p>
                <p>Thank you for your registration. Please find your registration form attached.</p>
                <p>Your confirmation code is: <strong>${code}</strong></p>
            `,
            attachments: [{
                filename: 'registration.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf'
            }]
        });

        res.status(200).json({ message: 'Registration successful! Please check your email for confirmation.' });
    } catch (error) {
        console.error('Error processing registration:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
};

export const verify = async (req, res) => {
    try {
        const { code } = req.body;
        
        if (code === '123456') {
            res.status(200).json({ message: 'Verification successful' });
        } else {
            res.status(400).json({ message: 'Invalid verification code' });
        }
    } catch (error) {
        console.error('Error verifying code:', error);
        res.status(500).json({ message: 'Verification failed' });
    }
};