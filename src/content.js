function isLoginPage() {
  try {
    return document.querySelector('button:contains("Login")') !== null;
  } catch (error) {
    console.error("Invalid selector:", error);
    return false;
  }
}

// Example usage
if (isLoginPage()) {
  console.log("Login page detected");
}
