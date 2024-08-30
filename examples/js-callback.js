const SmsManager = require('smsmanager-js-api');

const sender = new SmsManager('your-api-key-here');

sender.send('phone-number-here', 'Your message text', (error, result) => {
    if (error) {
        console.error('Error sending SMS:', error);
    } else if (result.success) {
        console.log('SMS sent successfully. Message ID:', result.messageId);
    } else {
        console.log('Failed to send SMS');
    }
});