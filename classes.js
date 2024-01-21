class Actor{
  constructor(id, name){
    this.id = id;
    this.name = name;
    this.movies = [];
  }
}

class Movie{
  constructor(id, name, rating, votes, releaseDate){
    this.id = id;
    this.name = name;
    this.rating = rating;
    this.votes = votes;
    this.releaseDate = releaseDate;
    this.actors = [];
  }
}

class User{
  constructor(password){
    this.password = password;
    this.favoriteMovies = [];
    this.favoriteActors = [];
  }

  hasActor(id){ //O(nlogn)
    MergeSort2(this.favoriteActors);
    return BinarySearch(id, this.favoriteActors);
  }

  hasFilm(id){ //O(nlogn)
    MergeSort2(this.favoriteMovies);
    return BinarySearch(id, this.favoriteMovies);
  }
}