import { useEffect, useState } from 'react';

// Replace with your values
const CLIENT_ID = 'Client_id';
// const API_KEY = 'YOUR_API_KEY_IF_NEEDED'; // Optional
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
const SPREADSHEET_ID = 'spreadsheet_id';

export const useGoogleSheets = () => {
  const [isReady, setIsReady] = useState(false); // gapi and tokenClient ready
  const [isSignedIn, setIsSignedIn] = useState(false); // User authenticated
  const [tokenClient, setTokenClient] = useState(null);
  const [error, setError] = useState(null);

  // Load Google Identity script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initTokenClient();
      initGapi();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize tokenClient for OAuth
  const initTokenClient = () => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (resp) => {
        if (resp.error) {
          setError(resp.error);
          console.error('Auth error:', resp);
          return;
        }
        setIsSignedIn(true);
      },
    });
    setTokenClient(client);
  };

  // Initialize gapi client
  const initGapi = () => {
    window.gapi.load('client', async () => {
      try {
        await window.gapi.client.init({
          // apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        setIsReady(true);
      } catch (err) {
        setError(err);
        console.error('GAPI init error:', err);
      }
    });
  };

  // Trigger Google sign-in
  const signIn = () => {
    if (!tokenClient) return;
    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  // Append URL to sheet (e.g., add to next row in column A)
  const appendToSheet = async (imageUrl) => {
    if (!isReady || !isSignedIn) {
      setError('Not ready or not signed in');
      return;
    }

    try {
      const response = await window.gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A:A', // Append to column A in Sheet1; adjust as needed
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS', // Adds new row
        resource: {
          values: [[imageUrl]], // Single cell with URL; add more columns if needed, e.g., [[imageUrl, timestamp]]
        },
      });
      console.log('Appended:', response.result);
      return response.result;
    } catch (err) {
      setError(err);
      console.error('Append error:', err);
    }
  };

  return { isReady, isSignedIn, signIn, appendToSheet, error };
};