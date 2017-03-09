import org.apache.commons.exec.*;

CommandLine command = new CommandLine('ng');
command.addArgument('build')
command.addArgument('--prod')
PumpStreamHandler streamHandler = new PumpStreamHandler();
DefaultExecutor executor = new DefaultExecutor();
executor.setWorkingDirectory(new File("./app-js"));
executor.setStreamHandler(streamHandler);
executor.execute(command);

def srcPath = "${project.basedir.absolutePath}/app-js/dist"
def desPath = "${project.basedir.absolutePath}/target/classes/static"



ant.sequential {
	echo("delete $desPath")
	delete(dir:desPath, quiet:true, verbose:false)
	echo 'done'
	echo("from $srcPath")
	mkdir(dir:desPath)
	copy(todir: desPath) {
		fileset(dir: srcPath) {
			include(name: "**/*")
		}
	}
	echo("done")
}