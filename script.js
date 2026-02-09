function updateClock() {
  document.getElementById("clock").innerText =
    new Date().toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

/* NOTES */
const DEFAULT_PIN = "1234";

function unlockNotes() {
  const pin = document.getElementById("pinInput").value;
  const savedPin = localStorage.getItem("notesPin") || DEFAULT_PIN;

  if (pin === savedPin) {
    document.getElementById("notesArea").style.display = "block";
  } else {
    alert("Wrong PIN");
  }
}

function saveNote() {
  const note = noteInput.value.trim();
  if (!note) return;

  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  noteInput.value = "";
  loadNotes();
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notesList.innerHTML = "";
  notes.forEach(n => {
    const li = document.createElement("li");
    li.innerText = n;
    notesList.appendChild(li);
  });
}

function clearNotes() {
  if (confirm("Delete all notes?")) {
    localStorage.removeItem("notes");
    loadNotes();
  }
}

/* ✅ AGE CALCULATOR – FIXED */
function calcAge() {
  const dobValue = document.getElementById("dob").value;
  if (!dobValue) {
    document.getElementById("ageResult").innerText = "Please select a date";
    return;
  }

  const dob = new Date(dobValue);
  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById("ageResult").innerText =
    `${years} Years, ${months} Months, ${days} Days`;
}

/* EMI 
function calcEMI() {
  const P = Number(loanAmt.value);
  const r = loanRate.value / 1200;
  const n = loanMonths.value;

  if (!P || !r || !n) return;

  const emi = P * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const interest = totalPayment - P;

  emiResult.innerText = `EMI: ₹${emi.toFixed(2)}`;

  drawPieChart(P, interest);
} */

function drawPieChart(principal, interest) {
  const canvas = document.getElementById("emiChart");
  const ctx = canvas.getContext("2d");
  const total = principal + interest;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const principalAngle = (principal / total) * 2 * Math.PI;

  // Principal
  ctx.beginPath();
  ctx.moveTo(125,125);
  ctx.arc(125,125,100,0,principalAngle);
  ctx.fillStyle = "#22c55e";
  ctx.fill();

  // Interest
  ctx.beginPath();
  ctx.moveTo(125,125);
  ctx.arc(125,125,100,principalAngle,2*Math.PI);
  ctx.fillStyle = "#ef4444";
  ctx.fill();
}

/* INTEREST */
function calcInterest() {
  const from = new Date(fromDate.value);
  const to = new Date(toDate.value);
  if (!from || !to) return;

  const days = (to - from) / (1000 * 3600 * 24);
  const interest =
    interestAmt.value * (interestRate.value / 100) * (days / 365);

  interestResult.innerText = `Interest: ₹${interest.toFixed(2)}`;
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

function calcEMI() {
  const P = parseFloat(document.getElementById("loanAmt").value);
  const annualRate = parseFloat(document.getElementById("loanRate").value);
  const months = parseInt(document.getElementById("loanMonths").value);

  if (!P || !annualRate || !months) {
    alert("Please enter all values");
    return;
  }

  const r = annualRate / 12 / 100;

  // EMI formula
  const emi =
    (P * r * Math.pow(1 + r, months)) /
    (Math.pow(1 + r, months) - 1);

  document.getElementById("emiResult").innerText =
    `Monthly EMI: ₹${emi.toFixed(2)}`;

  generateEmiBreakdown(P, r, months, emi);
}

function generateEmiBreakdown(principal, rate, months, emi) {
  let balance = principal;
  const tableBody = document.getElementById("emiTableBody");

  tableBody.innerHTML = ""; // clear old rows

  for (let month = 1; month <= months; month++) {
    const interest = balance * rate;
    const principalPaid = emi - interest;
    balance -= principalPaid;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${month}</td>
      <td>${emi.toFixed(2)}</td>
      <td>${principalPaid.toFixed(2)}</td>
      <td>${interest.toFixed(2)}</td>
      <td>${balance < 0 ? "0.00" : balance.toFixed(2)}</td>
    `;

    tableBody.appendChild(row);
  }
}