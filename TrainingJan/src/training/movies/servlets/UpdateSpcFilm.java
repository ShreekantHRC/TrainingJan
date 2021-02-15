package training.movies.servlets;

import java.io.Console;
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
 * Servlet implementation class UpdateSpcFilm
 */

class FilmSpecific{
	String userDescription;
	String userLanguage;
	String userSpecialFeature;
	String userFilmId;
}

public class UpdateSpcFilm extends HttpServlet {
	private static final long serialVersionUID = 1L;

//	/**
//	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
//	}
//
//	/**
//	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		doGet(request, response);
//	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println(request.getContentType());
		//String userTitle = request.getParameter("uTitle");
		String userDescription = request.getParameter("uDesc");
		String userLanguage = request.getParameter("uLang");
		String userSpecialFeature = request.getParameter("uSpec");
		String userFilmId = request.getParameter("uFilmId");
		System.out.println("Data recieved " + " film_id " + userFilmId  + " userDescription "+ userDescription + " userLanguage " + userLanguage + " userSpecialFeature " + userSpecialFeature);
		
		DatabaseConnector databaseConnector=new DatabaseConnector();
        Connection  connection =null;
        String sql = "Update film set description = ?, language_id = ?, special_features = ? where film_id = ?";
        PreparedStatement statement = null;
        
        try {
        	
        	connection=databaseConnector.connectdb();
        	connection.setAutoCommit(false);
			statement = connection.prepareStatement(sql);
			
				//statement.setString(1, userTitle);
				statement.setString(1, userDescription);
				statement.setString(2, userLanguage);
				statement.setString(3, userSpecialFeature);
				statement.setString(4, userFilmId);
				
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
