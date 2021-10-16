import request from "supertest";
import LocalApiTestToken from "./LocalApiTestToken";
import fs from "fs";
export class AuthenticatedRequests {
    static contentType: string = "content-type";
    static jsonType: string = "application/json";
    static validToken: string = "";

    public static async setToken(): Promise<void> {
        const shouldRunAuthentication =
            AuthenticatedRequests.validToken === undefined ||
            AuthenticatedRequests.validToken === "";

        if (shouldRunAuthentication) {
            try {
                let localToken: LocalApiTestToken;

                if (fs.existsSync("./local-api-test-token.json")) {
                    localToken = new LocalApiTestToken(
                        JSON.parse(
                            fs
                                .readFileSync("./local-api-test-token.json")
                                .toString()
                        )
                    );
                } else {
                    localToken = new LocalApiTestToken();
                }

                if (localToken.needNewToken()) {
                    console.log("Getting new token...");
                    const authPostResponse = await request(
                        (process.env.AUTH0_ISSUER_URL || "").slice(
                            0,
                            Math.max(
                                0,
                                (process.env.AUTH0_ISSUER_URL || "").length - 1
                            )
                        )
                    )
                        .post("/oauth/token")
                        .set("content-type", "application/json")
                        .send({
                            /* eslint-disable @typescript-eslint/naming-convention */
                            client_id: process.env.AUTH0_CLIENT_ID,
                            client_secret: process.env.AUTH0_CLIENT_SECRET,
                            audience: process.env.AUTH0_AUDIENCE,
                            grant_type: "client_credentials",
                            /* eslint-enable @typescript-eslint/naming-convention */
                        });

                    localToken.access_token =
                        authPostResponse.body.access_token;
                    localToken.token_type = authPostResponse.body.token_type;
                    localToken.expires_in = authPostResponse.body.expires_in;
                    localToken.date_received = new Date();
                    fs.writeFileSync(
                        "./local-api-test-token.json",
                        JSON.stringify(localToken)
                    );

                    console.log(
                        "New token written to ./local-api-test-token.json"
                    );
                }

                AuthenticatedRequests.validToken = localToken.access_token!;
                console.log(
                    "using token for run: ",
                    AuthenticatedRequests.validToken
                );
            } catch (error) {
                console.error(error);
            }
        }
    }
}
