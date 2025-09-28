import express from 'express';

const router = express.Router();

const wizard_page = () => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wizard</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <div class="banner">
                <div class="banner-content">
                    <a href="/">
                        <img src="/images/logo.png" alt="Company Logo" class="logo">
                    </a>
                    <h1 class="banner-title">Wizard Step 1</h1>
                </div>
            </div>
            <div class="form-container">
                <h2>New account Wizard</h2>
                <a href="/wizard/step2">Next</a>
            </div>
        </body>
    </html>`;
}

const step2_page = () => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wizard 2</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <div class="banner">
                <div class="banner-content">
                    <a href="/">
                        <img src="/images/logo.png" alt="Company Logo" class="logo">
                    </a>
                    <h1 class="banner-title">Wizard Step 2</h1>
                </div>
            </div>
            <div class="form-container">
                <h2>New account Wizard - Step 2</h2>
                <a href="/wizard/step3">Next</a>
            </div>
        </body>
    </html>`;
}

const step3_page = () => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wizard 3</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <div class="banner">
                <div class="banner-content">
                    <a href="/">
                        <img src="/images/logo.png" alt="Company Logo" class="logo">
                    </a>
                    <h1 class="banner-title">Wizard Complete</h1>
                </div>
            </div>
            <div class="form-container">
                <h2>New account Wizard Finished</h2>
            </div>
        </body>
    </html>`;
}

router.get('/', (req, res) => {
    res.send(wizard_page())
})


router.get('/step2', (req, res) => {
    res.send(step2_page())
})

router.get('/step3', (req, res) => {
    res.send(step3_page())
})

export default router;