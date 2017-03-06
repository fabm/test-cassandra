package pt.test.cassandra;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.convert.CassandraConverter;
import org.springframework.data.cassandra.core.CassandraOperations;
import org.springframework.stereotype.Repository;

import com.datastax.driver.core.PagingState;
import com.datastax.driver.core.ResultSet;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.querybuilder.QueryBuilder;
import com.datastax.driver.core.querybuilder.Select;

@Repository
public class EmployeeDAOImpl implements EmployeeDAO{

	private int FETCH_SIZE = 2;
	
	@Autowired
    private CassandraOperations cassandraOperations;
	
	@Override
	public Employee createEmployee(Employee employee) {
		return cassandraOperations.insert(employee);
	}

	@Override
	public Employee getEmployee(int id) {
		return cassandraOperations.selectOneById(Employee.class, id);
	}

	@Override
	public Employee updateEmployee(Employee employee) {
		return cassandraOperations.update(employee);
	}

	@Override
	public void deleteEmployee(int id) {
		cassandraOperations.deleteById(Employee.class, id);
	}

	@Override
	public EmployeePage getAllEmployees(String page) {
		
		Select select = QueryBuilder.select().all().from("employee");
		select.setFetchSize(FETCH_SIZE);
		
		if(page != null){
			select.setPagingState(PagingState.fromString(page));
		}
		
		CassandraConverter converter = cassandraOperations.getConverter();
		ResultSet resultSet = cassandraOperations.getSession().execute(select);
		PagingState newPagingState = resultSet.getExecutionInfo().getPagingState();
		int remain = resultSet.getAvailableWithoutFetching();
		
		List<Employee> employees = new ArrayList<>();
		for(Row row:resultSet){
			employees.add(converter.read(Employee.class, row));
			if(--remain == 0){
				break;
			}
		}
		
		//Serialise the next paging state
        String nextPageToken = newPagingState != null ?
		newPagingState.toString() :
		null;

		EmployeePage emplyeePage = new EmployeePage();
		
        emplyeePage.setEmployees(employees);
        emplyeePage.setNextPageToken(nextPageToken);
        
        return emplyeePage;
	}

}
