package training.movies.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import training.movies.connection.DatabaseConnector;

public class DeleteMovie extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("--------------Trace - DeleteMovie.doGet()--------------");
		System.out.println(request.getContentType());
		String userFilmId = request.getParameter("uFilmId");
		System.out.println("Data recieved " + " userFilmId "+ userFilmId );
		
		DatabaseConnector databaseConnector=new DatabaseConnector();
        Connection  connection =null;
        String sql = "Delete from film where film_id = ?";
        PreparedStatement statement = null;
        
        try {
        	
        	connection=databaseConnector.connectdb();
        	connection.setAutoCommit(false);
			statement = connection.prepareStatement(sql);
			
				statement.setString(1, userFilmId);
				
				int status = statement.executeUpdate();
				System.out.println(statement);
				
			System.out.println("Query status " + status);
			if(status>0) {
				response.sendRedirect("dataFetch");
			}
			databaseConnector.commitdb(connection);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		finally {
			if(connection !=null) {
				try {
					databaseConnector.disconnectdb(connection);
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(statement != null) {
				try {
					statement.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}


}
