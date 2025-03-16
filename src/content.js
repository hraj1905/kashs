function isLoginPage() {
  try {
    const button = document.querySelector('button');
    return button && button.innerText.includes("Login");
  } catch (error) {
    console.error("Error checking login page:", error);
    return false;
  }
}

// Example usage
if (isLoginPage()) {
  console.log("Login page detected");
}
