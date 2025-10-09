let questions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the Above"],
        answer: "All of the Above"
    },
    {
        question: "What is the default value of an uninitialized variable in JavaScript?",
        options: ["null", "0", "undefined", "false"],
        answer: "undefined"
    },
    {
        question: "Which method is used to reverse an array in JavaScript?",
        options: ["flip()", "reverse()", "invert()", "swap()"],
        answer: "reverse()"
    },
    {
        question: "What does === operator check in JavaScript?",
        options: ["Value only", "Type only", "Value and Type both", "None"],
        answer: "Value and Type both"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["#", "//", "No one", "/* */"],
        answer: "//"
    }
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

questions = shuffleArray(questions);
questions.forEach(q => {
    q.options = shuffleArray(q.options);
});

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quit_btn = info_box.querySelector(".quit");
const restart_btn = info_box.querySelector(".restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const que_text = document.querySelector(".que_text");
const next_btn = document.querySelector(".next_btn");
const total_que = document.querySelector(".total_que span");
const timer_sec = document.querySelector(".timer_sec");

let que_count = 0;
let counter;
let timeValue = 15;
let score = 0;

start_btn.onclick = () => {
    info_box.style.display = "block";
};

quit_btn.onclick = () => {
    info_box.style.display = "none";
};

restart_btn.onclick = () => {
    info_box.style.display = "none";
    quiz_box.style.display = "block";
    showQuestion(que_count);
    startTimer(timeValue);
};

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        showQuestion(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        next_btn.style.display = "none";
    } else {
        alert("Quiz Completed! Your score: " + score + "/" + questions.length);
        window.location.reload();
    }
};

function showQuestion(index) {
    let q = questions[index];
    que_text.innerHTML = `<span>${q.question}</span>`;

    let options = "";
    q.options.forEach(opt => {
        options += `<div class="option">${opt}</div>`;
    });
    option_list.innerHTML = options;

    total_que.innerHTML = `<p>${index + 1}</p> of <p>${questions.length}</p> Questions`;

    const option_elems = option_list.querySelectorAll(".option");
    option_elems.forEach(opt => {
        opt.onclick = () => optionSelected(opt, q.answer);
    });
}

function optionSelected(answerElem, correctAns) {
    clearInterval(counter);

    let userAns = answerElem.textContent;
    if (userAns === correctAns) {
        answerElem.classList.add("correct");
        score++;
    } else {
        answerElem.classList.add("incorrect");
        let options = option_list.querySelectorAll(".option");
        options.forEach(opt => {
            if (opt.textContent === correctAns) {
                opt.classList.add("correct");
            }
        });
    }

    let options = option_list.querySelectorAll(".option");
    options.forEach(opt => (opt.style.pointerEvents = "none"));

    next_btn.style.display = "block";
}

function startTimer(time) {
    timer_sec.textContent = time;
    counter = setInterval(timer, 1000);
    function timer() {
        timer_sec.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            timer_sec.textContent = "0";

            let correctAns = questions[que_count].answer;
            let options = option_list.querySelectorAll(".option");
            options.forEach(opt => {
                if (opt.textContent === correctAns) {
                    opt.classList.add("correct");
                }
                opt.style.pointerEvents = "none";
            });
            next_btn.style.display = "block";
        }
    }
}
