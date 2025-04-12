import React, {lazy} from "react";

import "../index.css";

export default function AddPlacePopup({isOpen, onAddPlace, onClose}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Новое место" name="new-card"
        >
            <label className="popup__label">
                <input type="text" name="name" id="place-name"
                       className="popup__input popup__input_type_card-name" placeholder="Название"
                       required minLength="1" maxLength="30" value={name} onChange={handleNameChange}/>
                <span className="popup__error" id="place-name-error"></span>
            </label>
            <label className="popup__label">
                <input type="url" name="link" id="place-link"
                       className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
                       required value={link} onChange={handleLinkChange}/>
                <span className="popup__error" id="place-link-error"></span>
            </label>
        </PopupWithForm>
    );
}

const PopupWithForm = lazy(() => import('common/PopupWithForm').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);