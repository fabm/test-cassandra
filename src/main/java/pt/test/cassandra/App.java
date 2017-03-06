package pt.test.cassandra;

import java.io.IOException;
import java.net.URISyntaxException;

import org.codehaus.groovy.control.CompilationFailedException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ApplicationContext;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class App 
{
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(App.class);
	}
	
    public static void main( String[] args ) throws CompilationFailedException, IOException, URISyntaxException
    {
    	ApplicationContext ac = SpringApplication.run(App.class, args);
    }   
}