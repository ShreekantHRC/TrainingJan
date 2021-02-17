package training.movies.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import training.movies.connection.DatabaseConnector;
import training.movies.connection.MoviesPOJO;

public class DataFetch extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public DataFetch() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		int page, start, limit;
		if (request.getParameter("page") != null) {
			page=Integer.parseInt(request.getParameter("page"));	
		}else {
			page=1;
		}
		if (request.getParameter("start") != null) {
			start=Integer.parseInt(request.getParameter("start"));
		}else {
			start=0;
		}
		if (request.getParameter("limit") != null) {
			limit = Integer.parseInt(request.getParameter("limit"));
		}
		else {
			limit=300;
		}
		
		if(page>0) {
			page=page*limit;
		}
		
		System.out.println("start "+ start +" limit "+ limit+ " page "+ page);
		
		DatabaseConnector databaseConnector=new DatabaseConnector();
        Connection  connection =null;
        PrintWriter out = response.getWriter();
        String sql = "SELECT film.film_id as filmId, title, cat.name AS genre, description, release_year AS releaseYear, lang.name AS lang, rating, special_features AS specialFeatures FROM film\r\n" + 
        		"INNER JOIN (SELECT `name`,language_id FROM `language`) AS lang ON film.language_id = lang.language_id \r\n" + 
        		"INNER JOIN (SELECT film_id, category_id FROM film_category) AS fc ON film.film_id = fc.film_id\r\n" + 
        		"INNER JOIN (SELECT category_id, `name` FROM category) AS cat ON fc.category_id=cat.category_id \r\n" + "Order by film_id " 
        		+ "limit "+start+", "+page;
        ResultSet rs = null;
        PreparedStatement statement = null;
        
        try {

        	connection=databaseConnector.connectdb();
			statement = connection.prepareStatement(sql);
			
			rs = statement.executeQuery();
			
            ArrayList<MoviesPOJO> invoiceArray = new ArrayList<MoviesPOJO>();
            Integer count=0;
            while(rs.next()) {
            	count++;
            	MoviesPOJO pojoObj = new MoviesPOJO();
            	
				pojoObj.setFilmId(rs.getInt("filmId"));
				pojoObj.setTitle(rs.getString("title"));
            	pojoObj.setDescription(rs.getString("description"));
            	pojoObj.setReleaseYear(rs.getDate("releaseYear"));
            	pojoObj.setLanguage(rs.getString("lang"));
            	pojoObj.setGenre(rs.getString("genre"));
            	pojoObj.setRating(rs.getString("rating"));
            	pojoObj.setSpecialFeature(rs.getString("specialFeatures"));
            	
                invoiceArray.add(pojoObj);
            }
            
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            JsonArray jarray = gson.toJsonTree(invoiceArray).getAsJsonArray();
            JsonObject jsonObject = new JsonObject();
            
            jsonObject.addProperty("total", 300);
            jsonObject.add("movies", jarray);
            
            //String invoices= gson.toJson(invoiceArray);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(jsonObject.toString());
            out.flush();
            System.out.println("Succesfully Loaded " + count);
            
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
			if(rs!=null) {
				try {
					rs.close();
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
