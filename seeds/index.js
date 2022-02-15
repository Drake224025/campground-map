const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const randDescriptor = (array) =>
  array[Math.floor(Math.random() * array.length)];

const randNumber = (number, min) => Math.floor(Math.random() * number + 1);

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let index = 0; index < 50; index++) {
    const element = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      title: `${randDescriptor(descriptors)} ${randDescriptor(places)}`,
      location: `${cities[element].city}, ${cities[element].state}`,
      image: `../images/stockimg${randNumber(16)}.jpg`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae esse tempora distinctio aliquid libero rem harum itaque amet rerum doloribus dignissimos adipisci omnis obcaecati qui voluptatibus, alias molestias blanditiis facilis!",
      price: randNumber(20) + 9,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
