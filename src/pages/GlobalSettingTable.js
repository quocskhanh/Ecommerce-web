import React, { useState } from "react";
import LayoutDashboard from "../layout/LayoutDashboard";

const GlobalSettingTable= () => {
    const [billingCycle, setBillingCycle] = useState("Monthly"); // Billing cycle toggle
    const [selectedFaq, setSelectedFaq] = useState(null); // FAQ accordion state

    // Pricing plans data
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
                "Chat Inbox",
            ],
            extraFeatures: [
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
            ],
            extraFeatures: [
                "Unlimited Storage",
                "No Transaction Fee",
            ],
        },
    ];

    // FAQ data
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
            answer: "You can cancel or change your subscription at any time without any additional charges. Go to your profile page and click on billing information to proceed.",
        },
        {
            id: 4,
            question: "How to purchase a domain?",
            answer: "To purchase a domain, navigate to the Domains section in your dashboard and follow the steps provided.",
        },
    ];

    return (

            <div className="p-6 max-w-5xl mx-auto">
                {/* Pricing Plans */}
                <div>
                    <h2 className="text-2xl font-bold text-center mb-4">Pricing Plans</h2>
                    <p className="text-center text-gray-600 mb-6">
                        Familiarize yourself with the payment plans below. Pick the best pricing plan to fit your needs.
                    </p>

                    {/* Billing Cycle Toggle */}
                    <div className="flex justify-center space-x-4 mb-8">
                        <button
                            className={`px-4 py-2 border rounded ${billingCycle === "Monthly" ? "bg-[#1e5eff] text-white" : "bg-white text-gray-700 border-gray-300"}`}
                            onClick={() => setBillingCycle("Monthly")}
                        >
                            Bill Monthly
                        </button>
                        <button
                            className={`px-4 py-2 border rounded ${billingCycle === "Annually" ? "bg-[#1e5eff] text-white" : "bg-white text-gray-700 border-gray-300"}`}
                            onClick={() => setBillingCycle("Annually")}
                        >
                            Bill Annually
                        </button>
                    </div>

                    {/* Plans */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`p-6 border rounded-lg ${plan.recommended ? "border-[#1e5eff]" : "border-gray-300"} relative`}
                            >
                                {plan.recommended && (
                                    <span className="absolute top-2 right-2 bg-[#1e5eff] text-white text-xs px-2 py-1 rounded">
                                        Recommended
                                    </span>
                                )}
                                <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
                                <p className="text-2xl font-bold mt-2">{plan.price}</p>
                                <ul className="mt-4 space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="text-gray-600 flex items-center space-x-2">
                                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                    {plan.extraFeatures.map((extra, index) => (
                                        <li key={index} className="text-gray-400 flex items-center space-x-2 ">
                                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</span>
                                            <span>{extra}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full mt-4 py-2 ${plan.recommended ? "bg-[#1e5eff] text-white" : "bg-gray-100 text-gray-700 border border-gray-300"} rounded`}>
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
                        {faqs.map((faq) => (
                            <div key={faq.id} className="border rounded-lg p-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() =>
                                        setSelectedFaq(selectedFaq === faq.id ? null : faq.id)
                                    }
                                >
                                    <h3 className="font-semibold">{faq.question}</h3>
                                    <span>
                                        {selectedFaq === faq.id ? "➖" : "➕"}
                                    </span>
                                </div>
                                {selectedFaq === faq.id && (
                                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    );
};

export default GlobalSettingTable;
