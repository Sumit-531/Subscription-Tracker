export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
        /* Reset styles */
        body, table, td, p, a { 
            -webkit-text-size-adjust: 100%; 
            -ms-text-size-adjust: 100%; 
        }
        table, td { 
            mso-table-lspace: 0pt; 
            mso-table-rspace: 0pt; 
        }
        img { 
            -ms-interpolation-mode: bicubic; 
            border: 0; 
            height: auto; 
            line-height: 100%; 
            outline: none; 
            text-decoration: none; 
        }
        
        /* Animations */
        @keyframes gradientShift {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.8;
            }
        }
        
        .animated-header {
            background: linear-gradient(135deg, #2563eb, #7c3aed, #2563eb, #1e40af);
            background-size: 300% 300%;
            animation: gradientShift 8s ease infinite;
        }
        
        .fade-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .info-table {
            animation: fadeInUp 1s ease-out 0.2s backwards;
        }
        
        .highlight {
            animation: pulse 2s ease-in-out infinite;
        }
        
        /* Responsive styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
                padding: 10px !important;
            }
            .email-content {
                padding: 30px 20px !important;
            }
            .email-header {
                padding: 30px 20px !important;
            }
            .email-header-text {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .email-body-text {
                font-size: 15px !important;
            }
            .info-table {
                margin-bottom: 20px !important;
            }
            .info-cell {
                padding: 14px 16px !important;
                font-size: 14px !important;
            }
            .footer-content {
                padding: 20px 16px !important;
                font-size: 12px !important;
            }
            .footer-links {
                display: block !important;
                margin-top: 8px !important;
            }
            .footer-links a {
                display: inline-block !important;
                margin: 4px 8px !important;
            }
        }
        
        @media only screen and (max-width: 480px) {
            .email-header-text {
                font-size: 22px !important;
            }
            .email-body-text {
                font-size: 14px !important;
            }
            .info-cell {
                font-size: 13px !important;
                padding: 12px 14px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6;">
    <div class="email-container" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3f4f6;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">
            <tr>
                <td class="email-header animated-header" style="background: linear-gradient(135deg, #2563eb, #7c3aed, #2563eb, #1e40af); background-size: 300% 300%; padding: 40px 30px; text-align: center;">
                    <p class="email-header-text" style="font-size: 28px; line-height: 1.2; font-weight: 700; color: #ffffff; margin: 0; letter-spacing: -0.5px;">Subscription Tracker</p>
                </td>
            </tr>
            <tr>
                <td class="email-content fade-in" style="padding: 40px 30px;">                
                    <p class="email-body-text" style="font-size: 16px; margin-bottom: 24px; color: #1f2937;">Hello <strong class="highlight" style="color: #2563eb;">${userName}</strong>,</p>
                    
                    <p class="email-body-text" style="font-size: 16px; margin-bottom: 24px; color: #1f2937;">Your <strong>${subscriptionName}</strong> subscription is set to renew on <strong style="color: #2563eb;">${renewalDate}</strong> (<strong class="highlight" style="color: #7c3aed;">${daysLeft} days from today</strong>).</p>
                    
                    <table class="info-table" cellpadding="16" cellspacing="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 24px;">
                        <tr>
                            <td class="info-cell" style="font-size: 15px; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding: 16px 20px;">
                                <strong style="color: #374151;">Plan:</strong> ${planName}
                            </td>
                        </tr>
                        <tr>
                            <td class="info-cell" style="font-size: 15px; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding: 16px 20px;">
                                <strong style="color: #374151;">Price:</strong> ${price}
                            </td>
                        </tr>
                        <tr>
                            <td class="info-cell" style="font-size: 15px; color: #1f2937; padding: 16px 20px;">
                                <strong style="color: #374151;">Payment Method:</strong> ${paymentMethod}
                            </td>
                        </tr>
                    </table>
                    
                    <p class="email-body-text" style="font-size: 16px; margin-bottom: 24px; color: #1f2937;">If you'd like to make changes or cancel your subscription, please visit your <a href="${accountSettingsLink}" style="color: #2563eb; text-decoration: none; font-weight: 500;">account settings</a> before the renewal date.</p>
                    
                    <p class="email-body-text" style="font-size: 16px; margin-top: 32px; color: #1f2937;">Need help? <a href="${supportLink}" style="color: #2563eb; text-decoration: none; font-weight: 500;">Contact our support team</a> anytime.</p>
                    
                    <p class="email-body-text" style="font-size: 16px; margin-top: 32px; color: #1f2937; line-height: 1.5;">
                        Best regards,<br>
                        <strong style="color: #374151;">The Subscription Tracker Team</strong>
                    </p>
                </td>
            </tr>
            <tr>
                <td class="footer-content" style="background-color: #f9fafb; padding: 24px 30px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 12px; line-height: 1.5;">
                        Subscription-tracker Inc. | Uttara 10, Dhaka, Bangladesh
                    </p>
                    <p class="footer-links" style="margin: 0; line-height: 1.5;">
                        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px; font-weight: 500;">Unsubscribe</a> | 
                        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px; font-weight: 500;">Privacy Policy</a> | 
                        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px; font-weight: 500;">Terms of Service</a>
                    </p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
`;







export const emailTemplates = [
  {
    label: "7 days before reminder",
    generateSubject: (data) =>
      `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days before reminder",
    generateSubject: (data) =>
      `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "2 days before reminder",
    generateSubject: (data) =>
      `🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
  },
  {
    label: "1 days before reminder",
    generateSubject: (data) =>
      `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
];