import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { useShoppingCart } from "use-shopping-cart";

export default function SuccessPage() {
    const { clearCart } = useShoppingCart()
    const router = useRouter();
    const sessionId = router.query.session_id
    const { data, error } = useSWR(() => (sessionId ? `/api/checkout-sessions/${sessionId}` : null), (url) => axios.get(url).then(res => res.data),
        {
            onSuccess() {
                clearCart();
            }
        }
    );
    const email = data?.customer_details?.email
    // const data = true;
    // const error = false;
    return (
        <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
            {error ? (
                <div className="p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto">
                    <p className="text-lg">Sorry, something went wrong!</p>
                    {console.log(error)}
                </div>
            ) : !data ? (
                <div className="p-2 rounded-md text-gray-500 max-w-md mx-auto">
                    <p className="text-lg">Loading...</p>
                </div>
            ) : (
                <div className="py-4 px-8 space-y-4 rounded-md max-w-lg mx-auto ">
                    <CheckCircleIcon className="w-24 h-24 mx-auto flex-shrink-0 text-lime-600" />
                    <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
                        Thanks for your order!
                    </h2>
                    <p className="text-lg">
                        Check Your Email ({email}) for your invoice.
                    </p>
                </div>
            )}
        </div>
    )
}