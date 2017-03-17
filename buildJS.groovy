import org.apache.commons.exec.*

def executeNodeCmd = { List args ->

    CommandLine command = new CommandLine('node')
    args.each { arg ->
        command.addArgument(arg.toString())
    }
    PumpStreamHandler streamHandler = new PumpStreamHandler();
    DefaultExecutor executor = new DefaultExecutor();
    executor.setWorkingDirectory(new File("./app-js"));
    executor.setStreamHandler(streamHandler);
    executor.execute(command);
}

def executeNgCli = { List args ->
    List<Object> cargs = ["${project.basedir.absolutePath}/app-js/node_modules/@angular/cli/bin/ng"]
    cargs.addAll(args)
    executeNodeCmd(cargs)
}

if (!("${project.basedir.absolutePath}/app-js/node_modules" as File).exists()) {
    executeNodeCmd(["${nodeModulesPath}/npm/cli.js",'install','.'])
}
executeNgCli(['build', '--prod'])
def srcPath = "${project.basedir.absolutePath}/app-js/dist"
def desPath = "${project.basedir.absolutePath}/target/classes/static"

ant.sequential {
    echo("delete $desPath")
    delete(dir: desPath, quiet: true, verbose: false)
    echo 'done'
    echo("from $srcPath")
    mkdir(dir: desPath)
    copy(todir: desPath) {
        fileset(dir: srcPath) {
            include(name: "**/*")
        }
    }
    echo("done")
}
