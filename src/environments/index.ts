import * as dotenv from 'dotenv';
dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// application
const PORT: number = +process.env.PORT || 3000;
const DOMAIN: string = process.env.DOMAIN || 'localhost';
// MongoDB

export {
    NODE_ENV,
    DOMAIN,
    PORT,
};