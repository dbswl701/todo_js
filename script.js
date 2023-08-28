// 새로운 todo 추가하기 클릭 시 (section)추가되어야함
// write 아이콘 클릭 시 수정할 수 있어야 함 -> text가 아니라 input으로 변경? -> prompt 사용!
// delete 아이콘 클릭 시 section 삭제

// querySelector vs getElementByTagName

// 아 일일이 class 주는거 귀찮은데 그냥 querySelector 쓰고 그냥 main>section>button 이렇게 쓰면 안되나?
const $add_btn = document.querySelector("header > button"); // 투두 추가 버튼
const $main = document.querySelector("main"); // 생성한 투두(section)를 붙일 main


// todo 저장할 배열 생성
let todos = [];
console.log(todos);
// localStorage에 저장하는 함수
function saveLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// todo 처음 생성해서 배열에 저장하는 함수 -> 처음에 생성하면 무조건 checked 는 false
function add_todo(text) {
  console.log(text);
  console.log(todos); 
  if (todos === null) todos = [];
  todos.push({text, checked: false }) // 전역에 전역변수로 let todos = []; 이렇게 선언 및 초기화 해줬는데 왜 출력하면 null 이 나오지...?!?!
  console.log($main.children);
  console.log(Array.from($main.children));
  // localStorage에 저장하는 함수
  saveLocalStorage();
}

// todo 체크하면 호출되는 함수 -> 배열의 checked 를 true로 저장
function toggle_todo(section) {
  // 해당 인덱스가 main에서 몇번째 section 인지 확인 (Chat GPT의 힘을 빌림)
  const child_index = Array.from($main.children).indexOf(section);
  todos[child_index].checked = !todos[child_index].checked;
  saveLocalStorage();
}

function delete_todo(section) {
  console.log($main.children);
  const child_index = Array.from($main.children).indexOf(section);
  console.log(child_index);
  todos.splice(child_index, 1);
  saveLocalStorage();
}

function modify_todo(section, text) {
  const child_index = Array.from($main.children).indexOf(section);
  todos[child_index].text = text;
  saveLocalStorage();
}


// localStorage 에서 불러오기
todos = JSON.parse(localStorage.getItem('todos'));

$add_btn.addEventListener('click', () => {
  // 너무... 길다...?

  // 입력 받기
  const input = prompt('새로운 TODO를 입력하세요.');

  // 만약 input이 null(입력이 없다면)이면 해당 콜백함수 종료(prompt 입력 예외사항 확인)
  if ( input === null || input === '' ) return;

  // todos 배열에 추가
  add_todo(input);

  // 클릭하면 section 추가
  print(input, false);
});


// todos를 map으로 돌면서 todos의 요소마다 print 함수 호출하기
console.log(todos);
todos.map((todo) => print(todo.text, todo.checked));


// todos(localStorage에서 꺼내온 값)를 보고 출력
function print(text, checked) {
  // section 생성
  const $section = document.createElement('section');

  // section에 들어갈 내용 생성
  // div1: $section_check_name - checkbox, p
  const $section_check_name = document.createElement('div'); // checkbox랑 p태그 들어갈 div 생성
  $section_check_name.classList.add('section_check_name'); // 클래스 이름 주기

  // input: $checkbox
  const $checkbox = document.createElement('input'); // input 태그 생성 -> checkbox 속성 주기
  $checkbox.getAttribute('type');
  $checkbox.setAttribute('type', 'checkbox');

  // p
  const $p = document.createElement('p');
  $p.textContent = text;

  // section_check_name에 checkbox, p 연결
  $section_check_name.appendChild($checkbox);
  $section_check_name.appendChild($p);


  // div2: section_icons - img 2개
  const $section_icons = document.createElement('div');
  const $icon_write = document.createElement('img');
  const $icon_delete = document.createElement('img');

  // div에 section_icons라는 className 주기
  $section_icons.classList.add('section_icons');

  // img에 각각 src 연결하기
  $icon_write.getAttribute('src');
  $icon_delete.getAttribute('src');

  $icon_write.setAttribute('src', 'assets/icons/pencil.svg');
  $icon_delete.setAttribute('src', 'assets/icons/delete.svg');

  // write icon 눌렀을 때
  $icon_write.addEventListener('click', () => {
    // prompt 창 열어서 입력 다시 받기
    const input = $p.textContent;
    let modify = prompt('TODO 수정하기', input);

    // prompt 입력 예외사항 확인
    if (modify === null || modify === '') modify = input;

    // 입력 재할당
    $p.textContent = modify;
    modify_todo($section, modify);
  })

  // delete icon 눌렀을 떄 -> 해당 section 삭제
  $icon_delete.addEventListener('click', () => {
    // 해당 section과 main의 연결 끊기
    delete_todo($section);
    $main.removeChild($section);
  })

  // img 각각 section_icons에 연결
  $section_icons.appendChild($icon_write);
  $section_icons.appendChild($icon_delete);

  // section에 section_check_name, section_icons 붙이기
  $section.appendChild($section_check_name);
  $section.appendChild($section_icons);

  // 일단 붙여보자
  $main.appendChild($section);
}