import React, { useState } from "react";
import LayoutDashboard from "../layout/LayoutDashboard";

const GlobalSettingPage = () => {
    const [billingCycle, setBillingCycle] = useState("Monthly");
    const [selectedFaq, setSelectedFaq] = useState(null);

    const plans = [
        {
            id: 1,
            name: "Basic Plan",
            price: billingCycle === "Monthly" ? "$12/month" : "$120/year",
            features: [
                "Free Domain",
                "Google Ads Credit",
                "Up to 5 Users",
                "Free SSL Security",
                "Up to 100 Products",
            ],
            extraFeatures: [
                "Chat Inbox",
                "Unlimited Storage",
                "No Transaction Fee",
            ],
        },
        {
            id: 2,
            name: "Professional",
            price: billingCycle === "Monthly" ? "$20/month" : "$200/year",
            features: [
                "Free Domain",
                "Google Ads Credit",
                "Up to 5 Users",
                "Free SSL Security",
                "Up to 100 Products",
                "Chat Inbox",
            ],
            extraFeatures: [
                "Unlimited Storage",
                "No Transaction Fee",
            ],
            recommended: true,
        },
        {
            id: 3,
            name: "Business",
            price: billingCycle === "Monthly" ? "$45/month" : "$450/year",
            features: [
                "Free Domain",
                "Google Ads Credit",
                "Up to 5 Users",
                "Free SSL Security",
                "Up to 100 Products",
                "Chat Inbox",
                "Unlimited Storage",
                "No Transaction Fee",
            ],
        },
    ];

    const faqs = [
        {
            id: 1,
            question: "Is there any discount for yearly subscription?",
            answer: "Yes, you save 20% by choosing the annual billing cycle instead of monthly.",
        },
        {
            id: 2,
            question: "Can I change my current plan?",
            answer: "Yes, you can upgrade or downgrade your plan anytime through your account settings.",
        },
        {
            id: 3,
            question: "How do I cancel a subscription?",
            answer: "You can cancel or change your subscription at any time without any additional charges. If you want to cancel your subscription go to your profile page and click on billing information.",
        },
        {
            id: 4,
            question: "How to purchase a domain?",
            answer: "To purchase a domain, navigate to the Domains section in your dashboard and follow the steps provided.",
        },
    ];

    return (
        <LayoutDashboard>
            <div className="p-6 mx-auto w-full overflow-y-auto">
                {/* Pricing Plans */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Choose a Plan</h1>
                    <p className="text-center text-gray-600 mb-6">
                        Familiarize yourself with the payment plans below. Pick the best pricing plan to fit your needs.
                    </p>

                    {/* Billing Cycle Toggle */}
                    <div className="flex justify-center space-x-4 mb-8">
                        <button
                            className={`px-4 py-2 border rounded ${billingCycle === "Monthly" ? "bg-blue-500 text-white" : "bg-white text-gray-700 border-gray-300"}`}
                            onClick={() => setBillingCycle("Monthly")}
                        >
                            Bill Monthly
                        </button>
                        <button
                            className={`px-4 py-2 border rounded ${billingCycle === "Annually" ? "bg-blue-500 text-white" : "bg-white text-gray-700 border-gray-300"}`}
                            onClick={() => setBillingCycle("Annually")}
                        >
                            Bill Annually
                        </button>
                    </div>

                    {/* Plans */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {plans && plans.length > 0 && plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`p-6 border rounded-lg ${plan.recommended ? "border-blue-500" : "border-gray-300"} relative`}
                            >
                                {plan.recommended && (
                                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                        Recommended
                                    </span>
                                )}
                                <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
                                <p className="text-2xl font-bold mt-2">{plan.price}</p>
                                <ul className="mt-4 space-y-2">
                                    {plan.features && plan.features.length > 0 && plan.features.map((feature, index) => (
                                        <li key={index} className="text-gray-600 flex items-center space-x-2">
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="00 General / 01 Icons / 01 Actions / 03 Remove rounded">
<path id="color" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM14.9529 8.71077C15.334 8.32113 15.9612 8.322 16.3411 8.71269C16.7077 9.0896 16.7071 9.69001 16.3397 10.0662L10.544 16L7.65726 13.0318C7.29134 12.6556 7.29134 12.0565 7.65726 11.6803C8.0378 11.289 8.66623 11.2889 9.04685 11.6801L10.544 13.219L14.9529 8.71077Z" fill="#1FD286"/>
</g>
</svg>

                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                    {plan.extraFeatures && plan.extraFeatures.length > 0 && plan.extraFeatures.map((extra, index) => (
                                        <li key={index} className="text-gray-400 flex items-center space-x-2">
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="00 General / 01 Icons / 01 Actions / 03 Remove rounded">
<path id="color" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H16Z" fill="#7E84A3"/>
</g>
</svg>

                                            </span>
                                            <span>{extra}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full mt-4 py-2 ${plan.recommended ? "bg-[#1e5eff] text-white" : "bg-gray-100 text-gray-700 border border-gray-300" } rounded`}>
                                    Select Plan
                                </button>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-gray-600 mt-4">Cancel or upgrade your plan anytime</p>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs && faqs.length > 0 && faqs.map((faq) => (
                            <div key={faq.id} className="border rounded-lg p-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
                                >
                                    <h3 className="font-semibold">{faq.question}</h3>
                                    <span>{selectedFaq === faq.id ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Icon">
                                                <path id="color" fill-rule="evenodd" clip-rule="evenodd" d="M6.29289 9.29289C5.93241 9.65338 5.90468 10.2206 6.2097 10.6129L6.29289 10.7071L11.2929 15.7071C11.6534 16.0676 12.2206 16.0953 12.6129 15.7903L12.7071 15.7071L17.7071 10.7071C18.0976 10.3166 18.0976 9.68342 17.7071 9.29289C17.3466 8.93241 16.7794 8.90468 16.3871 9.2097L16.2929 9.29289L12 13.585L7.70711 9.29289C7.34662 8.93241 6.77939 8.90468 6.3871 9.2097L6.29289 9.29289Z" fill="#7E84A3"/>
                                            </g>
                                        </svg>
                                    ) : (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Icon">
                                                <path id="color" fill-rule="evenodd" clip-rule="evenodd" d="M6.29289 9.29289C5.93241 9.65338 5.90468 10.2206 6.2097 10.6129L6.29289 10.7071L11.2929 15.7071C11.6534 16.0676 12.2206 16.0953 12.6129 15.7903L12.7071 15.7071L17.7071 10.7071C18.0976 10.3166 18.0976 9.68342 17.7071 9.29289C17.3466 8.93241 16.7794 8.90468 16.3871 9.2097L16.2929 9.29289L12 13.585L7.70711 9.29289C7.34662 8.93241 6.77939 8.90468 6.3871 9.2097L6.29289 9.29289Z" fill="#7E84A3"/>
                                            </g>
                                        </svg>
                                    )}</span>
                                </div>
                                {selectedFaq === faq.id && (
                                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default GlobalSettingPage;
