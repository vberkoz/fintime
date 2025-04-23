
import { Link } from "@tanstack/react-router";
import { BarChart3, Calendar, PieChart, Settings, User } from "lucide-react";

export default function TopNavBar() {
    const navItems = [
        { to: "/", label: "Daily", icon: <Calendar className="h-5 w-5" /> },
        { to: "/monthly", label: "Monthly", icon: <BarChart3 className="h-5 w-5" /> },
        { to: "/categories", label: "Categories", icon: <PieChart className="h-5 w-5" /> },
        { to: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
        { to: "/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
    ]

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {navItems.map((item) => {
                return (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors bg-muted text-muted-foreground hover:bg-muted/80"
                        activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                )
            })}
        </div>
    );
}