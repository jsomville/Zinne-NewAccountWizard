import express from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.get('/', (req, res) => {
    // Load bank apps config
    const bankAppsPath = join(__dirname, '..', 'public', 'data', 'bankApps.json');
    const bankApps = JSON.parse(readFileSync(bankAppsPath, 'utf8'));

    // Current date in ISO format
    const now = new Date();
    
    // Payment information
    const payment = {
        amount: '50.00',
        currency: 'EUR',
        reference: 'REG-2023',
        beneficiary: 'Zinne VZW',
        iban: 'BE68539007547000',
        bic: 'BBRUBEBB',
        description: 'Registration Fee'
    };

    // Generate EPC QR Code data
    const epcData = `BCD
002
1
SCT
${payment.bic}
${payment.beneficiary}
${payment.iban}
${payment.currency}${payment.amount}
${payment.reference}
${payment.description}`;

    res.render('pay', {
        bankApps: bankApps.bankApps,
        payment: payment,
        epcData: epcData,
        date: {
            iso: now.toISOString(),
            formatted: now.toLocaleString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).replace(/\//g, '-')
        }
    });
});

export default router;