import { registerAs } from "@nestjs/config";

export default registerAs("binance", () => ({
    apiKey: process.env.BINANCE_API_KEY,
    secretKey: process.env.BINANCE_SECRET_KEY
}));
