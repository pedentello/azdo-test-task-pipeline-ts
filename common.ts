import * as vm from "azure-devops-node-api";
import * as lim from "azure-devops-node-api/interfaces/LocationsInterfaces";

function getEnv(name: string): string {

    let val = process.env[name];
    if (!val) {
        console.error(`${name} env var not set`);
        process.exit(1);
    }
    return val;
}

export async function getWebApi(): Promise<vm.WebApi> {
    return new Promise<vm.WebApi>(async (resolve, reject) => {
        try {
            let serverUrl = getEnv("API_URL");
            let token = getEnv("API_TOKEN");
            //console.log("Start getWebApi")
            //console.log(token)
            let authHandler = vm.getPersonalAccessTokenHandler(token);
            //console.log(authHandler)
            let vsts: vm.WebApi = new vm.WebApi(serverUrl, authHandler);
            //console.log("Finished")

            resolve(vsts);
        }
        catch (err) {
            reject(err);
        }
    });
}

export function getProject(): string {
    return getEnv("API_PROJECT");
}

export function getDefinition(): string {
    return getEnv("API_DEFINITION");
}

