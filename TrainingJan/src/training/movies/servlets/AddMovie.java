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

/**
 * Servlet implementation class AddMovie
 */
public class AddMovie extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("--------------Trace - AddMovie.doPost()--------------");
        System.out.println(request.getContentType());
        String userRelYear = request.getParameter("uRelYear");
        String userRating = request.getParameter("uRating");
		String userTitle = request.getParameter("uTitle");
		String userDescription = request.getParameter("uDesc");
		String userLanguage = request.getParameter("uLang");
		String userSpecialFeature = request.getParameter("uSpec");
		System.out.println("Data recieved " + " uRating " + userRating + " uRelYear " + userRelYear +  " utitle " + userTitle + " userDescription "+ userDescription + " userLanguage " + userLanguage + " userSpecialFeature " + userSpecialFeature);
		
		DatabaseConnector databaseConnector=new DatabaseConnector();
        Connection  connection =null;
        String sql = "INSERT into film (title,description,language_id,special_features,rating,release_year) values (?,?,?,?,?,?)";
        PreparedStatement statement = null;
        
        try {
        	
        	connection=databaseConnector.connectdb();
        	connection.setAutoCommit(false);
			statement = connection.prepareStatement(sql);
			
				if (userTitle == null || userTitle=="" ) {
					statement.setNull(1, java.sql.Types.NULL);
				}else {
					statement.setString(1, userTitle);	
				}
				if (userDescription==null || userDescription=="") {
					statement.setNull(2, java.sql.Types.NULL);
				}else {
					statement.setString(2, userDescription);
				}
				if (userLanguage==null || userLanguage=="") {
					statement.setNull(3, java.sql.Types.NULL);
				}else {
					statement.setString(3, userLanguage);
				}
				if (userSpecialFeature == null || userSpecialFeature=="") {
					statement.setNull(4, java.sql.Types.NULL);
				}else {
					statement.setString(4, userSpecialFeature);
				}
				if (userRating == null || userRating == "") {
					statement.setNull(5, java.sql.Types.NULL);
				}else {
					statement.setString(5, userRating);
				}
				if (userRelYear == null || userRelYear == "") {
					statement.setNull(6, java.sql.Types.NULL);
				}else {
					statement.setString(6, userRelYear);
				}
				
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

