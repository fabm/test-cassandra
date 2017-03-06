def jsPath = "${project.basedir.absolutePath}/app-js/dist"

ant.sequential {
	echo("delete $jsPath")
	delete(dir:jsPath, quiet:true, verbose:false)
	echo 'done'
}