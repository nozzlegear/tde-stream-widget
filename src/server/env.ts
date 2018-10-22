import { Option } from "@nozzlegear/railway";

export function envVar(key: string): Option<string> {
    const value = process.env[key];

    return value ? Option.ofSome(value) : Option.ofNone();
}

export function envVarRequired(key: string): string {
    const value = envVar(key);

    if (value.isNone()) {
        throw Error(`Environment variable ${key} is not found.`);
    }

    return value.get();
}
