import dotenv from "dotenv";
import pg from "pg";
import pkg from "@prisma/client"; // precisamos instalar esse pacote!

dotenv.config();

const { PrismaClient } = pkg;

const client = new PrismaClient();


export default client;