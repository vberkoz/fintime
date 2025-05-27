import { createLazyFileRoute } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, Check, CreditCard, Edit2 } from "lucide-react";
import { useState } from "react";

export const Route = createLazyFileRoute("/_auth/billing")({
    component: Billing,
});

function Billing() {
    const [paymentMethod] = useState({
        cardType: "Visa",
        lastFour: "4242",
        expiryDate: "12/25",
        billingAddress: "123 Main St, Anytown, CA 12345",
    });

    const [currentPlan, setCurrentPlan] = useState("premium");

    const plans = [
        {
            id: "free",
            name: "Free",
            price: "$0",
            period: "forever",
            features: [
                "Basic activity tracking",
                "Daily and monthly views",
                "Up to 50 activities per month",
            ],
            buttonText: "Current Plan",
            isPopular: false,
        },
        {
            id: "premium",
            name: "Premium",
            price: "$9.99",
            period: "per month",
            features: [
                "Unlimited activity tracking",
                "Advanced analytics",
                "Category insights",
                "Data export",
                "Priority support",
            ],
            buttonText: "Current Plan",
            isPopular: true,
        },
        {
            id: "team",
            name: "Team",
            price: "$49.99",
            period: "per month",
            features: [
                "Everything in Premium",
                "Up to 10 team members",
                "Team activity dashboard",
                "Role-based permissions",
                "Team analytics",
            ],
            buttonText: "Upgrade",
            isPopular: false,
        },
    ];

    const handleUpgrade = (planId: string) => {
        if (planId === currentPlan) return;
        setCurrentPlan(planId);
    };

    return (
        <div className="container mx-auto py-6 p-2 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Billing & Subscription</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your subscription and payment methods
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                        Manage your payment information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-muted rounded-md">
                                <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-medium">
                                    {paymentMethod.cardType} ending in{" "}
                                    {paymentMethod.lastFour}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Expires {paymentMethod.expiryDate}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {paymentMethod.billingAddress}
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h3 className="font-medium mb-2">Billing History</h3>
                        <div className="text-sm text-muted-foreground">
                            <p className="py-2 border-b">
                                May 1, 2023 - Premium Plan - $9.99
                            </p>
                            <p className="py-2 border-b">
                                Apr 1, 2023 - Premium Plan - $9.99
                            </p>
                            <p className="py-2 border-b">
                                Mar 1, 2023 - Premium Plan - $9.99
                            </p>
                        </div>
                        <Button variant="link" className="px-0 mt-2">
                            View all transactions
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Subscription Plans</CardTitle>
                    <CardDescription>
                        Choose the plan that works best for you
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <Card
                                key={plan.id}
                                className={`relative ${plan.isPopular ? "border-primary" : ""}`}
                            >
                                <CardContent className="pt-6 h-full">
                                    <div className="flex flex-col h-full">
                                    {plan.isPopular && (
                                        <Badge className="absolute top-2 right-2">
                                            Popular
                                        </Badge>
                                    )}
                                    <h3 className="text-lg font-bold">
                                        {plan.name}
                                    </h3>
                                    <div className="mt-2 mb-4">
                                        <span className="text-3xl font-bold">
                                            {plan.price}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {" "}
                                            {plan.period}
                                        </span>
                                    </div>

                                    <ul className="space-y-2 mb-6">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-center"
                                            >
                                                <Check className="h-4 w-4 mr-2 text-green-500" />
                                                <span className="text-sm">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="grow"></div>

                                    <Button
                                        className="w-full mt-auto"
                                        variant={
                                            currentPlan === plan.id
                                                ? "outline"
                                                : "default"
                                        }
                                        disabled={currentPlan === plan.id}
                                        onClick={() => handleUpgrade(plan.id)}
                                    >
                                        {currentPlan === plan.id
                                            ? "Current Plan"
                                            : plan.buttonText}
                                    </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
