import { Todo } from './Todo.js';

function getLocalStorage (): Array<Todo> {
  const ls = localStorage.getItem( "todos" );
  if ( ls ) {
    return JSON.parse( ls );
  }

  return new Array<Todo>();
}

function setLocalStorage ( todos: Array<Todo> ) {
  localStorage.setItem( "todos", JSON.stringify( todos ) );
  implementCountTodo();
}

function countTodoCompleted (): [number, number] {
  const ls: Array<Todo> = getLocalStorage();
  const size = ls.length;
  let countCompletd = 0;

  for ( const todo of ls ) {
    if ( todo.completed ) {
      countCompletd++;
    }
  }
  return [countCompletd, size - countCompletd];
}

function implementCountTodo () {
  const badgeCompleted = document.getElementById( "badge_completed" ) as HTMLSpanElement;
  const badgeInProgress = document.getElementById( "badge_in_progess" ) as HTMLSpanElement;
  const count = countTodoCompleted();
  badgeCompleted.innerText = `${count[0]}`;
  badgeInProgress.innerText = `${count[1]}`;
}

function createTodoHtml ( todo: Todo ): HTMLLIElement {
  let str = "";
  if ( todo.completed ) {
    str = " completed";
  }

  const li = document.createElement( "li" );
  li.className = `list-group-item my-1 ${str} `;
  li.title = "Tâche à terminer";
  li.id = `todo_${todo.id}`;
  li.innerHTML = `${todo.title}  <span class="delete"><img src="./assets/img/delete2.png" alt="delete" title="Supprimer"></span>`
  return li;

}

function setTodosInHtml () {
  const todos: Array<Todo> = getLocalStorage();
  const ul = document.getElementById( "todos" ) as HTMLLIElement;

  for ( const todo of todos ) {
    ul.appendChild( createTodoHtml( todo ) );
  }

}

function newTodo () {
  const btnNewTodo = document.getElementById( "btn_new_todo" ) as HTMLButtonElement;
  btnNewTodo.addEventListener( "click", ( e ) => {
    e.preventDefault();
    const text = document.getElementById( "todo" ) as HTMLInputElement;
    if ( text.value.length > 0 ) {
      let tableau = getLocalStorage()
      let id = tableau.length;
      const todo = new Todo( id, text.value, false );
      text.value = "";
      const liElement = createTodoHtml( todo );
      document.getElementById( "todos" )?.appendChild( liElement );
      tableau.push( todo );
      setLocalStorage( tableau );
      addListenerOneLi( liElement );
      // existe déla dans setLocalStorage()
      // implementCountTodo();
    }
  } )

}

function startAllLiAddEventListener () {
  const lis = document.querySelectorAll( "li.list-group-item " );
  lis.forEach( ( el ) => {
    addListenerOneLi( el );
    addListenerButton( el );
  } );

}



function addListenerButton ( el: Element ) {
  let id = el.id.split( "todo_" )[1];
  const span = el.querySelector( "span.delete" ) as HTMLSpanElement;
  span.addEventListener( "click", () => {
    console.log( "delete" + id );

  } )
}

function addListenerOneLi ( el: Element ) {
  const lis = document.querySelectorAll( "li.list-group-item " );
  lis.forEach( ( el ) => {
    el.addEventListener( "click", () => {
      el.classList.toggle( "completed" );
      let id = el.id.split( "todo_" )[1];
      const todos: Array<Todo> = getLocalStorage()
        .map( todo => {
          if ( todo.id == parseInt( id ) ) {
            todo.completed = !todo.completed;
          }
          return todo;
        } )
      setLocalStorage( todos );
    } )
  } );

}









newTodo()
setTodosInHtml();
implementCountTodo();
startAllLiAddEventListener();





