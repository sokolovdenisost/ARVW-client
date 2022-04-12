import { useEffect, useState } from "react";
import { showNotification } from "../utils/notifications";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/auth/", {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status >= 400 && res.status < 500) {
            showNotification("Error", res.message);
          }

          if (res.status >= 200 && res.status < 300) {
            setUser(res.user);
            localStorage.setItem("userID", res.user.id);
          }

          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error", "Bad request");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return { isLoading, user };
};
