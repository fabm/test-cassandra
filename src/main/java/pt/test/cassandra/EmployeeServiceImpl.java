package pt.test.cassandra;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired  
    private EmployeeDAO employeeDAO;

    /**
     * Default Constructor
     */
    public EmployeeServiceImpl() {
        super();    
    }

    @Override   
    public Employee createEmployee(Employee employee) {     
        return employeeDAO.createEmployee(employee);
    }

    @Override   
    public Employee getEmployee(int id) {       
        return employeeDAO.getEmployee(id);
    }

    @Override   
    public Employee updateEmployee(Employee employee) {     
        return employeeDAO.updateEmployee(employee);
    }

    @Override   
    public void deleteEmployee(int id) {        
        employeeDAO.deleteEmployee(id);
    }

    @Override   
    public EmployeePage getAllEmployees(String page) {       
        return employeeDAO.getAllEmployees(page);
    }

}
