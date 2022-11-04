// наблюдаем за изменениями в дом
// если изменения произошли, запускаем функцию
export default function changeThemePost() {
    const root = document.querySelector('.js-root');

    let observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {

            for (let node of mutation.addedNodes) {
                if (!(node instanceof HTMLElement)) continue;

                change();
            }

        }
    });

    observer.observe(root, { childList: true, subtree: true });
}

// если уже есть отмеченные чекбоксы, меняем класс
// при клике на чекбокс удаляем/добавляем класс смены темы поста
function change() {
    const checkboxes = document.querySelectorAll('.js-changeTheme');

    if (checkboxes.length === 0) return;

    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            checkbox.parentNode.parentNode.classList.add('post--black');
        }
        
        checkbox.addEventListener('click', () => {
            checkbox.parentNode.parentNode.classList.toggle('post--black');
        });
    }
}