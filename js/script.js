  console.log("hello");
  const startButton = document.getElementById('start-btn')
  const gameOver = document.getElementById('wrongAnswer')
  const questionContainerElement = document.getElementById('randomQuestions')
  const userDisplay = document.getElementById('userDisplay');
  const questionElement = document.getElementById('question')
  const answerButtonsElement = document.getElementById('options')
  const results = document.getElementById('results');
  var timeTaken,interval;
  var winnerName = document.createElement('div');
  let shuffledQuestions, currentQuestionIndex;
  // var seconds;

  function startTimer(){
    let timer = document.getElementById("timer").classList.remove('hide');
    var seconds = document.getElementById("timer").innerHTML;
    interval = setInterval(function () {
          if(seconds<=0){
            gameOver.style.display = 'block';
            let timer = document.getElementById("timer").classList.add('hide');
            questionContainerElement.classList.add('hide');
            userDisplay.classList.add('hide');
          }
          else{
            // console.log(seconds);
            document.getElementById("timer").innerHTML = seconds;
            seconds--;
            if (currentQuestionIndex + 1 === 4) {
              // gameOver.style.display = 'block';
              console.log("idx", currentQuestionIndex);
              // console.log();
              results.classList.remove('hide');
              timeTaken = seconds;
              console.log("sec",timeTaken);
              seconds = 0;
            }
          }
        },1000);
  }
  results.addEventListener('click', generateResults);
  var a,b;
  function generateResults(){
    clearInterval(interval);
    results.classList.add('hide');
    gameOver.style.display = 'none';
    let users = {};
    for(let i=0;i<5;i++)
      users[i] = parseFloat((Math.random() * 14 ).toFixed(2));
    users[5] = (15-timeTaken);
    let usersArray = Object.entries(users).sort((a,b)=>{return a[1]-b[1]})
    console.log("users",usersArray);
    let showResults = document.getElementById('showResults');
    showResults.classList.remove('hide');
        for (var j = 1; j<7;j++) {
            if(usersArray[j-1][1] == 15-timeTaken){
              let div = document.createElement('div');
              div.innerHTML = "YOU" + " : " + usersArray[j-1][1];
              showResults.appendChild(div);
            }
            else{
              let div = document.createElement('div');
              div.innerHTML = "PLAYER" + usersArray[j-1][0] + " : " + usersArray[j-1][1];
              showResults.appendChild(div);
            }
          }
          if(usersArray[0][1] == 15-timeTaken){
            a = "YOU";
            b = usersArray[0][1];
          }else{
              a = usersArray[0][0];
              b = usersArray[0][1];
          }
          showResults.childNodes[5].style.color="white";
          console.log("gdekus",showResults.childNodes[5])

          var div1 = document.createElement('div');
          div1.innerHTML = "PLAYER " + a;
          var div2 = document.createElement('div');
          div2.innerHTML = b;
          var winnerButton = document.getElementById('winner');
          winnerButton.onclick = function(){
            showResults.style.display = 'none';
            // gameOver.style.display = 'none';
            gameOver.classList.add('hide');
            var display = document.getElementById('displayWinner');
            display.classList.remove('hide');
            // display.style.display = "block";
            display.appendChild(div1);
            display.appendChild(div2);
            console.log('display',display);
            console.log('a',a);
            console.log('b',b);
          }
      // document.getElementById('displayWinner').appendChild(showResults.childNodes[5]);

  }

  function startGame() {
    console.log("started");
    startButton.classList.add('hide');
    // gameOver.style.display = 'none';
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    console.log(shuffledQuestions);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    userDisplay.classList.remove('hide');
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text;
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })
  }

  function resetState() {
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }


  function selectAnswer(e) {
    // e.target will give whatever we will select
    const selectedButton = e.target;
    console.log('target', e.target);
    const correct = selectedButton.dataset.correct;
    if (correct) {
      currentQuestionIndex++;
      console.log("true");
      setNextQuestion();
    }
    else{
      gameOver.classList.remove('hide');
      timer.classList.add('hide');
      questionContainerElement.classList.add('hide');
      userDisplay.classList.add('hide');
      result.classList.add('hide');
      console.log("false");
    }
  }
  const questions = [
    {
      question: 'What is 3 + 4 ?',
      answers: [
        { text: '7', correct: 1 },
        { text: '3', correct: 0 },
        { text: '8', correct: 0 },
        { text: '9', correct: 0 }
      ]
    },
    {
      question: 'what is 5 * 6 ?',
      answers: [
        { text: '30', correct: 1 },
        { text: '20', correct: 0 },
        { text: '10', correct: 0 },
        { text: '5', correct: 0 }
      ]
    },
    {
      question: 'what is 8 - 6 ?',
      answers: [
        { text: '2', correct: 1 },
        { text: '3', correct: 0 },
        { text: '4', correct: 0 },
        { text: '5', correct: 0 }
      ]
    },
    {
      question: 'What is 4 * 2?',
      answers: [
        { text: '6', correct: 0 },
        { text: '8', correct: 1 },
        { text: '5', correct: 0 },
        { text: '2', correct: 0 }
      ]
    },
    {
      question: 'What is 1 + 3?',
      answers: [
        { text: '6', correct: 0 },
        { text: '4', correct: 1 },
        { text: '5', correct: 0 },
        { text: '2', correct: 0 }
      ]
    },
    {
      question: 'What is 10 - 5?',
      answers: [
        { text: '6', correct: 0 },
        { text: '5', correct: 1 },
        { text: '7', correct: 0 },
        { text: '2', correct: 0 }
      ]
    },
    {
        question: 'What is 12/4?',
        answers: [
          { text: '3', correct: 1 },
          { text: '8', correct: 0 },
          { text: '5', correct: 0 },
          { text: '2', correct: 0 }
        ]
    },
    {
      question: 'What is 9 / 3?',
      answers: [
        { text: '6', correct: 0 },
        { text: '3', correct: 1 },
        { text: '5', correct: 0 },
        { text: '2', correct: 0 }
      ]
    },
  ]
