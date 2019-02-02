const questions = [
    {
        question: "Who is the CEO of Google?",
        options: ["Satya Nadella", "Martin Luther", "Sundar Pichai", "Tim Cook"],
        answer: "Sundar Pichai"
    },
    {
        question: "Which is the most subscribed channel on youtube ?",
        options: ["T-Series", "5-Minute Crafts", "PewDiePie", "Canal KondZilla"],
        answer: "PewDiePie"
    }
];

function set_values() {
    localStorage.setItem('question_number', 0);
    localStorage.setItem('correct',0);
}

// Set starting value of counter to 0
if (!localStorage.getItem('question_number'))
    set_values();



document.addEventListener("DOMContentLoaded", () => {
    load_question();
});


let correct = Number(localStorage.getItem('correct'));
let question_number = Number(localStorage.getItem('question_number'));

function load_question() {
    
    document.querySelector("#correct").innerHTML = `${correct} of ${question_number}`;
    
    document.querySelector("#question").innerHTML = questions[question_number].question;
    const options = document.querySelector("#options");
    options.innerHTML = '';
    for (const option of questions[question_number].options) {
        options.innerHTML += `<button class="option">${option}</button>`;

    }

    document.querySelectorAll(".option").forEach(option => {
        option.onclick = () => {
                console.log(option.innerHTML);
                check_option(option.innerHTML);
        }
    });


}

function check_option(_x){
    if (questions[question_number].answer == _x) {
        console.log("Right answer");
        correct += 1;

    }
    else {
        console.log("Wrong answer");
    }
    question_number += 1;

    localStorage.setItem('question_number', question_number);
    localStorage.setItem('correct',correct);
    
    document.querySelector("#correct").innerHTML = `${correct} of ${question_number}`;
    
    if (question_number < questions.length) {
            load_question();
    }
    else {
        document.querySelector("#question").innerHTML = "<b>FINISH</b>";
        document.querySelector("#options").innerHTML = "";
        set_values();

        
    }
    
}



