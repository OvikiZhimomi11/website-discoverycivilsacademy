// Elements
const examSelect = document.getElementById("examSelect");
const subjectContainer = document.getElementById("subjectContainer");
const subjectSelect = document.getElementById("subjectSelect");

// Subjects for each exam
const examSubjects = {
  NPSC: ["General Studies", "Objective Types", "Descriptive Form"],
  NSSB: ["General Knowledge", "English", "Mathematics", "Reasoning"]
};

// Show subjects when exam changes
examSelect.addEventListener("change", function () {
  const selectedExam = this.value;
  subjectSelect.innerHTML = ""; // Clear old subjects

  if (selectedExam && examSubjects[selectedExam]) {
    examSubjects[selectedExam].forEach(subject => {
      const option = document.createElement("option");
      option.value = subject;
      option.textContent = subject;
      subjectSelect.appendChild(option);
    });
    subjectContainer.style.display = "block";
  } else {
    subjectContainer.style.display = "none";
  }
});

// Handle form submission
document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const contact = e.target.contact.value;
  const exam = examSelect.value;
  const subject = subjectSelect.value;

  // Save student details into localStorage
  localStorage.setItem("student", JSON.stringify({ name, email, contact, exam, subject }));

  // Redirect to payment page
  alert("Proceeding to payment...");
  window.location.href = "payment.html";
});
