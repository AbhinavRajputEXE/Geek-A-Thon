let selectedOption = null;
let currentQuestionIndex = 0;
let correctCount = 0;
let quizQuestions = [];

// Make an API request to fetch Olympic quiz questions
fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium')
    .then(response => response.json())
    .then(data => {
        // Process the quiz questions returned from the API
        quizQuestions = data.results;

        // Display the first question on your website
        displayQuestion(quizQuestions[currentQuestionIndex]);
    })
    .catch(error => {
        // Handle any errors that occur during the API request
        console.error('Error:', error);
    });

function displayQuestion(question) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.textContent = question.question;
    quizContainer.appendChild(questionElement);

    const optionsElement = document.createElement('ul');
    optionsElement.className = 'options';
    const options = [];

    question.incorrect_answers.forEach(incorrectAnswer => {
        options.push({
            value: incorrectAnswer,
            isCorrect: false
        });
    });

    options.push({
        value: question.correct_answer,
        isCorrect: true
    });

    options.sort(() => Math.random() - 0.5); // Randomize the options order

    options.forEach(option => {
        const li = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = option.value;
        radio.addEventListener('click', () => {
            selectedOption = radio.value;
            disableOptions(option.isCorrect);
        });
        li.appendChild(radio);
        li.appendChild(document.createTextNode(option.value));
        optionsElement.appendChild(li);
    });

    quizContainer.appendChild(optionsElement);

    if (currentQuestionIndex === 9) {
        document.getElementById('next-button').style.display = 'none';
        document.getElementById('submit-button').style.display = 'block';
    }
}

function disableOptions(isCorrectOptionSelected) {
    const options = document.getElementsByName('answer');
    options.forEach(option => {
        option.disabled = true;
        if (option.value === selectedOption) {
            option.parentNode.style.backgroundColor = isCorrectOptionSelected ? 'lightgreen' : 'lightcoral';
            if (!isCorrectOptionSelected) {
                const correctOption = Array.from(options).find(option => option.value === quizQuestions[currentQuestionIndex].correct_answer);
                correctOption.parentNode.style.backgroundColor = 'lightgreen';
            } else {
                correctCount++;
            }
        }
    });
}

document.getElementById('next-button').addEventListener('click', () => {
    if (selectedOption !== null) {
        const options = document.getElementsByName('answer');
        options.forEach(option => option.checked = false);
        selectedOption = null;
        currentQuestionIndex++;
        if (currentQuestionIndex <= 9) {
            displayQuestion(quizQuestions[currentQuestionIndex]);
        }
    }
});

document.getElementById('submit-button').addEventListener('click', () => {
    if (selectedOption !== null) {
        disableOptions(false);
        document.getElementById('next-button').style.display = 'none';
        document.getElementById('submit-button').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
        document.getElementById('result-container').textContent = `You answered ${correctCount} out of 10 questions correctly.`;
        document.getElementById('restart-button').style.display = 'block';
    }
});

document.getElementById('restart-button').addEventListener('click', () => {
    currentQuestionIndex = 0;
    correctCount = 0;
    selectedOption = null;
    document.getElementById('result-container').style.display = 'none';
    displayQuestion(quizQuestions[currentQuestionIndex]);
    document.getElementById('next-button').style.display = 'block';
    document.getElementById('restart-button').style.display = 'none';
});
