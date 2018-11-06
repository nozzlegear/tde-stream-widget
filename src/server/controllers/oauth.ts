import { Controller, Get } from "@overnightjs/core";
import { Request, Response, NextFunction } from "express";
import { OAuthResponse, GetUserResponse } from "twitch";
import { StreamerData, ErrorResponse } from "app";
import { FAKE_DATA } from "../../shared/fake-data";
import { AsyncResult } from "@nozzlegear/railway";
import * as http from "../utils/http";
import { GotError } from "got";

@Controller("oauth")
export class OAuthController {
    constructor(private CLIENT_ID: string, private CLIENT_SECRET: string) {}

    isGotError(err: any): err is GotError {
        return err.name === "HTTPError";
    }

    @Get("tde-streamer-widget")
    async finishOauth(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userNames = FAKE_DATA.map(channel => channel.username);

        await this.getBearerToken(this.CLIENT_ID, this.CLIENT_SECRET)
            .bind(tokenResult => this.getChannelData(tokenResult.access_token, userNames))
            .iter(channelData => res.json(channelData))
            .iterError(error => {
                let errorResponse: ErrorResponse;

                if (this.isGotError(error)) {
                    const code = parseInt((error as any).statusCode);
                    errorResponse = {
                        status: code,
                        ok: false,
                        message: error.message
                    };
                } else {
                    const data =
                        error instanceof Error
                            ? {
                                  name: error.name,
                                  message: error.message,
                                  stack: error.stack,
                                  ...error
                              }
                            : {
                                  message: "Something went wrong and the request could not be completed.",
                                  error: error
                              };

                    console.error("Failed to get channel data or bearer token", data);

                    errorResponse = {
                        status: 500,
                        message: data.message,
                        ok: false
                    };
                }

                res.status(errorResponse.status).json(errorResponse);
            })
            .get();
    }

    /**
     * Calls the Twitch OAuth API to create a temporary bearer token for authentication with the rest of the API.
     */
    getBearerToken(clientId: string, clientSecret: string): AsyncResult<OAuthResponse> {
        const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=user:edit`;

        return http
            .postJson<OAuthResponse>(url, null as any)
            .iterError(error => console.error("Failed to get bearer token", error));
    }

    /**
     * Gets channel data for a list of @param usernames, returning their channel info (e.g. profile image, offline image, viewcount).
     */
    getChannelData(accessToken: string, usernames: string[]): AsyncResult<GetUserResponse> {
        const query = usernames.map(u => "login=" + u).join("&");
        const url = `https://api.twitch.tv/helix/users?${query}`;

        return http
            .getJson<GetUserResponse>(url, {
                Authorization: "Bearer " + accessToken
            })
            .iterError(error => console.error("Failed to get channel data", error));
    }

    /**
     * Gets stream data for a list of @param usernames, returning their stream status (e.g. is live, thumbnail, iframe url).
     * @param usernames List of usernames for which stream data will be returned.
     */
    getStreamData(accessToken: string, usernames: string[]): AsyncResult<unknown> {
        const query = usernames.map(u => "user_login=" + u).join("&");
        const url = `https://api.twitch.tv/helix/streams?${query}`;

        return http.getJson<unknown>(url, {
            Authorization: "Bearer " + accessToken
        });
    }
}
