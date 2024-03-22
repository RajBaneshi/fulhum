import React, { useEffect, useState } from 'react';
import './carousel.css'
import { Link } from 'react-router-dom';

const CarouselSection = () => {

    const [currentIndex, setCheckedIndex] = useState(0);
    const [itemList, setItemList] = useState([
        {
            id: 0,
            checked: false
        },
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
        }

    ]);

    useEffect(() => {
        // console.log("HEllo")
    }, [currentIndex, itemList])


    // Thumbnail image controls
    function currentSlide(n) {
        // console.log("HEllo")
        setCheckedIndex(n);
    }


    function checkNextCard() {
        // console.log(currentIndex, (currentIndex + 1) % itemList.length)
        setCheckedIndex((currentIndex + 1 > itemList.length - 1) ? 0 : currentIndex + 1);
    };
    function checkPreviousCard() {
        // console.log(currentIndex, (currentIndex - 1) % itemList.length)
        setCheckedIndex((currentIndex - 1 < 0) ? itemList.length - 1 : currentIndex - 1);

    };


    return (
        <div>
            <div className="flex items-center">
                <a className={`prev `}


                    onClick={checkPreviousCard}>&#10094;</a>
                {
                    itemList.map((item, index) => {
                        return (
                            <Link to={'/player'} key={index}>
                                <div className="fade flex" key={index}
                                    style={{
                                        display: `${(currentIndex == index) ? "block" : "none"}`
                                    }}
                                >
                                    <img
                                        src={`/carousel/${item.id + 1}.png`}
                                        alt="NONE"
                                        className='w-full h-full'
                                    />
                                </div>
                            </Link>
                        )
                    })
                }



                <a className={`next`} onClick={checkNextCard}>&#10095;</a>
            </div>
            <br />

            <div style={{ textAlign: "center" }}>
                {itemList.map((item, index) => {
                    <span key={index} className="dot" onClick={() => { currentSlide(index) }}></span>
                })}
            </div>
        </div>
    )
}

export default CarouselSection;