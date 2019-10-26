/*
 * Если уж решил делать полноценными константами, то надо доводить дело до конца.
 * LINK_REGEX = ...
 * NOT_SPACE_REGEX
 */
const link_REGEX = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
/*
 * Эту регулярку можно написать проще (и логичнее): ^[^\s]+$
 */
const isNotSpace = /^[0-9a-zA-Zа-яА-Я]/;

/**
 * Немного об именовании. 
 * Методы именуются так, чтобы в названии был глагол. В данном случае,
 * будет лучше назвать так: activateButton(button)
 */
function buttonActive(buttonForm) {//Активация кнопки формы
    buttonForm.classList.add("popup__button_is-active")
    buttonForm.removeAttribute('disabled');
}
/**
 * Здесь то же самое.
 */
function buttonInactive(buttonForm) {//дезактивация кнопки формы
    buttonForm.setAttribute('disabled', true);      
    buttonForm.classList.remove("popup__button_is-active");
}

function getButton(event) { //получение ссылки на кнопку из event
    const thisForm = event.target.closest(".popup__content");
    const buttonForm = thisForm.querySelector('.button');
    return buttonForm;
}

/**
 * Есть замечательная функция trim()
 * 
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
 */
function deleteSpace(input) {
    while (input.value.indexOf(" ")===0){
        input.value=input.value.slice(1);
    }
}

/**
 * Неплохая попытка, но советую подумать над более понятным именованием
 */
function errorElement(input) {
    const element = input.closest(".popup__form").querySelector(`#error-${input.name}`);
    function show() {
        element.classList.add("input-container__invalid");
    }
    function hide() {
        element.classList.remove("input-container__invalid");
    }
    function text(string) {
        element.textContent = `${string}`;
    }
    return {
        show,
        hide,
        text
    };
}

function checkName (input){
    const err = errorElement(input);
    err.hide();
    const length = input.value.length;
    deleteSpace(input);
    function only30Symbol () {
        err.hide();
    }
    if (!length) {
        err.show();
        err.text("Это обязательное поле");
        return false;
    } else if (length===1 || length>30) {
        err.show();
        err.text("Должно быть от 2 до 30 символов");
        if (length > 30) { 
            input.value=input.value.slice(0,30);
            window.setTimeout(only30Symbol, 2000); 
            return true;
        }
        return false;
    }
    return true;
}

function checkLink (input){
    const err = errorElement(input);
    err.hide();
    const length = input.value.length;
    deleteSpace(input);
    if (!length) {
        err.show();
        err.text("Это обязательное поле");
        return false;
    } else if (!input.value.match(link_REGEX)) {
        err.show();
        err.text("Здесь должна быть ссылка");
        return false;
    }
    return true;
}

function isValidFormAdd(event) {
    if (event.target.name === "name") {
        /**
         * Давай напишем аккуратнее:
         * 
         * if (!checkName || !checkLink) {
         *   return false;
         * }
         * return true;
         * 
         * Дальше по аналогии
         */
        if (!checkName(event.target)) {
            return false;
        } else if (!checkLink(form.link)) {
            return false;
        }else return true;
    } 
    if (event.target.name === "link") {
        if (!checkLink(event.target)) {
            return false;
        } else if (!checkName(form.name)) {
            return false;
        }else return true;
    }
}

function isValidFormEdit(event) {
    if (event.target.name === "name") {
        // И здесь как выше
        if (!checkName(event.target)) {
            return false;
        } else if (!checkName(form.job)) {
            return false;
        }else return true;
    } 
    if (event.target.name === "job") {
        if (!checkName(event.target)) {
            return false;
        } else if (!checkName(form.name)) {
            return false;
        }else return true;
    }
}

function inputToFormAdd(event) {
    if (isValidFormAdd(event)) {
        buttonActive(getButton(event));
    } else {
        buttonInactive(getButton(event));
    }
}

function inputToFormEdit(event) {
    if (isValidFormEdit(event)) {
        buttonActive(getButton(event));
    } else {
        buttonInactive(getButton(event));
    }
}

