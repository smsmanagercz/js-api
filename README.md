# SmsManager JS API

A simple TypeScript/JavaScript library for sending SMS messages using the SMSManager API. Supports both Promise-based and callback-based usage, and returns message ID information.

## Installation

```bash
npm install sms-sender
```

## Building the Project

To build the project, follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

The compiled JavaScript files will be output to the `dist` directory.

## Usage

### Promise-based (TypeScript)

```typescript
import SmsManager from 'smsmanager-js-api';

const sender = new SmsManager('your-api-key-here');

async function sendMessage() {
  const result = await sender.send('phone-number-here', 'Your message text');
  if (result.success) {
    console.log('SMS sent successfully. Message ID:', result.messageId);
  } else {
    console.log('Failed to send SMS');
  }
}

sendMessage();
```
### Callback-based (TypeScript)

```typescript
import SmsManager from 'smsmanager-js-api';

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
```

### Promise-based (JavaScript)

```javascript
const SmsManager = require('smsmanager-js-api');

const sender = new SmsManager('your-api-key-here');

sender.send('phone-number-here', 'Your message text')
  .then(result => {
    if (result.success) {
      console.log('SMS sent successfully. Message ID:', result.messageId);
    } else {
      console.log('Failed to send SMS');
    }
  })
  .catch(error => {
    console.error('Error sending SMS:', error);
  });
```

### Callback-based (JavaScript)

```javascript
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
```

## API

### `new SmsManager(apiKey: string)`

Creates a new instance of the SmsManager class.

- `apiKey` (string): Your SMSManager API key

### `sender.send(phoneNumber: string, message: string): Promise<SMSResult>`
### `sender.send(phoneNumber: string, message: string, callback: (error: Error | null, result: SMSResult) => void): void`

Sends an SMS message.

- `phoneNumber` (string): The recipient's phone number
- `message` (string): The text message to send
- `callback` (optional function): A callback function to handle the result

Returns a Promise that resolves to an `SMSResult` object or calls the callback with the result. The `SMSResult` object has the following structure:

```typescript
interface SMSResult {
  success: boolean;
  messageId: string | null;
}
```

- `success`: `true` if the message was sent successfully, `false` otherwise.
- `messageId`: A string containing the message ID if the send was successful, `null` otherwise.

## License

MIT