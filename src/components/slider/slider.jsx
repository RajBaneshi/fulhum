import React, { useEffect } from 'react'
import './slider.css';

const Slider = () => {

    const itemList = [
        {
            id: 1,
            checked: false
        },
        {
            id: 2,
            checked: false
        },
        {
            id: 3,
            checked: false
        },
        {
            id: 4,
            checked: false
        },
        {
            id: 5,
            checked: false
        },

    ]

    useEffect(() => {
        const card1 = document.getElementById("item-1");
        const card2 = document.getElementById("item-2");
        const card3 = document.getElementById("item-3");
        const card4 = document.getElementById("item-4");
        const card5 = document.getElementById("item-5");

        const cards = [card1, card2, card3,
            card4, card5
        ];
        let currentIndex = 0;

        const checkNextCard = () => {
            cards[currentIndex].checked = true;
            currentIndex = (currentIndex + 1) % itemList.length;
        };

        checkNextCard();
        const intervalId = setInterval(checkNextCard, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className="container">

                {itemList.map((item, index) => {
                    return (
                        <input
                            key={index}
                            type="radio"
                            name="slider"
                            id={`item-${item.id}`}
                            className='card slider_button'
                            checked={item.checked}
                            readOnly
                        />
                    )
                })}


                <div className="cards">
                    {
                        itemList.map((item, index) => {
                            return (
                                <label key={index} className="card" htmlFor={`item-${item.id}`} id={`card-${item.id}`}>
                                    <img className='slider_img' src={`./${item.id}.png`} alt="song" />
                                </label>
                            );
                        })

                    }
                </div>
            </div>
        </>
    )
}

export default Slider