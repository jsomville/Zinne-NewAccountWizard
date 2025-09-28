import express from 'express';

const router = express.Router();

const home_page = () => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wizard</title>
        </head>
        <body>
            <h1>New account Wizard</h1>

            <a href="/wizard/step2">Next</a>
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
        </head>
        <body>
            <h1>New account Wizard - Step 2</h1>

            <a href="/wizard/step3">Next</a>
        </body>
    </html>`;
}

const step3_page = () => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home</title>
        </head>
        <body>
            <h1>New account Wizard Finished</h1>
        </body>
    </html>`;
}

router.get('/', (req, res) => {
    res.send(home_page())
})


router.get('/step2', (req, res) => {
    res.send(step2_page())
})

router.get('/step3', (req, res) => {
    res.send(step3_page())
})

export default router;