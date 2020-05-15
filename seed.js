const mongoose = require("mongoose");
const config = require("config");
const { Product } = require("./models/product");

async function seed() {
    await mongoose.connect(config.get("db"));
  
    await Product.deleteMany({});
    
    for (let genre of data) {
      const { _id: genreId } = await new Genre({ name: genre.name }).save();
      const movies = genre.movies.map(movie => ({
        ...movie,
        genre: { _id: genreId, name: genre.name }
      }));
      await Movie.insertMany(movies);
    }
  
    mongoose.disconnect();
  
    console.info("Done!");
  }
  
  seed();
  