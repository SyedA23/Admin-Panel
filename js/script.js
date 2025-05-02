// Utility Functions
// function simpleHash(str) {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     const char = str.charCodeAt(i);
//     hash = (hash << 5) - hash + char;
//     hash |= 0;
//   }
//   return hash.toString();
// }

function getOrdinalSuffix(rank) {
  if (rank > 3 && rank < 21) return "th";
  switch (rank % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// User Management
function loadUsers() {
  try {
    let users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users:", error);
  }
}

function getLoggedInUser() {
  try {
    const loggedInUserString = localStorage.getItem("loggedInUser");
    return loggedInUserString ? JSON.parse(loggedInUserString) : null;
  } catch (error) {
    console.error("Error parsing loggedIn user:", error);
    return null;
  }
}

// Validation Functions
var nameErr = document.getElementById("name-err");
var emailErr = document.getElementById("email-err");
var passwordErr = document.getElementById("password-err");

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    emailErr.textContent = "Invalid Email ID";
    return false;
  }
  return true;
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    passwordErr.innerHTML =
      "Password Must Contains at least Uppercase, <br>Lowercase, Number(0-9) and a <br>special character";
    return false;
  }
  return true;
}

function validateFullName(fullName) {
  const fullNameRegex = /^[a-zA-Z\s'.-]{2,50}$/;
  if (!fullNameRegex.test(fullName)) {
    nameErr.textContent =
      "Name should not contain any special characters or numbers";
    return false;
  }
  return true;
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

// Auth Functions
function signup() {
  nameErr.textContent = "";
  passwordErr.textContent = "";
  emailErr.textContent = "";

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("emailId").value;
  const password = document.getElementById("password").value;
  const checkbox = document.getElementById("terms");

  if (!fullName || !email || !password) {
    if (!fullName) nameErr.textContent = "Name is required";
    if (!password) passwordErr.textContent = "Password is required";
    if (!email) emailErr.textContent = "Email is required";
    return;
  }

  if (
    !validateFullName(fullName) ||
    !validateEmail(email) ||
    !validatePassword(password)
  ) {
    return;
  }

  if (!checkbox.checked) {
    alert("You must accept the terms and conditions to sign up.");
    return;
  }

  const users = loadUsers();
  if (users.some((user) => user.email === email)) {
    emailErr.textContent = "Email already registered";
    return;
  }

  users.push({ fullName, email, password: password });
  saveUsers(users);
  alert("Sign Up Successful");
  window.location.href = "index.html";
}

function login() {
  const email = document.getElementById("emailId").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    passwordErr.textContent = password ? "" : "Password is required";
    emailErr.textContent = email ? "" : "Email is required";
    return;
  }

  if (!validateEmail(email) || !validatePassword(password)) {
    return;
  }

  const users = loadUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        email: user.email,
        fullName: user.fullName
      })
    );
    alert("Login Successful");
    window.location.href = "home.html";
  } else {
    alert("Invalid Email or Password");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

//  Admin Page Javascript

const adminBtn = document.getElementById('adminBtn');
const dropdown = document.getElementById('dropdown');

adminBtn.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
  if (!adminBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});