# Environment Variables

- PORT: The port this service is going to use
- SENDGRID_API_key: API key from SendGrid
- MAILGUN_DOMAIN: Mailgun subdomain
- MAILGUN_API_KEY: API Key from Mailgun

# Run

```
export PORT=80
export UPLOAD_PATH=/tmp/
export SENDGRID_API_KEY='xxx'
export MAILGUN_DOMAIN='xxx'
export MAILGUN_API_KEY='xxx'
npm install
node index.js > log 2>&1 &
```

# API

POST /schedule

* Must include either text or html parameter
* Types of `string[]` is an array of string values divided by comma `,`
* Attachments should be sent using multipart/form-data
* Attachments should be at most 7MB each
* At most 10 attachments are allowed

Parameters:

- from(string,required): The email address that appears in the 'from' section
- fromname(string): The name that appears in the 'from' section
- to(string[],required): The email address(es) that the mail is sent to
- toname(string[]): The name(s) that appears in the 'to' section
- subject(string,required): Mail subject
- text(string): Plain text content of the mail
- html(string): HTML content of the mail
- cc(string[]): Email address(es) of carbon copy recipients
- ccname(string[]): Name(s) of carbon copy recipients
- bcc(string[]): Email address(es) of blind carbon copy recipients
- bccname(string[]): Name(s) of blind carbon copy recipients
- attachments(files[]): File(s) to be sent
- deliverytime(long): UNIX timestamp at which the mail should be sent

# Security Consideration

This service should not be used without any authentication measure. The proper way to add autentication in this case in production is using a privately signed certificate for HTTPS communication. Only certificates from the same private CA as the one the server is using can be authenticated. This way authentication is done both way (both client and server).

A simpler way is using a preshared password as a token, this is the easiest way to implement, but it has the potential of being hijacked by simple packet sniffing. It's recommended to be used along with HTTPS.

