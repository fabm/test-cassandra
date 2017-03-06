package pt.test.cassandra;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
	
    public EmployeeController() {
        System.out.println("EmployeeController()");
    }
         
    @RequestMapping(value = "/employee", method = RequestMethod.POST)    
    Employee create(@RequestBody Employee employee) {        
        return employeeService.createEmployee(employee);
    }
 
    @RequestMapping(value = "/employee/{id}", method = RequestMethod.DELETE)
    void delete(@PathVariable("id") int id) {
        employeeService.deleteEmployee(id);
    }
 
    @RequestMapping(value="/employees", method = RequestMethod.GET)
    EmployeePage findAll(@RequestParam(value = "next", required = false) String next) {
        return employeeService.getAllEmployees(next);
    }
 
    @RequestMapping(value = "/employee/{id}", method = RequestMethod.GET)
    Employee findById(@PathVariable("id") int id) {        
        return employeeService.getEmployee(id);
    }
 
    @RequestMapping(value = "/employee", method = RequestMethod.PUT)
    Employee update(@RequestBody Employee employee) {
        return employeeService.updateEmployee(employee);
    }
}