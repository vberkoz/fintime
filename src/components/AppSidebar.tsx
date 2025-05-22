import { BarChart3, Calendar, PieChart } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import { Link } from "@tanstack/react-router";
import { useAuth } from "react-oidc-context";

const items = [
    {
        label: "Daily",
        to: "/",
        icon: <Calendar className="h-5 w-5" />,
    },
    {
        label: "Monthly",
        to: "/monthly",
        icon: <BarChart3 className="h-5 w-5" />,
    },
    {
        label: "Categories",
        to: "/categories",
        icon: <PieChart className="h-5 w-5" />,
    },
];

export function AppSidebar() {
    const auth = useAuth();
    const { setOpenMobile } = useSidebar();
    
    const data = {
        user: {
            name: auth!.user!.profile!.email!.split('@')[0],
            email: auth!.user!.profile!.email!,
            avatar: "/avatars/shadcn.jpg",
        },
    };
    
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            className="text-muted-foreground hover:bg-muted"
                                            activeProps={{
                                                className:
                                                    "bg-muted text-zinc-900",
                                            }}
                                            onClick={() => setOpenMobile(false)}
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
