import express from 'express';

const router = express.Router();

const home_page = () => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home</title>
            <style>
                .nav-list {
                    list-style: none;
                    padding: 0;
                }
                .nav-list li {
                    margin: 10px 0;
                }
                .nav-list a {
                    text-decoration: none;
                    color: #007bff;
                }
                .nav-list a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <h1>Home Page</h1>

            <ul class="nav-list">
                <li><a href="/wizard">Wizard</a></li>
                <li><a href="/register.html">Register</a></li>
                <li><a href="/api">API</a></li>
                <li><a href="/payment">Payment</a></li>
            </ul>
        </body>
    </html>`;
}

router.get('/', (req, res) => {
    res.send(home_page())
})

export default router;