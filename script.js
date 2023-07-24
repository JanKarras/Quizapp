let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Welche Programmiersprache wird für die Gestaltung des Verhaltens einer Webseite verwendet?",
        "answer_1": "HTML",
        "answer_2": "CSS",
        "answer_3": "JavaScript",
        "answer_4": "Python",
        "right_answer": 3
    },
    {
        "question": "Welche Methode wird verwendet, um ein Element in JavaScript auszuwählen?",
        "answer_1": "document.getElementByID()",
        "answer_2": "document.find()",
        "answer_3": "document.select()",
        "answer_4": "document.getElementById()",
        "right_answer": 4
    },
    {
        "question": "Welche Art von Schleife wird in JavaScript verwendet, um über Objekte zu iterieren?",
        "answer_1": "for",
        "answer_2": "while",
        "answer_3": "foreach",
        "answer_4": "objectloop",
        "right_answer": 3
    },
    {
        "question": "Welche Funktion wird verwendet, um eine Nachricht in die Browserkonsole zu schreiben?",
        "answer_1": "console.log()",
        "answer_2": "print()",
        "answer_3": "console.write()",
        "answer_4": "log()",
        "right_answer": 1
    }
];

let currentquestion = 0;
let points = 0;
let flag = 0;
let progressinpercent = 0;
let AUDIO_SUCCESS = new Audio()
function init(){
    document.getElementById('totalquestionnumber').innerHTML = questions.length;
    showQuestion();
}

function showQuestion(){
    let question = questions[currentquestion];
    if(currentquestion == questions.length-1)
    {
        document.getElementById('next-question').innerHTML = 'Ergebnis';
    }
    setQuestionNumber();
    document.getElementById('question').innerHTML = question['question'];
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_' + i).innerHTML = question['answer_'+i]
    }
    progress();
}

function answer(selection){
    if(flag==0)
    {
    let numberofanswer = selection.slice(-1);
    for (let i = 1; i < 5; i++){
        document.getElementById('answer_'+i).parentNode.classList.remove('bg-success');
        document.getElementById('answer_'+i).parentNode.classList.remove('bg-danger');
    }
    let correctanswer = questions[currentquestion];
    if(numberofanswer==correctanswer['right_answer'])
    {
        document.getElementById('answer_'+numberofanswer).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        points++;
    }
    else
    {
        document.getElementById('answer_'+numberofanswer).parentNode.classList.add('bg-danger');
        document.getElementById('answer_'+correctanswer['right_answer']).parentNode.classList.add('bg-success');
    }
    document.getElementById('next-question').disabled = false;
    flag=1;
    }
}

function nextquestion(){
    if(currentquestion<questions.length-1)
    {
    currentquestion++;
    document.getElementById('next-question').disabled = true;
    flag=0;
    resetanswerbtn();
    showQuestion();
    }
    else
    {
        currentquestion++;
        progress();
        document.getElementById('card-body').style='display:none;'
        document.getElementById('end-screen').style='';
        document.getElementById('end-screen').innerHTML = `<div>Du hast von ${questions.length} möglichen Punkten ${points} erreicht.</div> 
                                                            <button  class="btn btn-primary" id="reset" onclick="reset()">Erneut Spielen</button>`
    }
}

function resetanswerbtn(){
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_'+i).parentNode.classList.remove('bg-success');
        document.getElementById('answer_'+i).parentNode.classList.remove('bg-danger');   
    }
}

function setQuestionNumber(){
    document.getElementById('activquestionnumber').innerHTML = currentquestion+1;
}

function progress(){
    progressinpercent = currentquestion/questions.length*100;
    document.getElementById('bar').innerHTML= `${progressinpercent}%`;
    document.getElementById('bar').style = `width: ${progressinpercent}%`;
}

function reset(){
    currentquestion = 0;
    points = 0;
    flag = 0;
    progressinpercent = 0;
    document.getElementById('card-body').style=''
    document.getElementById('end-screen').style='display:none;';
    showQuestion();
    resetanswerbtn()
    document.getElementById('next-question').disabled = true;
    document.getElementById('next-question').innerHTML = 'Nächste Frage';
}