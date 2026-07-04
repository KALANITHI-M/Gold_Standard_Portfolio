# EmailJS Setup Guide

## Overview
The contact form on your portfolio now uses EmailJS to send emails directly to your inbox without needing a backend server.

## Setup Steps

### 1. Create an EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add an Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Connect your **kalanithi54321@gmail.com** account
5. Copy the **Service ID** (e.g., `service_xxxxxxx`)

### 3. Create an Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. In the template settings:
   - **To Email**: kalanithi54321@gmail.com
   - **From Name**: {{from_name}}
   - **Reply To**: {{from_email}}
5. Copy the **Template ID** (e.g., `template_xxxxxxx`)

### 4. Get Your Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxxxx`)

### 5. Update Environment Variables
1. Open `.env.local` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### 6. Restart Your Development Server
After updating the `.env.local` file, restart your dev server:

```bash
npm run dev
```

## Testing
1. Go to your portfolio's contact section
2. Fill out the form with test data
3. Click "Send Message"
4. Check your **kalanithi54321@gmail.com** inbox for the test email

## Troubleshooting

### Email not received?
- Check your EmailJS dashboard logs
- Verify all credentials are correct in `.env.local`
- Make sure you restarted the dev server after updating `.env.local`
- Check spam folder

### Gmail security issues?
- Enable "Less secure app access" in Gmail settings, OR
- Use an App Password if you have 2FA enabled

## Free Tier Limits
- EmailJS free tier: 200 emails/month
- Sufficient for most portfolio contact forms

## Support
If you need help, check the [EmailJS Documentation](https://www.emailjs.com/docs/)
