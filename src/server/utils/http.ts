import { AsyncResult } from "@nozzlegear/railway";
import * as got from "got";

type Headers = { [key: string]: string };

/**
 * Converts a got promise into an Async<string>, where the value is the response body.
 */
const toAsync: <T>(promise: got.GotPromise<any>) => AsyncResult<T> = <T>(promise) =>
    AsyncResult.wrap(promise.then(r => r.body)).map<T>(b => (typeof b === "string" ? JSON.parse(b) : b));

/**
 * Calls the @param url and parses the response body string to a JSON object of type @see T
 */
export const getJson: <T>(url: string, headers?: Headers) => AsyncResult<T> = <T>(url, headers = {}) => {
    const result = got.get(url, {
        headers: headers
    });

    return toAsync<T>(result);
};

/**
 * Makes an HTTP POST request to the @param url and parses the response body string to a JSON object of type @see T
 */
export const postJson: <T, D extends Object = Object>(url: string, body: D, headers?: Headers) => AsyncResult<T> = <T>(
    url,
    body,
    headers = {}
) => {
    const result = got.post(url, {
        body: body,
        json: true,
        headers: headers
    });

    return toAsync<T>(result);
};
