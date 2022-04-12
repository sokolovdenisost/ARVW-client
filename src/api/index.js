import { showNotification } from "../utils/notifications";

export const api = async ({ path = "", method = "GET", body, setIsLoading, navigateToSuccess }) => {
  setIsLoading(true);

  try {
    const token = localStorage.getItem("token");

    if (method === "GET") {
      const response = await fetch(`http://localhost:5000/api/${path}`, {
        method: method,
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      setIsLoading(false);

      return result;
    }

    if (method === "POST") {
      const response = await fetch(`http://localhost:5000/api/${path}`, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.status >= 400 && result.status < 500) {
        showNotification("Error", result.message);
      }

      if (result.status >= 200 && result.status < 300) {
        showNotification("Success", result.message);

        if (navigateToSuccess) {
          navigateToSuccess();
        }
      }

      setIsLoading(false);

      return result;
    }
  } catch (err) {
    console.log("ERR: ", err);
    showNotification("Error", "Bad request");
    setIsLoading(false);
  }
};
