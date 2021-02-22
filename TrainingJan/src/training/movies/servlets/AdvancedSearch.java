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

class SearchParams{
	public SearchParams() {
		setGenre("");
		setLanguage("");
		setMovieName("");
		setReleaseYear("");
	}
	
	private String movieName;
	private String releaseYear;
	private String genre;
	private String language;
	
	
	public String getMovieName() {
		return movieName;
	}
	public void setMovieName(String movieName) {
		if (movieName != null) {
			this.movieName = movieName;
		}
		else {
			this.movieName = "";
		}
	}
	public String getReleaseYear() {
		return releaseYear;
	}
	public void setReleaseYear(String releaseYear) {
		if (releaseYear != null) {
			this.releaseYear = releaseYear;
		}
		else {
			this.releaseYear = "";
		}
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		if (genre != null) {
			this.genre = genre;
		}else {
			this.genre = "";
		}
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		if (language != null) {
			this.language = language;
		}
		else {
			this.language = "";
		}
	}
	@Override
	public String toString() {
		return "SearchParams [movieName=" + movieName + ", releaseYear=" + releaseYear + ", genre=" + genre
				+ ", language=" + language + "]";
	}

}

public class AdvancedSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
		
		System.out.println("-----------------------------Track - AdvancedSearch.doGet()---------------------------");
		
		System.out.println("start "+ start +" limit "+ limit+ " page "+ page);
		System.out.println(" advSearchReleaseYear " + request.getParameter("advSearchReleaseYear")+
				" advSearchMovieName " + request.getParameter("advSearchMovieName")+
				" advSearchDirectorName " + request.getParameter("advSearchDirectorName")+
				" advSearchLanguageName " + request.getParameter("advSearchLanguageName"));
		
		
		SearchParams checkObj=new SearchParams();
		String yearRetrieve=request.getParameter("advSearchReleaseYear");
		yearRetrieve=yearRetrieve.substring(0, 4);
		checkObj.setReleaseYear(yearRetrieve);
		checkObj.setMovieName(request.getParameter("advSearchMovieName"));
		checkObj.setGenre(request.getParameter("advSearchDirectorName"));
		checkObj.setLanguage(request.getParameter("advSearchLanguageName"));
		
		checkObj.toString();
		
		DatabaseConnector databaseConnector=new DatabaseConnector();
        Connection  connection =null;
        PrintWriter out = response.getWriter();
        String sql;
        
    	sql = "SELECT film.film_id as filmId, title, cat.name AS genre, description, release_year AS releaseYear, lang.name AS lang, rating, special_features AS specialFeatures FROM film\r\n" + 
        		"LEFT JOIN (SELECT `name`,language_id FROM `language`) AS lang ON film.language_id = lang.language_id \r\n" + 
        		"LEFT JOIN (SELECT film_id, category_id FROM film_category) AS fc ON film.film_id = fc.film_id\r\n" + 
        		"LEFT JOIN (SELECT category_id, `name` FROM category) AS cat ON fc.category_id=cat.category_id \r\n" + "where lang.language_id Like ? AND cat.name Like ? AND title Like ? AND release_year Like ? Order by film.film_id "+ "limit "+start+", "+limit ;
    	
        ResultSet rs = null;
        PreparedStatement statement = null;
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonObject jsonObject = new JsonObject();
        JsonArray jarray= new JsonArray();
        
        try {

        	connection=databaseConnector.connectdb();
			statement = connection.prepareStatement(sql);
			
			statement.setString(1, "%"+checkObj.getLanguage()+"%");
			statement.setString(2, "%"+checkObj.getGenre()+"%");
			statement.setString(3, "%"+checkObj.getMovieName()+"%");
			statement.setString(4, "%"+checkObj.getReleaseYear()+"%");
			
			System.out.println(statement);
			
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
            
            
            jarray = gson.toJsonTree(invoiceArray).getAsJsonArray();
            jsonObject.add("movies", jarray);
            
            //String invoices= gson.toJson(invoiceArray);
            System.out.println("Succesfully Loaded " + count);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
        
        //total property check
        
        sql= "SELECT count(1) FROM film\r\n" + 
        		"LEFT JOIN (SELECT `name`,language_id FROM `language`) AS lang ON film.language_id = lang.language_id \r\n" + 
        		"LEFT JOIN (SELECT film_id, category_id FROM film_category) AS fc ON film.film_id = fc.film_id\r\n" + 
        		"LEFT JOIN (SELECT category_id, `name` FROM category) AS cat ON fc.category_id=cat.category_id \r\n" + "where lang.language_id Like ? AND cat.name Like ? AND title Like ? AND release_year Like ? Order by film.film_id ";
        
        try {
			connection=databaseConnector.connectdb();
			statement = connection.prepareStatement(sql);
			

			statement.setString(1, "%"+checkObj.getLanguage()+"%");
			statement.setString(2, "%"+checkObj.getGenre()+"%");
			statement.setString(3, "%"+checkObj.getMovieName()+"%");
			statement.setString(4, "%"+checkObj.getReleaseYear()+"%");
			
			rs = statement.executeQuery();
			int totalCount=0;
			while(rs.next()) {
				totalCount=rs.getInt(1);
			}
			jsonObject.addProperty("total", totalCount);
			
			response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(jsonObject.toString());
            out.flush();
		}
		 catch (Exception e) {
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
