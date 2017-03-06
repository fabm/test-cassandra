package pt.test.cassandra;

import java.util.List;

public class EmployeePage {
	private String nextPageToken;
	private List<Employee> employees;
	public String getNextPageToken() {
		return nextPageToken;
	}
	public void setNextPageToken(String nextPageToken) {
		this.nextPageToken = nextPageToken;
	}
	public List<Employee> getEmployees() {
		return employees;
	}
	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}
	

	
}
