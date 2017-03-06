package pt.test.cassandra;

import java.io.IOException;
import java.net.URISyntaxException;

import org.codehaus.groovy.control.CompilationFailedException;
import org.junit.Test;

import groovy.lang.GroovyShell;
import groovy.lang.Script;

public class TestCassandraApp {
	@Test
	public void testTemplate() throws CompilationFailedException, IOException, URISyntaxException{
		Script script = new GroovyShell().parse(TestCassandraApp.class.getResource("init-script.groovy").toURI());
		script.getBinding().setProperty("keyspace", "roda");
		System.out.println(script.run());
	}
}
