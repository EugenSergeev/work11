// var initialCards = [
//     {
//       name: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//       name: 'Архыз',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//       name: 'Челябинская область',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//       name: 'Иваново',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//       name: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//       name: 'Холмогорский район',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//       name: 'Байкал',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     },
//     {
//       name: 'Нургуш',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
//     },
//     {
//       name: 'Тулиновка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
//     },
//     {
//       name: 'Остров Желтухина',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
//     },
//     {
//       name: 'Владивосток',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
//      }
//   ];// массив карточек

popupNew = `
<div id="popupNew" class="popup">
   <div class="popup__content">
      <img id="popupNewClose" src="./images/close.svg" alt="" class="popup__close">
       <h3 class="popup__title">Новое место</h3>
       <form class="popup__form" name="new">
          <input type="text" name="name" required class="popup__input popup__input_type_name" placeholder="Название">
          <span id="error-name" class="error-message">Ошибка</span>
          <input type="text" name="link" required class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку">
             <span id="error-link" class="error-message">Ошибка</span>
           <button  class="button popup__button popup__button_new" disabled = "true">+</button>
       </form>
   </div>
</div>`;
popupEdit = `
<div id="editProfile" class="popup">
    <div class="popup__content">
       <img id="popupEditClose"  src="./images/close.svg" alt="" class="popup__close">
       <h3 class="popup__title">Редактировать профиль</h3>
       <form class="popup__form" name="edit">
           <input type="text" name="name" required class="popup__input " placeholder="Имя">
           <span id="error-name" class="error-message">Ошибка</span>
          <input type="text" name="job" required class="popup__input " placeholder="О себе">
           <span id="error-job" class="error-message">Ошибка</span>
           <button  class="button popup__button popup__button_edit popup__button_is-active" >Сохранить</button>
       </form>
   </div>
</div> `;
popupChangeAvatar = `
<div id="changeAvatar" class="popup">
    <div class="popup__content">
        <img id="popupChangeAvatarClose"  src="./images/close.svg" alt="" class="popup__close">
        <h3 class="popup__title">Обновить аватар</h3>
        <form class="popup__form" name="formChangeAvatar">
            <input type="text" name="link" required class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку">
            <span id="error-link" class="error-message">Ошибка</span>
            <button  class="button popup__button popup__button_edit popup__button_is-active" >Сохранить</button>
        </form>
    </div>
</div> `;
  //