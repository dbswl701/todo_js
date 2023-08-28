// 새로운 todo 추가하기 클릭 시 (section)추가되어야함
// write 아이콘 클릭 시 수정할 수 있어야 함 -> text가 아니라 input으로 변경?
// delete 아이콘 클릭 시 section 삭제

// querySelector vs getElementByTagName

const $add_btn = document.querySelector("header > button"); // 투두 추가 버튼
const $main = document.querySelector("main"); // 생성한 투두(section)를 붙일 main

$add_btn.addEventListener('click', () => {

  // 입력 받기
  const input = prompt('새로운 TODO를 입력하세요.');


  // 클릭하면 section 추가

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
  $p.textContent=input;

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

  // img 각각 section_icons에 연결
  $section_icons.appendChild($icon_write);
  $section_icons.appendChild($icon_delete);

  // section에 section_check_name, section_icons 붙이기
  $section.appendChild($section_check_name);
  $section.appendChild($section_icons);

  // 일단 붙여보자
  $main.appendChild($section);
});

// 아 일일이 class 주는거 귀찮은데 그냥 querySelector 쓰고 그냥 main>section>button 이렇게 쓰면 안되나?