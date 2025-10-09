// 1️⃣ Student Data
const students = {
    student1: { name: "Alice", marks: { math: 85, science: 90, english: 78 } },
    student2: { name: "Bob", marks: { math: 75, science: 80, english: 88 } },
    student3: { name: "Charlie", marks: { math: 95, science: 89, english: 92 } }
};

// 2️⃣ Function to simulate async delay
function randomDelay(min = 500, max = 1500) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
}

// 3️⃣ Async function to process single student
async function processStudent(student) {
    await randomDelay(); // simulate DB delay

    // Calculate average marks
    const marksArray = Object.values(student.marks);
    const total = marksArray.reduce((sum, mark) => sum + mark, 0);
    const average = total / marksArray.length;

    return { name: student.name, average: average.toFixed(2) };
}

// 4️⃣ Async function to process all students sequentially
async function processAllStudents() {
    const results = [];

    // for…in loop to iterate over students object
    for (const key in students) {
        const student = students[key];
        const result = await processStudent(student);
        results.push(result);
    }

    // for…of loop to display results
    console.log("✅ All students processed:\n");
    for (const res of results) {
        console.log(`Name: ${res.name}, Average Marks: ${res.average}`);
    }

    // Optional: Update HTML
    updateHTML(results);
}

// 5️⃣ Function to update HTML dynamically
function updateHTML(results) {
    const container = document.getElementById("studentRecords");
    container.innerHTML = ""; // Clear previous content

    results.forEach(student => {
        // Create student card
        const studentDiv = document.createElement("div");
        studentDiv.classList.add("student");

        // Name
        const nameEl = document.createElement("h2");
        nameEl.classList.add("studentName");
        nameEl.textContent = student.name;
        studentDiv.appendChild(nameEl);

        // Marks as circles
        const marksUl = document.createElement("ul");
        marksUl.classList.add("marks");

        const studentData = Object.values(students).find(s => s.name === student.name);
        for (const mark of Object.values(studentData.marks)) {
            const li = document.createElement("li");
            li.textContent = mark;
            marksUl.appendChild(li);
        }
        studentDiv.appendChild(marksUl);

        // Average
        const avgP = document.createElement("p");
        avgP.innerHTML = `Average: <span class="average">${student.average}</span>`;
        studentDiv.appendChild(avgP);

        container.appendChild(studentDiv);
    });
}

// 6️⃣ Button Event Listener
document.getElementById("processBtn").addEventListener("click", () => {
    processAllStudents();
});
