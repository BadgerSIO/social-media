import React from "react";
import Titles from "../../utilities/Titles";
import AddPost from "./AddPost/AddPost";
import TopPosts from "./TopPosts/TopPosts";

const Home = () => {
  return (
    <header>
      <Titles>Home</Titles>
      <AddPost></AddPost>
      <TopPosts></TopPosts>
    </header>
  );
};

export default Home;
