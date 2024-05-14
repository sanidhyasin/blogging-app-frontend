import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

interface Author {
  name: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      });
  });
  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      });
  });
  return {
    loading,
    blogs,
  };
};

export const useAuthor = () => {
  // const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState<Author>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/userinfo`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setAuthor(response.data.author);
        // setLoading(false);
      });
  });
  return {
    // loading,
    author,
  };
};
