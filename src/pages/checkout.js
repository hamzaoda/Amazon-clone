import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromis = loadStripe(process.env.stripe_public_key);

function checkout() {
    const items = useSelector(selectItems);
    const { data: session, status } = useSession();
    const total = useSelector(selectTotal);
    const createCheckouSession = async () => {
        const stripe = await stripePromis;
        const checkoutSession = await axios.post(
            "/api/create-checkout-session",
            {
                items,
                email: session.user.email,
            }
        );
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });
        if (result.error) {
            alert(result.error.message);
        }
    };
    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0
                                ? "Your Amazon Basket is Empty"
                                : "Your Amazon Basket"}
                        </h1>
                        {items.map(
                            (
                                {
                                    id,
                                    title,
                                    price,
                                    rating,
                                    description,
                                    category,
                                    image,
                                    hasPrime,
                                },
                                i
                            ) => (
                                <div>
                                    <CheckoutProduct
                                        key={i}
                                        id={id}
                                        title={title}
                                        price={price}
                                        rating={rating}
                                        description={description}
                                        category={category}
                                        image={image}
                                        hasPrime={hasPrime}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
                {/* Right */}
                <div className="felx flex-col bg-white p-10 shadow-md ">
                    {items.length > 0 && (
                        <div className="whitespace-nowrap">
                            <h2>
                                Subtotal ({items.length} items) :{" "}
                                <span className="font-bold">
                                    <Currency quantity={total} currency="GBP" />
                                </span>
                            </h2>
                            <button
                                onClick={createCheckouSession}
                                role="link"
                                disabled={!session}
                                className={`button mt-2 ${
                                    !session &&
                                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                                }`}
                            >
                                {!session
                                    ? "Sign in to Checkout"
                                    : "Proceed to Checkout"}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default checkout;
