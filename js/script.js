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

  function startTimer(){
    let timer = document.getElementById("timer").classList.remove('hide');
    var seconds = document.getElementById("timer").innerHTML;
    interval = setInterval(function () {
          if (seconds<=0) {
            gameOver.style.display = 'block';
            let timer = document.getElementById("timer").classList.add('hide');
            questionContainerElement.classList.add('hide');
            userDisplay.classList.add('hide');
          } else {
            document.getElementById("timer").innerHTML = seconds;
            seconds--;
            if (currentQuestionIndex + 1 === 4) {
              results.classList.remove('hide');
              timeTaken = seconds;
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
    let showResults = document.getElementById('showResults');
    showResults.classList.remove('hide');
        for (var j = 1; j<7;j++) {
            if (usersArray[j-1][1] == 15-timeTaken) {
              let div = document.createElement('div');
              div.innerHTML = "YOU" + " : " + usersArray[j-1][1];
              showResults.appendChild(div);
            } else {
              let div = document.createElement('div');
              div.innerHTML = "PLAYER" + usersArray[j-1][0] + " : " + usersArray[j-1][1];
              showResults.appendChild(div);
            }
          }
          if (usersArray[0][1] == 15-timeTaken) {
            a = "YOU";
            b = usersArray[0][1];
          } else {
              a = usersArray[0][0];
              b = usersArray[0][1];
          }
          showResults.childNodes[5].style.color="white";

          var div1 = document.createElement('div');
          div1.innerHTML = "PLAYER " + a;
          var div2 = document.createElement('div');
          div2.innerHTML = b;
          var winnerButton = document.getElementById('winner');
          winnerButton.onclick = function(){
            showResults.style.display = 'none';
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
  }
  function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {
       var j = Math.floor(Math.random() * (i + 1));

       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }

   return array;
}

  function startGame() {
    console.log("started");
    startButton.classList.add('hide');
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    userDisplay.classList.remove('hide');
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion();
  }

  function showQuestion() {

    //randomQuestions generation
    var arithmeticOperators = [{
          sign: "+",
          method: function(a,b){ return parseFloat((a + b).toFixed(2)); }
      },
      {
          sign: "-",
          method: function(a,b){ return parseFloat((a - b).toFixed(2)); }
      },
      {
          sign: "*",
          method: function(a,b){ return parseFloat((a * b).toFixed(2)); }
      },
      {
          sign: "/",
          method: function(a,b){ return parseFloat((a / b).toFixed(2)); }
      }
    ];
    var numbers = [0, 1, 2 , 3, 4, 5, 6, 7, 8, 9];

    var operatorSelect = Math.floor(Math.random()*arithmeticOperators.length);
    var numIdx1 = Math.floor(Math.random()*(numbers.length));
    var number1= numbers[numIdx1];
    // to get unique numbers
    numbers.splice(numIdx1, 1);

    var numIdx2 = Math.floor(Math.random()*(numbers.length));
    var number2= numbers[numIdx2];
    numbers.splice(numIdx2, 1);
    var options = [4, 1, 7];

    if (options.includes(arithmeticOperators[operatorSelect].method(number1, number2))) {
      options.push(15);
    } else {
      options.push(arithmeticOperators[operatorSelect].method(number1, number2));
    }

    var randomOptions = shuffleArray(options);
    var questionsAll = {
        question: `what is ${number1} ${arithmeticOperators[operatorSelect].sign} ${number2} ?`,
        answer: arithmeticOperators[operatorSelect].method(number1, number2),
        optionsArray: [
          options[0],
          options[1],
          options[2],
          options[3]
        ]
    }

    //questions are getting displayed here
    questionElement.innerText = questionsAll.question
    questionsAll.optionsArray.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer;
      button.classList.add('btn')
      if (answer == questionsAll.answer) {
        console.log("if cond");
        button.dataset.correct = true;
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
    if (selectedButton.dataset.correct) {
      currentQuestionIndex++;
      console.log("true");
      setNextQuestion();
    } else {
        gameOver.classList.remove('hide');
        timer.classList.add('hide');
        questionContainerElement.classList.add('hide');
        userDisplay.classList.add('hide');
        results.classList.add('hide');
      }
  }
