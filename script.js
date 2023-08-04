const pomodoroDuration = 1 * 60; // 25 minutos en segundos
const shortBreakDuration = 5 * 60; // 5 minutos en segundos
const longBreakDuration = 20 * 60; // 20 minutos en segundos
const cyclesBeforeLongBreak = 4;
let count = pomodoroDuration;
let cycleCount = 0;
let isPomodoro = true;
const countdownEl = document.getElementById('countdown');
const startBtn = document.getElementById('start-btn');
let timer;

function updateCountdown() {
  const minutes = Math.floor(count / 60);
  let seconds = count % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  countdownEl.innerHTML = `${minutes}:${seconds}`;

  if (count === 0) {
    clearInterval(timer);
    Toastify({

      text: "Intervalo completado!",
      
      duration: 3000
      
      }).showToast();

    if (isPomodoro) {
      cycleCount++;

      if (cycleCount < cyclesBeforeLongBreak) {
        count = shortBreakDuration;
        isPomodoro = false;
        countdownEl.classList.add('descanso');
      } else {
        count = longBreakDuration;
        cycleCount = 0;
        isPomodoro = false;
        countdownEl.classList.add('descanso');
      }
    } else {
      count = pomodoroDuration;
      isPomodoro = true;
      countdownEl.classList.remove('descanso');
    }

    timer = setInterval(updateCountdown, 1000);
  } else {
    count--;
  }
}

startBtn.addEventListener('click', () => {
  timer = setInterval(updateCountdown, 1000);
});


// 2do list 

function agregarTarea() {
  var tarea = prompt("Ingrese una nueva tarea:");
  if (tarea) {
    var lista = document.getElementById("lista");
    var nuevaTarea = document.createElement("li");
    
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", function() {
      if (this.checked) {
        nuevaTarea.style.textDecoration = "line-through";
      } else {
        nuevaTarea.style.textDecoration = "none";
      }
    });
    
    var textoTarea = document.createElement("span");
    textoTarea.textContent = tarea;
    
    nuevaTarea.appendChild(checkbox);
    nuevaTarea.appendChild(textoTarea);
    
    lista.appendChild(nuevaTarea);
    
    // Guardar la lista de tareas en el almacenamiento local
    var tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      tareasGuardadas = JSON.parse(tareasGuardadas);
      tareasGuardadas.push({ tarea: tarea, completada: false });
    } else {
      tareasGuardadas = [{ tarea: tarea, completada: false }];
    }
    localStorage.setItem("tareas", JSON.stringify(tareasGuardadas));
  }
}

function limpiarLista() {
  swal({
    title: "Limpiar Lista de Tareas",
    text: "¿Estás seguro de que quieres limpiar la lista de tareas?",
    icon: "warning",
    buttons: ["Cancelar", "Limpiar"],
  }).then(function(confirmar) {
    if (confirmar) {
      var lista = document.getElementById("lista");
      while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
      }
      
      // Limpiar el almacenamiento local
      localStorage.removeItem("tareas");
      
      swal("Lista de Tareas Limpiada", "La lista de tareas ha sido limpiada exitosamente.", "success");
    }
  });
}

// Cargar las tareas guardadas al cargar la página
window.onload = function() {
  var tareasGuardadas = localStorage.getItem("tareas");
  if (tareasGuardadas) {
    tareasGuardadas = JSON.parse(tareasGuardadas);
    var lista = document.getElementById("lista");
    for (var i = 0; i < tareasGuardadas.length; i++) {
      var nuevaTarea = document.createElement("li");
      
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("click", function() {
        if (this.checked) {
          nuevaTarea.style.textDecoration = "line-through";
        } else {
          nuevaTarea.style.textDecoration = "none";
        }
      });
      
      var textoTarea = document.createElement("span");
      textoTarea.textContent = tareasGuardadas[i].tarea;
      
      if (tareasGuardadas[i].completada) {
        checkbox.checked = true;
        nuevaTarea.style.textDecoration = "line-through";
      }
      
      nuevaTarea.appendChild(checkbox);
      nuevaTarea.appendChild(textoTarea);
      
      lista.appendChild(nuevaTarea);
    }
  }
};
