import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { ServiceAccount } from 'firebase-admin';

dotenv.config();

const serviceAccountKey = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // fix for failure to parse newlines in private key
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(
    (serviceAccountKey as unknown) as ServiceAccount,
  ),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export default admin;
