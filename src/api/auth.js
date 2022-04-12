import { showNotification } from "../utils/notifications";

export const apiAuth = async ({ path = "", method = "GET", body, navigateToSuccess, setIsLoading }) => {
  try {
    const response = await fetch(`http://localhost:5000/auth/${path}`, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    const result = await response.json();

    if (result.status >= 400 && result.status < 500) {
      showNotification("Error", result.message);
    }

    if (result.status >= 200 && result.status < 300) {
      showNotification("Success", result.message);

      if (result?.token) {
        localStorage.setItem("token", result?.token);
        window.location.reload();
      }

      if (navigateToSuccess) {
        navigateToSuccess();
      }
    }

    setIsLoading(false);
  } catch (err) {
    showNotification("Error", "Bad request");
    setIsLoading(false);
  }
};
