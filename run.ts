let pipelinesJson:JSON = require("../pipelines.json");
//console.info(pipelinesJson["description"]);

let pipelines: string[] = [];
let result = pipelinesJson["pipelines"];
for (let i: number = 0; i < result.length; i++) {
    pipelines.push(result[i].name)
}
//console.log(pipelines);  

let selection: string = process.argv[2];
//console.info(selection);

if (selection) {
    if (pipelines.indexOf(selection) == -1) {
        console.error("Not a valid pipeline.  See list of pipelines");
        process.exit(1);
    }

    pipelines = [selection];
}


async function runPipelines(selected?: string) {
   
    for (let i: number = 0; i < pipelines.length; i++) {
        let pipeline: string = pipelines[i];

        if (selected && pipeline !== selected) {
            continue;
        }

        var sm = require(`./${pipeline}.js`);
        await sm.run(pipeline);
    }

}

function run() {
    runPipelines();
}

runPipelines(process.argv[2]);



