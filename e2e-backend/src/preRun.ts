import dotenv from "dotenv";
import { AuthenticatedRequests } from "./commonDataModels/AuthenticatedRequests";
dotenv.config();
// import fetch from "node-fetch";

// window = {} as any;
// window.fetch = fetch as any;
// loads our auth token into the static class we use to build requests
await AuthenticatedRequests.setToken();

export {};
