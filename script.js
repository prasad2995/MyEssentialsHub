function updateClock() {
  document.getElementById('clock').innerText =
    new Date().toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

/* Notes */
function saveNote() {
  const note = noteInput.value.trim();
  if (!note) return;

  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
  noteInput.value = '';
  loadNotes();
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  notesList.innerHTML = '';
  notes.forEach(n => {
    const li = document.createElement('li');
    li.innerText = n;
    notesList.appendChild(li);
  });
}
loadNotes();

/* Calculators */
function calcAge() {
  const dob = new Date(dob.value);
  const age = new Date().getFullYear() - dob.getFullYear();
  ageResult.innerText = `${age} years`;
}

function calcEMI() {
  const P = loanAmt.value;
  const r = loanRate.value / 1200;
  const n = loanMonths.value;
  const emi = P * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  emiResult.innerText = `EMI: ₹${emi.toFixed(2)}`;
}

function calcInterest() {
  const from = new Date(fromDate.value);
  const to = new Date(toDate.value);
  const days = (to - from) / (1000 * 3600 * 24);
  const interest = interestAmt.value * (interestRate.value / 100) * (days / 365);
  interestResult.innerText = `Interest: ₹${interest.toFixed(2)}`;
}
