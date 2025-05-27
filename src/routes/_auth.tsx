import NavBar from "@/components/NavBar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useAuth } from "react-oidc-context";

export const Route = createFileRoute("/_auth")({
    component: AuthLayout,
});

function AuthLayout() {
    const auth = useAuth();

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
            <>
                <NavBar />
                <Outlet />
            </>
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
