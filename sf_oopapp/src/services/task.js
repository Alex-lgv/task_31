import { appState } from '../app';
import { Task } from '../models/task/Task';
import { Status } from '../models/statusAndRole';
import { User } from '../models/user/User';
import { DragAndDrop } from './drag';
import deleteImg from '../templates/deleteImg.html';
import deleteItemImg from '../templates/deleteItems.html';

export const letsStartBacklog = function (document) {
  document.querySelector('.dropdown-task-backlog').innerHTML = '';
  document.querySelector('.dropdown-content-backlog').innerHTML = '';

  if (isAdmin()) {
    let isHasTask = false;
    for (const user of User.getListUserFromLocalStorage()) {
      let countTask = 0;
      const btnDeleteTask =
        '<div class="dropdown-by-id">' +
        '<button class="button-delete button-delete-task" type="button">' +
        deleteImg +
        '</button>' +
        '<div class="dropdown-content delete-content-id-backlog-' +
        user.id +
        '">' +
        '</div></div>';
      document.querySelector('.dropdown-task-backlog').innerHTML +=
        '<div class="p-dropdown"><p id="' +
        user.id +
        '" class="p-backlog-user p-backlog-user-1">' +
        user.login +
        '</p>' +
        btnDeleteTask +
        '</div>';
      for (const task of Task.getListTaskForBackLog()) {
        if (user.id == task.idUser) {
          countTask++;
          isHasTask = true;
          const elementLi = document.createElement('li');
          elementLi.className = 'list-task-backlog';
          elementLi.draggable = true;
          elementLi.id = task.id;
          elementLi.innerHTML = task.description;
          document
            .querySelector('.dropdown-task-backlog')
            .appendChild(elementLi);
          document.querySelector('.dropdown-content-backlog').innerHTML +=
            '<li class="tasks-from-backlog" id="' +
            task.id +
            '">' +
            task.description +
            ' (' +
            user.login +
            ')' +
            '</li>';
          document.querySelector(
            '.delete-content-id-backlog-' + user.id + ''
          ).innerHTML +=
            '<li class="tasks-delete button-deleteTask" id="' +
            task.id +
            '">' +
            deleteItemImg +
            task.description +
            ' (' +
            user.login +
            ')' +
            '</li>';
        }
      }
      if (countTask == 0) {
        document.querySelector('.dropdown-task-backlog').innerHTML +=
          '<p> (User do not have any tasks) </p>';
      }
    }

    let countTask = 0;
    const btnDeleteTask =
      '<div class="dropdown-by-id">' +
      '<button class="button-delete button-delete-task" type="button">' +
      deleteImg +
      '</button>' +
      '<div class="dropdown-content delete-content-id-backlog--1">' +
      '</div></div>';
    document.querySelector('.dropdown-task-backlog').innerHTML +=
      '<div class="p-dropdown"><p id="-1" class="p-backlog-user p-backlog-user-1">Free tasks </p>' +
      btnDeleteTask +
      '</div>';
    for (const task of Task.getListTaskForBackLog()) {
      if (-1 == task.idUser) {
        countTask++;
        isHasTask = true;
        const elementLi = document.createElement('li');
        elementLi.className = 'list-task-backlog';
        elementLi.draggable = true;
        elementLi.id = task.id;
        elementLi.innerHTML = task.description;
        document.querySelector('.dropdown-task-backlog').appendChild(elementLi);
        document.querySelector('.delete-content-id-backlog--1').innerHTML +=
          '<li class="tasks-delete button-deleteTask" id="' +
          task.id +
          '">' +
          deleteItemImg +
          task.description +
          '</li>';
      }
    }
    if (countTask == 0) {
      document.querySelector('.dropdown-task-backlog').innerHTML +=
        '<p> (There are no tasks at the moment) </p>';
    }
    if (isHasTask) {
      document.querySelector('.btn__ready-add').className =
        'btn__ready-add active-add';
    } else {
      document.querySelector('.btn__ready-add').className =
        'btn__ready-add no-active-add';
    }
  } else {
    let isHasTask = false;
    const user = appState.currentUser;
    const btnDeleteTask =
      '<div class="dropdown-by-id">' +
      '<button class="button-delete button-delete-task" type="button">' +
      deleteImg +
      '</button>' +
      '<div class="dropdown-content delete-content-id-backlog-' +
      user.id +
      '">' +
      '</div></div>';
    document.querySelector('.dropdown-task-backlog').innerHTML +=
      '<div class="p-dropdown"><p id="' +
      user.id +
      '" class="p-backlog-user p-backlog-user-1"></p>' +
      btnDeleteTask +
      '</div>';

    for (const task of Task.getListTaskForBackLog()) {
      isHasTask = true;
      document.querySelector('.dropdown-task-backlog').innerHTML +=
        '<li class="list-task-backlog" draggable="true" id="' +
        task.id +
        '" draggable="true">' +
        task.description +
        '</li>';
      document.querySelector('.dropdown-content-backlog').innerHTML +=
        '<li class="tasks-from-backlog" id="' +
        task.id +
        '">' +
        task.description +
        '</li>';
      document.querySelector(
        '.delete-content-id-backlog-' + user.id + ''
      ).innerHTML +=
        '<li class="tasks-delete button-deleteTask" id="' +
        task.id +
        '">' +
        deleteItemImg +
        task.description +
        '</li>';
    }

    if (isHasTask) {
      document.querySelector('.btn__ready-add').className =
        'btn__ready-add active-add';
    } else {
      document.querySelector('.btn__ready-add').className =
        'btn__ready-add no-active-add';
    }
  }
};

export const letsStartReady = function (document) {
  document.querySelector('.dropdown-task-ready').innerHTML = '';
  document.querySelector('.dropdown-content-ready').innerHTML = '';

  if (isAdmin()) {
    let isHasTask = false;
    for (const user of User.getListUserFromLocalStorage()) {
      let countTask = 0;
      const btnDeleteTask =
        '<div class="dropdown-by-id">' +
        '<button class="button-delete button-delete-task" type="button">' +
        deleteImg +
        '</button>' +
        '<div class="dropdown-content delete-content-id-ready-' +
        user.id +
        '">' +
        '</div></div>';
      document.querySelector('.dropdown-task-ready').innerHTML +=
        '<div class="p-dropdown"><p id="' +
        user.id +
        '" class="p-backlog-user">' +
        user.login +
        '</p>' +
        btnDeleteTask +
        '</div>';
      for (const task of Task.getListTaskForReady()) {
        if (user.id == task.idUser) {
          countTask++;
          isHasTask = true;
          document.querySelector('.dropdown-task-ready').innerHTML +=
            '<li class="list-task-ready" id="' +
            task.id +
            '" draggable="true" >' +
            task.description +
            '</li> ';
          document.querySelector('.dropdown-content-ready').innerHTML +=
            '<li class="tasks-from-ready" id="' +
            task.id +
            '">' +
            task.description +
            ' (' +
            user.login +
            ')' +
            '</li>';
          document.querySelector(
            '.delete-content-id-ready-' + user.id + ''
          ).innerHTML +=
            '<li class="tasks-delete button-deleteTask" id="' +
            task.id +
            '">' +
            deleteItemImg +
            task.description +
            ' (' +
            user.login +
            ')' +
            '</li>';
        }
      }
      if (countTask == 0) {
        document.querySelector('.dropdown-task-ready').innerHTML +=
          '<p> (User do not have any tasks) </p>';
      }
    }
    if (isHasTask) {
      document.querySelector('.btn__progress-add').className =
        'btn__progress-add active-add';
    } else {
      document.querySelector('.btn__progress-add').className =
        'btn__progress-add no-active-add';
    }
  } else {
    let isHasTask = false;
    const user = appState.currentUser;
    const btnDeleteTask =
      '<div class="dropdown-by-id">' +
      '<button class="button-delete button-delete-task" type="button">' +
      deleteImg +
      '</button>' +
      '<div class="dropdown-content delete-content-id-ready-' +
      user.id +
      '">' +
      '</div></div>';
    document.querySelector('.dropdown-task-ready').innerHTML +=
      '<div class="p-dropdown"><p id="' +
      user.id +
      '" class="p-backlog-user p-backlog-user-1"></p>' +
      btnDeleteTask +
      '</div>';

    for (const task of Task.getListTaskForReady()) {
      isHasTask = true;
      document.querySelector('.dropdown-task-ready').innerHTML +=
        '<li class="list-task-ready" id="' +
        task.id +
        '" draggable="true" >' +
        task.description +
        '</li>';
      document.querySelector('.dropdown-content-ready').innerHTML +=
        '<li class="tasks-from-ready" id="' +
        task.id +
        '">' +
        task.description +
        '</li>';
      document.querySelector(
        '.delete-content-id-ready-' + user.id + ''
      ).innerHTML +=
        '<li class="tasks-delete button-deleteTask" id="' +
        task.id +
        '">' +
        deleteItemImg +
        task.description +
        '</li>';
    }
    if (isHasTask) {
      document.querySelector('.btn__progress-add').className =
        'btn__progress-add active-add';
    } else {
      document.querySelector('.btn__progress-add').className =
        'btn__progress-add no-active-add';
    }
  }

  document.querySelectorAll('.tasks-from-backlog').forEach((element) => {
    element.addEventListener('click', function (e) {
      Task.changeStatus(element.id, Status.READY);
      element.parentNode.removeChild(element);
      document.querySelectorAll('.list-task-backlog').forEach((elementLTB) => {
        if (element.id == elementLTB.id) {
          elementLTB.parentNode.removeChild(elementLTB);
        }
      });
      startAll(document);
    });
  });
};

export const letsStartInProgress = function (document) {
  document.querySelector('.dropdown-task-progress').innerHTML = '';
  document.querySelector('.dropdown-content-progress').innerHTML = '';

  if (isAdmin()) {
    let isHasTask = false;
    for (const user of User.getListUserFromLocalStorage()) {
      let countTask = 0;
      const btnDeleteTask =
        '<div class="dropdown-by-id">' +
        '<button class="button-delete button-delete-task" type="button">' +
        deleteImg +
        '</button>' +
        '<div class="dropdown-content delete-content-id-progress-' +
        user.id +
        '">' +
        '</div></div>';
      document.querySelector('.dropdown-task-progress').innerHTML +=
        '<div class="p-dropdown"><p id="' +
        user.id +
        '" class="p-backlog-user">' +
        user.login +
        '</p>' +
        btnDeleteTask +
        '</div>';
      for (const task of Task.getListsOfTasks()) {
        if (user.id == task.idUser) {
          countTask++;
          isHasTask = true;
          document.querySelector('.dropdown-task-progress').innerHTML +=
            '<li class="list-task-progress" id="' +
            task.id +
            '" draggable="true" >' +
            task.description +
            '</li> ';
          document.querySelector('.dropdown-content-progress').innerHTML +=
            '<li class="tasks-from-progress" id="' +
            task.id +
            '">' +
            task.description +
            ' (' +
            user.login +
            ')' +
            '</li>';
          document.querySelector(
            '.delete-content-id-progress-' + user.id + ''
          ).innerHTML +=
            '<li class="tasks-delete button-deleteTask" id="' +
            task.id +
            '">' +
            deleteItemImg +
            task.description +
            ' (' +
            user.login +
            ')' +
            '</li>';
        }
      }
      if (countTask == 0) {
        document.querySelector('.dropdown-task-progress').innerHTML +=
          '<p> (User do not have any tasks) </p>';
      }
    }
    if (isHasTask) {
      document.querySelector('.btn__finished-add').className =
        'btn__finished-add active-add';
    } else {
      document.querySelector('.btn__finished-add').className =
        'btn__finished-add no-active-add';
    }
  } else {
    let isHasTask = false;
    const user = appState.currentUser;
    const btnDeleteTask =
      '<div class="dropdown-by-id">' +
      '<button class="button-delete button-delete-task" type="button">' +
      deleteImg +
      '</button>' +
      '<div class="dropdown-content delete-content-id-progress-' +
      user.id +
      '">' +
      '</div></div>';
    document.querySelector('.dropdown-task-progress').innerHTML +=
      '<div class="p-dropdown"><p id="' +
      user.id +
      '" class="p-backlog-user p-backlog-user-1"></p>' +
      btnDeleteTask +
      '</div>';

    for (const task of Task.getListsOfTasks()) {
      isHasTask = true;
      document.querySelector('.dropdown-task-progress').innerHTML +=
        '<li class="list-task-progress" id="' +
        task.id +
        '" draggable="true" >' +
        task.description +
        '</li>';
      document.querySelector('.dropdown-content-progress').innerHTML +=
        '<li class="tasks-from-progress" id="' +
        task.id +
        '">' +
        task.description +
        '</li>';
      document.querySelector(
        '.delete-content-id-progress-' + user.id + ''
      ).innerHTML +=
        '<li class="tasks-delete button-deleteTask" id="' +
        task.id +
        '">' +
        deleteItemImg +
        task.description +
        '</li>';
    }
    if (isHasTask) {
      document.querySelector('.btn__finished-add').className =
        'btn__finished-add active-add';
    } else {
      document.querySelector('.btn__finished-add').className =
        'btn__finished-add no-active-add';
    }
  }

  document.querySelectorAll('.tasks-from-ready').forEach((element) => {
    element.addEventListener('click', function (e) {
      Task.changeStatus(element.id, Status.IN_PROGRESS);
      element.parentNode.removeChild(element);
      document.querySelectorAll('.list-task-ready').forEach((elementLTB) => {
        if (element.id == elementLTB.id) {
          elementLTB.parentNode.removeChild(elementLTB);
        }
      });
      startAll(document);
    });
  });
};

export const letsStartFinished = function (document) {
  document.querySelector('.dropdown-task-finished').innerHTML = '';

  if (isAdmin()) {
    for (const user of User.getListUserFromLocalStorage()) {
      let countTask = 0;
      const btnDeleteTask =
        '<div class="dropdown-by-id">' +
        '<button class="button-delete button-delete-task" type="button">' +
        deleteImg +
        '</button>' +
        '<div class="dropdown-content delete-content-id-finished-' +
        user.id +
        '">' +
        '</div></div>';
      document.querySelector('.dropdown-task-finished').innerHTML +=
        '<div class="p-dropdown"><p id="' +
        user.id +
        '" class="p-backlog-user">' +
        user.login +
        '</p>' +
        btnDeleteTask +
        '</div>';
      for (const task of Task.getListTaskForFinished()) {
        if (user.id == task.idUser) {
          countTask++;
          document.querySelector('.dropdown-task-finished').innerHTML +=
            '<li class="list-task-finished" id="' +
            task.id +
            '" draggable="true"  >' +
            task.description +
            '</li> ';
          document.querySelector(
            '.delete-content-id-finished-' + user.id + ''
          ).innerHTML +=
            '<li class="tasks-delete button-deleteTask" id="' +
            task.id +
            '">' +
            deleteItemImg +
            task.description +
            ' (' +
            user.login +
            ')' +
            '</li>';
        }
      }
      if (countTask == 0) {
        document.querySelector('.dropdown-task-finished').innerHTML +=
          '<p> (User do not have any tasks) </p>';
      }
    }
  } else {
    const user = appState.currentUser;
    const btnDeleteTask =
      '<div class="dropdown-by-id">' +
      '<button class="button-delete button-delete-task" type="button">' +
      deleteImg +
      '</button>' +
      '<div class="dropdown-content delete-content-id-finished-' +
      user.id +
      '">' +
      '</div></div>';
    document.querySelector('.dropdown-task-finished').innerHTML +=
      '<div class="p-dropdown"><p id="' +
      user.id +
      '" class="p-backlog-user p-backlog-user-1"></p>' +
      btnDeleteTask +
      '</div>';

    for (const task of Task.getListTaskForFinished()) {
      document.querySelector('.dropdown-task-finished').innerHTML +=
        '<li class="list-task-finished" id="' +
        task.id +
        '" draggable="true" >' +
        task.description +
        '</li>';
      document.querySelector(
        '.delete-content-id-finished-' + user.id + ''
      ).innerHTML +=
        '<li class="tasks-delete button-deleteTask" id="' +
        task.id +
        '">' +
        deleteItemImg +
        task.description +
        '</li>';
    }
  }

  document.querySelectorAll('.tasks-from-progress').forEach((element) => {
    element.addEventListener('click', function (e) {
      Task.changeStatus(element.id, Status.FINISHED);
      element.parentNode.removeChild(element);
      document.querySelectorAll('.list-task-progress').forEach((elementLTB) => {
        if (element.id == elementLTB.id) {
          elementLTB.parentNode.removeChild(elementLTB);
        }
      });
      startAll(document);
    });
  });
};

export const startAll = function (document) {
  letsStartBacklog(document);
  letsStartReady(document);
  letsStartInProgress(document);
  letsStartFinished(document);
  onChange(document, '.list-task-backlog');
  onChange(document, '.list-task-ready');
  onChange(document, '.list-task-progress');
  onChange(document, '.list-task-finished');
  onDelete(document);
  onDragAndDrop(document);
  fillLenghtInFooter(document);
  document.querySelectorAll('li[draggable="true"]').forEach((element) => {
    element.addEventListener('dblclick', (event) => {
      element.contentEditable = true;
    });
  });
};

function fillLenghtInFooter(document) {
  document.querySelector('.backlog-lenght').innerHTML = Task.getBackLogSize();
  document.querySelector('.finished-lenght').innerHTML = Task.getFinishedSize();
  document.querySelector('.name-footer').innerHTML =
    appState._currentUser.login;
  document.querySelector('.year-footer').innerHTML = new Date().getFullYear();
}

export const updateAll = function (document) {
  startAll(document);
};

export const addListenerOnce = function (document) {
  document
    .querySelector('.btn__backlog-add')
    .addEventListener('click', function (e) {
      const inputTask = document.querySelector('.input__backlog');
      if (inputTask.value != '') {
        const listDropdawn = document.querySelector('.dropdown-task-backlog');
        const list =
          '<li class="list-task-backlog">' + inputTask.value + '</li>';
        listDropdawn.innerHTML += list;
        const task = new Task(inputTask.value);
        Task.save(task);
        document.querySelector('.dropdown-content-backlog').innerHTML +=
          '<li class="tasks-from-backlog" id="' +
          task.id +
          '">' +
          task.description +
          '</li>';
        inputTask.value = '';
        startAll(document);
      }
    });
};

function onChange(document, className) {
  document.querySelectorAll(className).forEach((element) => {
    element.addEventListener('blur', function () {
      Task.changeDescription(element.id, element.textContent);
      startAll(document);
    });
  });
}

function onDelete(document) {
  document.querySelectorAll('.button-deleteTask').forEach((element) => {
    element.addEventListener('click', function () {
      Task.deleteTask(element.id);
      startAll(document);
    });
  });
}

function onDragAndDrop(document) {
  new DragAndDrop(document);
}

function isAdmin() {
  return User.isAdmin(appState.currentUser);
}
