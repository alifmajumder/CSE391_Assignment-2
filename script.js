const fortunes = [
    "You will soon find yourself very hungry again. In roughly two hours. Its not destiny; its just how digestion works.",
    "Error 404: Fortune not found. Please reboot your expectations and try again after a nap.",
    "You will soon achieve a personal best in 'Competitive Sleeping.' Gold medal incoming.",
    "Great entertainment is in your future. Unfortunately, it will be over by four hours of scrolling through list trying to decide what to watch.",
    "Your timing is impeccable. The exact moment you switch on the big match, your favorite team will immediately concede a stupid goal. It's definitely your fault.",
    "History is doomed to repeat itself. Prepare for the arrival of a problem you thought you solved years ago.",
    "Prepare for a revelation: You are about to attend a one-hour club meeting that absolutely could have just been a two-sentence email.",
    "You will go to the store for toothpaste. You will leave with 500tk worth of ice cream, drinks, three bags of chips and no toothpaste",
    "True happiness is just around the corner. Specifically, the moment your friends cancel those Friday night plans you secretly didn't want to go to anyway.",
    "Your next day will be completely joyless unless of couse you decide to drink cha at Iftari"
];

function displayRandomFortune() {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    document.getElementById("fortune-text").textContent = fortunes[randomIndex];
}

window.addEventListener('load', displayRandomFortune);

function changeFontColor() {
    const colors = ['#e74c3c', '#8e44ad', '#27ae60', '#d35400', '#9d2bc0'];
    document.getElementById("fortune-text").style.color = colors[Math.floor(Math.random() * colors.length)];
}

function changeBgColor() {
    const bgColors = ['#fdf2e9', '#eaf2f8', '#e8f8f5', '#fef9e7', '#f4ecf7'];
    document.getElementById("fortune-container").style.backgroundColor = bgColors[Math.floor(Math.random() * bgColors.length)];
}

function changeBorderColor() {
    const borderColors = ['#c0392b', '#8e44ad', '#2980b9', '#27ae60', '#f39c12'];
    document.getElementById("fortune-container").style.borderColor = borderColors[Math.floor(Math.random() * borderColors.length)];
}

function changeFontStyle() {
    const fonts = [
        { family: "'Courier New', Courier, monospace", size: "1.4em" },
        { family: "'Georgia', serif", size: "1.6em" },
        { family: "'Times New Roman', Times, serif", size: "1.7em" },
        { family: "Arial, sans-serif", size: "1.5em" }
    ];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    const textElement = document.getElementById("fortune-text");
    textElement.style.fontFamily = randomFont.family;
    textElement.style.fontSize = randomFont.size;
}

document.getElementById("btn-color").onclick = changeFontColor;
document.getElementById("btn-bg").onclick = changeBgColor;
document.getElementById("btn-border").onclick = changeBorderColor;
document.getElementById("btn-font").onclick = changeFontStyle;

let timerInterval = null;
let currentTime = 0;

function startStopwatch() {
    if (timerInterval !== null) return;
    
    timerInterval = setInterval(function() {
        currentTime += 3;
        document.getElementById("stopwatch-display").textContent = currentTime;
        
        if (currentTime >= 30) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }, 1000);
}

function stopStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
    currentTime = 0;
    document.getElementById("stopwatch-display").textContent = currentTime;
}

document.getElementById("btn-start").onclick = startStopwatch;
document.getElementById("btn-stop").onclick = stopStopwatch;
document.getElementById("btn-reset").onclick = resetStopwatch;

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    
    tasks.forEach(function(task, index) {
        const listItem = document.createElement("li");
        
        if (task.completed) {
            listItem.classList.add("completed");
        }
        
        const taskContent = document.createElement("div");
        taskContent.className = "task-content";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onclick = function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };
        
        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        
        taskContent.appendChild(checkbox);
        taskContent.appendChild(textSpan);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn-delete";
        deleteBtn.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };
        
        listItem.appendChild(taskContent);
        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    });
}

function addTodo() {
    const inputField = document.getElementById("todo-input");
    const taskText = inputField.value.trim();
    
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        
        saveTasks();
        renderTasks();
        
        inputField.value = "";
    }
}

document.getElementById("btn-add-todo").onclick = addTodo;
window.addEventListener('load', renderTasks);

function updateFooterInfo() {
    const locationName = "Dhaka, Bangladesh";
    const lastMod = document.lastModified;
    document.getElementById("footer-info").textContent = "Location: " + locationName + " | Last Modified: " + lastMod;
}

window.addEventListener('load', updateFooterInfo);