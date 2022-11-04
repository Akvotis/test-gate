// ждём выполнения запроса на сервер
// затем создаём шаблон поста и мапим данные запроса
// вставляем шаблон в дом
export default async function posts() {
    const data = await request();
    const template = createTemplate(data);
    const root = document.querySelector('.js-root');

    if (!root) return;

    root.insertAdjacentHTML('beforeend', template);
}

// делаем запрос на сервер
const request = () => {
    const data = fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7')
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error(err));

    return data;
}

const createTemplate = (posts) => {
    const template = `
        <div class="posts">
            ${posts.map(post => {
                return `
                    <div class="post">
                        <h3 class="post__title">${post.title}</h3>
                        <p class="post__text">${post.body}</p>
                        <label class="post__select">
                            <input type="checkbox" name="post_${post.id}" class="js-changeTheme" />
                            Select
                        </label>
                    </div>
                `
            }).join('')}
        </div>
    `;

    return template;
}

// получаем value фильтра и фильтруем данные запроса по value
// затем очищаем контейнер и вставляем отфильтрованные посты
// при сбросе очищаем контейнер и вставляем все посты
// также проверяем url параметры при загрузке страницы и если они есть, то применяем фильтр
export const filtering = async () => {
    const filter = document.querySelector('.js-filter');
    const resetBtn = filter.querySelector('.js-reset');
    const data = await request();
    const root = document.querySelector('.js-root');
    const urlSearch = document.location.search;

    let params = new URLSearchParams(urlSearch);
    let filtered;

    params = params.get('title');

    if(params) {
        const input = filter.querySelector('input');

        input.value = params;

        filtered = data.filter(post => {
            return post.title.includes(params);
        });

        const template = createTemplate(filtered);

        root.replaceChildren();
        root.insertAdjacentHTML('beforeend', template);
    }

    filter.addEventListener('submit', (e) => {
        e.preventDefault();

        const filterValue = e.target[0].value.trim();

        if(filterValue === '') return;

        filtered = data.filter(post => {
            return post.title.includes(filterValue);
        });

        const template = createTemplate(filtered);

        root.replaceChildren();
        root.insertAdjacentHTML('beforeend', template);

        saveValueOnURL(filterValue);
    });

    resetBtn.addEventListener('click', () => reset(root));
}

// соxраняем данные фильтра в адрессной строке
// если сбросили фильтр, то сбрасываем search параметры адрессной строки
const saveValueOnURL = (value, reset = false) => {
    if (reset) {
        window.history.pushState(
            {},
            '',
            `${document.location.origin}`
        )

        return;
    }

    window.history.pushState(
        {},
        '',
        `${document.location.origin}?title=${value}`
    )
}

const reset = (container) => {
    container.replaceChildren();
    posts();
    saveValueOnURL(null, true);
}