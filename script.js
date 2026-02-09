function updateClock() {
  document.getElementById("clock").innerText =
    new Date().toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

/* NOTES */
function saveNote() {
  const note = document.getElementById("noteInput").value.trim();
  if (!note) return;

  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  document.getElementById("noteInput").value = "";
  loadNotes();
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  const list = document.getElementById("notesList");
  list.innerHTML = "";
  notes.forEach(n => {
    const li = document.createElement("li");
    li.innerText = n;
    list.appendChild(li);
  });
}
loadNotes();

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

/* EMI */
function calcEMI() {
  const P = loanAmt.value;
  const r = loanRate.value / 1200;
  const n = loanMonths.value;

  if (!P || !r || !n) return;

  const emi = P * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  emiResult.innerText = `EMI: ₹${emi.toFixed(2)}`;
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