import * as cm from "./common";
import * as vm from "azure-devops-node-api";
import * as ba from "azure-devops-node-api/BuildApi";

let pipelinesJson:JSON = require("../pipelines.json");
//console.info(pipelinesJson["description"]);

export async function run(myPipeline:string) {
    
    try
    {
        console.log("*--* Start Test Flutter Pipeline *--*");

        let pipelines: string[] = [];
        let result = pipelinesJson["pipelines"].filter((pipeline) => pipeline.name == myPipeline);
        let tasks = result[0]["tasks"];
        //console.log(tasks);  

        let vsts: vm.WebApi = await cm.getWebApi();

        let vstsBuild: ba.IBuildApi = await vsts.getBuildApi();

        let project = cm.getProject();
        //console.log("project", project);

        let definition = cm.getDefinition();
        //console.log("definition", definition);

        const build = await vstsBuild.getLatestBuild(project,definition)
        if (build.id) {

            const buildYaml = await vstsBuild.getBuildLogLines(project,build.id,1);

            if (buildYaml) {
                //console.log(buildYaml);

                for (let i: number = 0; i < tasks.length; i++) {
                    const hasTask = buildYaml.toString().includes(tasks[i]);
                    //console.log(tasks[i]);
                    console.log(`${tasks[i]} task is ${hasTask ? 'present' : 'not present'} in the pipeline.`);
                }
            } else {
                console.log("Erro");
            }

        }        

    }
    catch (err) {
        console.error(`Error`);
    }

}
