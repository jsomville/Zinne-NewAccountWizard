import express from 'express';

const router = express.Router();

const home_page = () => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home</title>
        </head>
        <body>
            <h1>New account Wizard</h1>

            <a href="/step2">Next</a>
        </body>
    </html>`;
}

const step_page = () => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home</title>
        </head>
        <body>
            <h1>Step</h1>

            <a href="/step2>Next</a>
        </body>
    </html>`;
}

router.get('/', (req, res) => {
    res.send(home_page())
})


router.get('/step2', (req, res) => {
    res.send(step_page())
})

export default router;