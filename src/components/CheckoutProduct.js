import { StarIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import {useDispatch}  from "react-redux";

function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
}) {
  const dispatch = useDispatch();
 
  const addItemToBasket = ()=>{
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(addItemToBasket(product))
  }
  const removItemFromBasket = ()=> {
    dispatch(removeFromBasket({ id }));
  }
    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit="contain" />
            {/* Middle */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500" />
                        ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} currency="GBP" />

                {hasPrime && ( 
                <div className="flex items-center space-x-2">
                  <img src="https://res.cloudinary.com/djqayi7cr/image/upload/v1689143369/5f7f75fa3dd424000436e50e_zhdsv9.png" alt="has Prime"  className="w-12" loading="lazy"/>
                  <p className="text-xs text-gray-500">Free Next-day Delivery</p>
                </div> 
                )}
            </div>
            {/* Right add/remove button */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end"> 
            <button className="button mt-auto " onClick={addItemToBasket}>Add To Basket</button>
            <button className="button mt-auto " onClick={removItemFromBasket}>Remove From Basket</button>
            </div>
        </div>
    );
}

export default CheckoutProduct;
