require('shelljs/make');

var run = function(cl) {
    console.log('> ' + cl);
    var rc = exec(cl).code;
    if (rc !== 0) {
        echo('Exec failed with rc ' + rc);
        exit(rc);
    }
}

target.test = function() {
    
    run('npm install');

    console.log("-------Unit Tests-------");
    run('tsc -p ./test/units');
    run('mocha test/units');
}

target.build = function() {

    console.log("Start")

    run('npm install');
    run('tsc');

    console.log('Done');
}
