angular.module('todoAp', ['firebase'])
  .controller('ControladorTareas', ['$scope', '$firebaseArray', '$filter', function ($scope, $firebaseArray, $filter) {

    var ctrl = this;
    var config = {
      apiKey: "AIzaSyAGMG3kqRqPYgcJyPVJRddOrctZg-JZF9k",
      authDomain: "listtask-44e8c.firebaseapp.com",
      databaseURL: "https://listtask-44e8c.firebaseio.com",
      projectId: "listtask-44e8c",
      storageBucket: "",
      messagingSenderId: "475529079338"
    };
    firebase.initializeApp(config);
    var ref = firebase.database().ref();

    ctrl.tareas = $firebaseArray(ref);

    ctrl.tareas.$loaded().then(function (tareas) {
      console.log(tareas.length); // data is loaded here
    });

    ctrl.agregarTarea = function () {
      ctrl.tareas.$add({ texto: ctrl.textoNuevaTarea, hecho: false });
      ctrl.textoNuevaTarea = '';
    };

    ctrl.restantes = function () {
      var cuenta = 0;
      angular.forEach(ctrl.tareas, function (tarea) {
        cuenta++;
      })
      return cuenta;
    };

    ctrl.toDo = function (task) {
      var index = ctrl.tareas.$indexFor(task.$id);
      ctrl.tareas.$save(index);
      //daniel
    }

    ctrl.tareasRealizadas = function () {
      var cuenta = 0;
      angular.forEach(ctrl.tareas, function (tarea) {
        if (tarea.hecho) {
          cuenta++;
        }
      })
      return cuenta;
    }

    ctrl.eliminar = function () {
      angular.forEach(ctrl.tareas, function (tarea) {
        if (tarea.hecho) {
          ctrl.tareas.$remove(tarea).then(function (ref) {
          });
        }
      });
    };
  }]);