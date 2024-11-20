import fetch from 'node-fetch';

interface SMSResult {
  success: boolean;
  messageId: string | null;
}

type SMSCallback = (error: Error | null, result: SMSResult) => void;

class SmsManager {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  send(phoneNumber: string, message: string): Promise<SMSResult>;
  send(phoneNumber: string, message: string, callback: SMSCallback): void;
  send(phoneNumber: string, message: string, callback?: SMSCallback): Promise<SMSResult> | void {
    const sendRequest = async (): Promise<SMSResult> => {
      try {
        const response = await fetch('https://http-api.smsmanager.cz/Send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            apikey: this.apiKey,
            number: phoneNumber,
            message: message
          })
        });

        const responseText = await response.text();
        const [status, messageId] = responseText.split('|');

        return {
          success: status === 'OK',
          messageId: status === 'OK' ? messageId : null
        };
      } catch (error) {
        console.error('Error sending SMS:', error);
        return {
          success: false,
          messageId: null
        };
      }
    };

    if (callback) {
      sendRequest()
        .then(result => callback(null, result))
        .catch(error => callback(error, { success: false, messageId: null }));
    } else {
      return sendRequest();
    }
  }
}

export default SmsManager;
