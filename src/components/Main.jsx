import React, { useEffect, useState } from "react";
import axios from "axios";
import './main.css'

const Navbar = ({ search, setSearch }) => {
  return (
    <nav className="navbar">
      <h2 className="head">Comments Viewer</h2>
      <input
        type="text"
        placeholder="Search byyour email or name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  );
};

const Main = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  //HERE WE  ARE GETTING THE DATA RELATED TO COMMENTS using FETCH API CALL
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/comments");
      setComments(res.data);
    };
    fetchComments();
  }, []);

  // Fetch posts and map postId to title
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const postsMap = {};
      res.data.forEach((post) => {
        postsMap[post.id] = post.title;
      });
      setPosts(postsMap);
    };
    fetchPosts();
  }, []);

  // Filtered comments by search input from the user enteres value
  const filteredComments = comments.filter((comment) =>
    comment.name.toLowerCase().includes(search.toLowerCase()) ||
    comment.email.toLowerCase().includes(search.toLowerCase())
  );


  const indexOfLast = currentPage * commentsPerPage;
  const indexOfFirst = indexOfLast - commentsPerPage;
  const currentComments = filteredComments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  return (
      <div className="Main">
          <h4 className="main-head">FreJun Frontend Developer Internship Assignment</h4>
      <Navbar search={search} setSearch={setSearch} />
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Body</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {currentComments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.email}</td>
              <td>{comment.name}</td>
              <td>{comment.body}</td>
              <td>{posts[comment.postId] || "Loading..."}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Main;
