import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars { // Define the environment variables PORT as a number
    PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(), // Port is required and must be a number
})
.unknown(true); // Allow other environment variables

// change name value for envVars
const { error, value } = envsSchema.validate( process.env ); // Validate the environment variables 

if ( error ) {
    throw new Error(`Config validation error: ${ error.message }`);
}

const envVars : EnvVars = value;

export const envs = {

    port: envVars.PORT, // Port is a number

}