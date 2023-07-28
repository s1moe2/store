import * as dotenv from "dotenv";
dotenv.config();

if(process.env.JWT_SECRET === undefined) throw new Error("Env variable `JWT_SECRET` is not defined");
if(process.env.MONGO_USR === undefined) throw new Error("Env variable `MONGO_USR` is not defined");
if(process.env.MONGO_PWD === undefined) throw new Error("Env variable `MONGO_PWD` is not defined");

export const PORT: number | string = process.env.API_PORT ?? 3000;
export const JWT_SECRET: string = process.env.JWT_SECRET;
export const MONGO_USR: string = process.env.MONGO_USR;
export const MONGO_PWD: string = process.env.MONGO_PWD;

