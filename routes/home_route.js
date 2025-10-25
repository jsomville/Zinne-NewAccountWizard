import express from 'express';

const router = express.Router();

const home_page = () => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Zinne Wizard Test - Home</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <div class="banner">
                <div class="banner-content">
                    <a href="/">
                        <img src="/images/logo.png" alt="Company Logo" class="logo">
                    </a>
                    <h1 class="banner-title">Home Page</h1>
                </div>
            </div>
            <div class="form-container">
                <ul class="nav-list">
                    <li><a href="/register">Register</a></li>
                    <li><a href="/register.html">Register Static Page</a></li>
                    <li><a href="/api">API</a></li>
                    <li><a href="/payment">Payment</a></li>
                </ul>
            </div>
        </body>
    </html>`;
}

router.get('/', (req, res) => {
    res.send(home_page())
})

export default router;