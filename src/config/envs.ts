import 'dotenv/config';
import { get } from 'env-var';


export const envs = {


  //! PORT
  PORT: get('PORT').required().asPortNumber(),
  //! MONGO DB
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  MONGO_USER: get('MONGO_USER').required().asString(),
  MONGO_PASS: get('MONGO_PASS').required().asString(),

  //! Mailer Email
  MAILER_EMAIL: get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  SEND_EMAIL: get('SEND_EMAIL').required().asBool(),

  //! JWT
  JWT_SEED: get('JWT_SEED').required().asString(),

  WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),

  INITIAL_SUPERADMIN_EMAIL: get('INITIAL_SUPERADMIN_EMAIL').required().asEmailString(),
  INITIAL_SUPERADMIN_PASSWORD: get('INITIAL_SUPERADMIN_PASSWORD').required().asString(),

  POSTGRES_URL: get('POSTGRES_URL').required().asString(),
}



