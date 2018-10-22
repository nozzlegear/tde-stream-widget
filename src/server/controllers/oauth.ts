import { Controller, Get } from "@overnightjs/core";
import { Request, Response, NextFunction } from "express";
import * as got from "got";
import { OAuthResponse, GetUserResponse } from "twitch";
import { StreamerData } from "app";
import { FAKE_DATA } from "../../shared/fake-data";

@Controller("oauth")
export class OAuthController {
    constructor(private CLIENT_ID: string, private CLIENT_SECRET: string) {}

    @Get("tde-streamer-widget")
    finishOauth(req: Request, res: Response, next: NextFunction): void {
        const url = `https://id.twitch.tv/oauth2/token?client_id=${this.CLIENT_ID}&client_secret=${
            this.CLIENT_SECRET
        }&grant_type=client_credentials&scope=user:edit`;
        const result = got.post(url);

        result
            .then(response => {
                const body: OAuthResponse =
                    typeof response.body === "string" ? JSON.parse(response.body) : response.body;

                return this.getStreamerData(body.access_token, FAKE_DATA.map(f => f.username));

                // res.json({
                //     ...body,
                //     access_token: "<hidden>"
                // });
            })
            .then(response => {
                const body: GetUserResponse =
                    typeof response.body === "string" ? JSON.parse(response.body) : response.body;

                res.json(body);
            })
            .catch(next);
    }

    getStreamerData(accessToken: string, usernames: string[]): got.GotPromise<any> {
        const query = usernames.map(u => "login=" + u).join("&");
        const url = `https://api.twitch.tv/helix/users?${query}`;

        return got.get(url, {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        });

        // curl -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
        //     -X GET 'https://api.twitch.tv/helix/users?id=44322889'
    }
}
