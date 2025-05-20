import TopNavBar from "@/components/TopNavBar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
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
                    <span className="text-lg text-left font-semibold before:content-[''] after:animate-dots w-20">
                        Loading
                    </span>
                </div>
            </div>
        );
    }

    if (auth.error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center">
                    <div>Encountering error</div>
                    <div>{auth.error.message}</div>
                </div>
            </div>
        );
    }

    if (auth.isAuthenticated) {
        return (
            <main className="p-2 overflow-y-scroll min-h-screen">
                <TopNavBar />
                <Outlet />
            </main>
        );
    }

    // If not authenticated, show login button and redirect
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Welcome to FinTime</h1>
                <p>Please log in to continue</p>
                <button
                    onClick={() => void auth.signinRedirect()}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    Log In
                </button>
            </div>
        </div>
    );
}
