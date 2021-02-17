package training.movies.connection;

import java.sql.Date;
import java.text.SimpleDateFormat;

public class MoviesPOJO {

	private Integer filmId;
    private String title;
    private String description;
    private String releaseYear;
    private String language;
    private String genre;
    private String rating;
    private String specialFeature;
    
	public Integer getFilmId() {
		return filmId;
	}
	public void setFilmId(Integer filmId) {
		if (filmId != null) {
			this.filmId = filmId;
		}
		else {
			this.filmId = 0;
		}
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		if (title != null) {
			this.title = title;
		}
		else {
			this.title = "Title Not Available";
		};
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		if (description != null) {
			this.description = description;
		}
		else {
			this.description = "Description Not Available";
		}
	}
	public String getReleaseYear() {
		return releaseYear;
	}
	public void setReleaseYear(Date releaseYear) {
		if (releaseYear != null) {
			SimpleDateFormat simpleDateFormat= new SimpleDateFormat("yyyy");
			this.releaseYear=simpleDateFormat.format(releaseYear);
		}
		else {
			this.releaseYear="Date Not Available";
		}
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		if (language != null) {
			this.language = language;
		}else {
			this.language = "Language Not Available";
		}
	}

	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		if (genre != null) {
			this.genre=genre;
		}else {
			this.genre="Genre data not available";
		}
	}
	
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		if (rating != null) {
			this.rating = rating;
		}else {
			this.rating = "Not rated";
		}
	}
	public String getSpecialFeature() {
		return specialFeature;
	}
	public void setSpecialFeature(String specialFeature) {
		if (specialFeature != null) {
			this.specialFeature = specialFeature;
		}else {
			this.specialFeature = "No bonus content";
		}
	}
	
    @Override
    public String toString() {
    	
		return "MoviePOJO [filmId = " +filmId +" title = " + title + " description = " + description + " releaseYear = " + releaseYear +
				" language = " + language + " genre = " + genre + " rating = " + rating + " specialFeature = " + specialFeature +" ]";
    	
    }
}