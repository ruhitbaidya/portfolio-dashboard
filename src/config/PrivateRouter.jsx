import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tokens = localStorage.getItem("token");

    if (tokens) {
      setLoading(false);
    } else {
      setLoading(false);
      navigate("/");
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return children || null;
};

export default PrivateRouter;
