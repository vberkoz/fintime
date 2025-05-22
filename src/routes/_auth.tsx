import { AppSidebar } from "@/components/AppSidebar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useAuth } from "react-oidc-context";

export const Route = createFileRoute("/_auth")({
    component: AuthLayout,
});

function AuthLayout() {
    const auth = useAuth();
    const location = useLocation();

    if (auth.isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center">
                    <span className="flex text-lg text-left font-semibold items-center">
                        Please wait
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </span>
                </div>
            </div>
        );
    }

    if (auth.isAuthenticated) {
        return (
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="p-2">
                    <div className="flex">
                        <SidebarTrigger className="mb-2 mr-2" />
                        {(() => {
                            switch (location.href) {
                                case "/monthly":
                                    return <div className="pt-0.5">Monthly</div>;
                                case "/categories":
                                    return <div className="pt-0.5">Categories</div>;
                                default:
                                    return <div className="pt-0.5">Daily Activities</div>;
                            }
                        })()}
                    </div>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        );
    }

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>You are logged out</AlertDialogTitle>
                    <AlertDialogDescription>
                        You need to be logged in to view requested page. Please
                        click login before continuing.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => auth.signinRedirect()}>
                        Login
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
