import { appState, clickMe } from '../app';
import taskFieldTemplate from '../templates/taskField.html';
import { addListenerOnce, startAll } from './task';

export const setTaskFieldTemplate = function (document) {
  document.querySelector('#content').innerHTML = taskFieldTemplate;
  document.querySelector('.kanban__user-name').innerHTML =
    'Hello, ' + appState.currentUser.login;
  addListenerOnce(document);
  startAll(document);
  const formControl = document.querySelectorAll('.form-control');
  const btnIn = document.querySelector('#btn__login');
  const btnOut = document.querySelector('#app-out-btn');
  for (let i = 0; i < 2; i++) {
    formControl[i].style.display = 'none';
  }
  btnIn.style.display = 'none';
  btnOut.style.display = 'block';
  btnOut.addEventListener('click', (e) => clickMe());
};
