import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Calendar,
    BarChart3,
    PieChart,
    User,
    CreditCard,
    Settings,
    Menu,
    LogOut,
} from "lucide-react";

export default function NavBar() {
    const mainNavItems = [
        { href: "/", label: "Daily", icon: <Calendar className="h-5 w-5" /> },
        {
            href: "/monthly",
            label: "Monthly",
            icon: <BarChart3 className="h-5 w-5" />,
        },
        {
            href: "/categories",
            label: "Categories",
            icon: <PieChart className="h-5 w-5" />,
        },
    ];

    const userNavItems = [
        {
            href: "/profile",
            label: "Profile",
            icon: <User className="h-5 w-5" />,
        },
        {
            href: "/billing",
            label: "Billing",
            icon: <CreditCard className="h-5 w-5" />,
        },
        {
            href: "/settings",
            label: "Settings",
            icon: <Settings className="h-5 w-5" />,
        },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between w-full p-2">
                <nav className="hidden md:flex items-center space-x-1">
                    {mainNavItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm hover:bg-muted"
                            activeProps={{
                                className:
                                    "bg-primary text-primary-foreground hover:bg-primary",
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="md:hidden mr-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">App menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {mainNavItems.map((item) => (
                                <DropdownMenuItem key={item.href} asChild>
                                    <Link
                                        to={item.href}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <User className="h-5 w-5" />
                                <span className="sr-only">User menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-0.5">
                                    <p className="text-sm font-medium">
                                        John Doe
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        john.doe@example.com
                                    </p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            {userNavItems.map((item) => (
                                <DropdownMenuItem key={item.href} asChild>
                                    <Link
                                        to={item.href}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <LogOut className="h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
