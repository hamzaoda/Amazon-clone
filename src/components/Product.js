import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/outline";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;
function Product({ id, title, price, description, category, image }) {
    const dispatch = useDispatch();
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    const [hasPrime] = useState(Math.random() < 0.5);
    const addItemToBasket = () => {
        const Product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime,
        };
        //sending the product as an action to the redux store ... the basket slice
        dispatch(addToBasket(Product))
    };
    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">
                {category}
            </p>
            <Image src={image} height={200} width={200} objectFit="contain" />
            <h4 className="my-3">{title}</h4>
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                <Currency quantity={price} currency="GBP" />
            </div>
            {hasPrime && (
                <div className="flex items-center space-x-2 -m-5 ml-0">
                    <img
                        className="w-12"
                        src="https://res.cloudinary.com/djqayi7cr/image/upload/v1689143369/5f7f75fa3dd424000436e50e_zhdsv9.png"
                        alt=""
                    />
                    <p className="text-xs text-gray-500">
                        Free Next-day Delivery
                    </p>
                </div>
            )}
            <button onClick={addItemToBasket} className="mt-auto button">
                Add to Basket
            </button>
        </div>
    );
}

export default Product;
Product;
