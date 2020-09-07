# mint-telegram-bot [![Build Status](https://travis-ci.org/eralpsahin/mint-telegram-bot.svg?branch=master)](https://travis-ci.org/eralpsahin/mint-telegram-bot)

> Telegram bot that gets your Mint Mobile stats faster than the official Mint Mobile App.

Start using it here: [@MintMobileBot](https://t.me/MintMobileBot)

## Setup
- Telegram requires HTTPS.
- Create self signed certificate: `openssl req -newkey rsa:2048 -sha256 -nodes -keyout server.key -x509 -days 365 -out server.pem`
    -  Fill out the certificate form by following [this](https://core.telegram.org/bots/self-signed) tutorial. Use your ip/domain and company name.
    - Certificate expiration is 365 days.
    - Use `server.pem` to create Webhook on Telegram API.
    - Use the following snippet in a website like https://jsfiddle.net/ to send the webhook request.
    ```
    <html>
    <body>
    <form action="https://api.telegram.org/bot<api-token>/setwebhook" method="post" enctype="multipart/form-data">
        Select Certificate to upload:
        <input type="file" name="certificate" id="fileToUpload">
        URL: <input type="text" name="url"  value="your ip or domain"><br>
        <input type="submit" value="Upload Certificate" name="submit">
    </form>
    </body>
    </html>
    ```
    - Response should be: `{"ok":true,"result":true,"description":"Webhook was set"}`.
    - Check if everything went well: `https://api.telegram.org/bot<api-token>/getWebhookinfo` You should see `has_custom_certificate":true`.