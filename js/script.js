function signup() {
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("emailId").value.trim();
  const password = document.getElementById("password").value;

  const nameErr = document.getElementById("name-err");
  const emailErr = document.getElementById("email-err");
  const passwordErr = document.getElementById("password-err");

  // Reset errors
  nameErr.textContent = "";
  emailErr.textContent = "";
  passwordErr.textContent = "";

  let hasError = false;

  // Basic validation
  if (!name) {
    nameErr.textContent = "Name is required";
    hasError = true;
  }

  if (!email || !email.includes("@")) {
    emailErr.textContent = "Valid email is required";
    hasError = true;
  }

  if (!password || password.length < 6) {
    passwordErr.textContent = "Password must be at least 6 characters";
    hasError = true;
  }

  if (hasError) return;

  // Check if admin already exists
  if (localStorage.getItem("admin")) {
    alert("Admin already registered. Please log in.");
    window.location.href = "index.html"; // Change to your login page if different
    return;
  }

  // Save admin to localStorage
  const admin = { name, email, password };
  localStorage.setItem("admin", JSON.stringify(admin));
  alert("Signup successful! Please login.");
  window.location.href = "index.html"; // Redirect to login page
}

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}

function login() {
  const email = document.getElementById("emailId").value.trim();
  const password = document.getElementById("password").value;

  const emailErr = document.getElementById("email-err");
  const passwordErr = document.getElementById("password-err");

  // Clear previous error messages
  emailErr.textContent = "";
  passwordErr.textContent = "";

  let hasError = false;

  if (!email || !email.includes("@")) {
    emailErr.textContent = "Please enter a valid email.";
    hasError = true;
  }

  if (!password) {
    passwordErr.textContent = "Password is required.";
    hasError = true;
  }

  if (hasError) return;

  const storedAdmin = JSON.parse(localStorage.getItem("admin"));

  if (!storedAdmin) {
    alert("No admin found. Please sign up first.");
    window.location.href = "signup.html";
    return;
  }

  if (email === storedAdmin.email && password === storedAdmin.password) {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ type: "admin", name: storedAdmin.name })
    );
    alert("Login successful!");
    window.location.href = "admin.html"; // 🔁 Change this to your actual dashboard page
  } else {
    alert("Invalid email or password.");
  }
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

//  Admin Page Javascript

const adminBtn = document.getElementById("adminBtn");
const dropdown = document.getElementById("dropdown");

adminBtn.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
  if (!adminBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});
