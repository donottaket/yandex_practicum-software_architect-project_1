import React, {lazy, Suspense} from 'react';

import "../index.css";

export default function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
    return (
        <main className="content">
            <section className="profile page__section">
                <Suspense fallback={<div>Loading...</div>}>
                    <ProfileHeader
                        onEditAvatar={onEditAvatar}
                        onEditProfile={onEditProfile}
                        onAddPlace={onAddPlace}
                    />
                </Suspense>
            </section>
            <section className="places page__section">
                <ul className="places__list">
                    <Suspense fallback={<div>Loading...</div>}>
                        {cards.map((card) => (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        ))}
                    </Suspense>
                </ul>
            </section>
        </main>
    );
}

const Card = lazy(() => import('card/Card')
    .catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);

const ProfileHeader = lazy(() => import('profile/ProfileHeader')
    .catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);