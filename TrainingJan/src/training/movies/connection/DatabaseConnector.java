package training.movies.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnector {
	
	public Connection connectdb() throws SQLException, ClassNotFoundException {
		String jdbcURL = "jdbc:mysql://localhost:3306/sakila";
        String username = "root";
        String password = "root";
		Connection connection = null;
		
		System.out.println("Setting up connection ...");
		Class.forName("com.mysql.cj.jdbc.Driver");
		
		connection = DriverManager.getConnection(jdbcURL, username, password);
        System.out.println("Successfully connected to the database");
        
        return connection;
	}
	
	
	public void commitdb(Connection connection) throws SQLException {
		
		connection.commit();
		System.out.println("Database successfully committed");
	}
	//method to disconnect database
	public void disconnectdb(Connection connection) throws SQLException {
		
		connection.close();
		System.out.println("Database connection successfully terminated");
	}
}
