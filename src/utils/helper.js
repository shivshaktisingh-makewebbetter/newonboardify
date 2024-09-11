import { jwtDecode } from "jwt-decode";

export function isTokenValid(token) {
  if (!token) return { valid: false, error: "Token is empty" };

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      return { valid: false, error: "Token is expired" };
    }

    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, error: "Invalid token" };
  }
}

export const roleData = {
  0: "User",
  1: "super Admin",
  2: "Admin",
};

export function extractDateTime(datetimeStr) {
  const date = new Date(datetimeStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} ${formattedTime}`;
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `Created at ${month} ${day}, ${year}`;
}

export function formatDateNew(inputDate) {
  const date = new Date(inputDate);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export const fetcher = async (endpoint, method, payload = null) => {
  const token = getToken();
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `bearer ${token}`);
  let url = `https://onboardifyapi.tasc360.com/${endpoint}`;
  let requestOptions = {
    method,
    headers: myHeaders,
  };
  if (payload) {
    requestOptions.body = payload;
  }

  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data;
};

export const getRole = () => {
  let role = sessionStorage.getItem("role");
  return role;
};

export const getToken = () => {
  let token = sessionStorage.getItem("token");

  return token;
};

export function getDateAndTime(time) {
  let date = new Date(time);
  let day = date.getDate();
  let month = date.toLocaleString("default", { month: "long" });
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  let newDate = `${day} ${month.slice(0, 3)} ${year} at ${hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return newDate;
}

export function getFirstLettersOfName(value, message) {
  let name = value.split(" ");
  let msg = message.split(":");
  let firstLetters = "";
  name.forEach((item) => {
    firstLetters += item[0].toUpperCase();
  });
  if (
    msg[0].includes("From") &&
    msg[0].includes(localStorage.getItem("userEmail"))
  ) {
  } else if (msg[0].includes("From")) {
    let newFirstLetter = msg[0].split(" ")[1][0].toUpperCase();
    firstLetters = newFirstLetter;
  }

  return firstLetters;
}

export function extractUsernameFromMessage(value) {
  let message = "";
  let newValue = value.split(":");
  if (newValue[0].includes("From")) {
    newValue.forEach((msg, i) => {
      if (i !== 0) {
        message += msg.replace("https", "https:");
      }
    });
  } else {
    message = value;
  }

  return message;
}

export function showUserName(value, userEmailData) {
  let userName = "";
  if (value.includes(localStorage.getItem("userEmail"))) {
    userName = localStorage.getItem("userName");
  } else if (value.split(":")[0].includes("From")) {
    let email = userEmailData.filter(
      (item) => item.email === value.split(":")[0].split(" ")[1]
    );
    if (email.length) {
      userName = userEmailData.filter(
        (item) => item.email === value.split(":")[0].split(" ")[1]
      )[0].username;
    } else {
      userName = "Onboardify Team";  
    }
  } else {
    userName = "Onboardify Team";
  }

  return userName;
}

export function appendEmoji(value, emoji) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(value, "text/html");

  // Find all <p> tags
  const pTags = doc.querySelectorAll("p");

  // Append emoji to the last <p> tag
  if (pTags.length > 0) {
    let lastPTag = pTags[pTags.length - 1];
    if (lastPTag.innerHTML.trim() === "<br>") lastPTag.innerHTML = "";
    lastPTag.append(emoji);
  }

  // Convert the modified document back to a string
  const modifiedHtmlString = doc.body.innerHTML;
  return value === "" ? emoji : modifiedHtmlString;
}

export function formatDateNewFormat(inputDate) {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
