import { Link } from "@tanstack/react-router";
import { BarChart3, Calendar, PieChart, Settings, User } from "lucide-react";
import { useAuth } from "react-oidc-context";

export default function TopNavBar() {
    const navItems = [
        { to: "/", label: "Daily", icon: <Calendar className="h-5 w-5" /> },
        {
            to: "/monthly",
            label: "Monthly",
            icon: <BarChart3 className="h-5 w-5" />,
        },
        {
            to: "/categories",
            label: "Categories",
            icon: <PieChart className="h-5 w-5" />,
        },
        {
            to: "/profile",
            label: "Profile",
            icon: <User className="h-5 w-5" />,
        },
        {
            to: "/settings",
            label: "Settings",
            icon: <Settings className="h-5 w-5" />,
        },
    ];

    const auth = useAuth();

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {navItems.map((item) => {
                return (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors bg-muted/60 text-muted-foreground hover:bg-muted"
                        activeProps={{
                            className:
                                "bg-primary text-primary-foreground hover:bg-primary",
                        }}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                );
            })}

            <button
                onClick={() => void auth.removeUser()}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md transition-colors bg-muted/60 text-muted-foreground hover:bg-muted"
            >
                Logout
            </button>
        </div>
    );
}
