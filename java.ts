import * as cm from "./common";
import * as vm from "azure-devops-node-api";
import * as ba from "azure-devops-node-api/BuildApi";

export async function run() {
    try
    {
        console.log("*--* Start Test Java Pipeline *--*");
        let vsts: vm.WebApi = await cm.getWebApi();

        let vstsBuild: ba.IBuildApi = await vsts.getBuildApi();

        let project = cm.getProject();
        console.log("project", project);

        let definition = cm.getDefinition();
        console.log("definition", definition);

    }
    catch (err) {
        console.error(`Error`);
    }

}
