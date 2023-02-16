import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const result = await axios(
          "https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed"
        );
        setPosts(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <img src={post.featured_image_url} alt={post.title.rendered} />
          <h3>{post.title.rendered}</h3>
          <p>{post.excerpt.rendered}</p>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

const RelatedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const result = await axios(
          "https://techcrunch.com/wp-json/wp/v2/posts?per_page=3&context=embed"
        );
        setPosts(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="related-posts">
      {posts.map((post) => (
        <div key={post.id} className="related-post-card">
          <img src={post.featured_image_url} alt={post.title.rendered} />
          <h4>{post.title.rendered}</h4>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>TechCrunch</h1>
    </nav>
  );
};

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <PostList />
      <div className="related-posts-header">
        <h2>Related Posts</h2>
        <p>Check out these articles too:</p>
      </div>
      <RelatedPosts />
      <footer>
        <p>© 2023 TechCrunch Latest Posts. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
