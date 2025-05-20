import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider, useAuth, type AuthProviderProps } from "react-oidc-context";

const cognitoAuthConfig: AuthProviderProps = {
    authority: import.meta.env.VITE_COGNITO_AUTHORITY || "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_uJaRZQYa8",
    client_id: import.meta.env.VITE_COGNITO_CLIENT_ID || "48m6b7luu2i9c0dkq59tt0r49v",
    // redirect_uri: "http://localhost:5173/",
    redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI || "https://app.fintime.vberkoz.com/",
    response_type: "code",
    scope: "aws.cognito.signin.user.admin email openid phone profile",
};

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
    routeTree,
    context: {
        queryClient,
    },
    defaultPreload: "intent",
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const InnerApp = () => {
    const auth = useAuth();
    return <RouterProvider router={router} context={{ auth }} />;
}

const App = () => {
    return (
        <AuthProvider {...cognitoAuthConfig}>
            <QueryClientProvider client={queryClient}>
                <InnerApp />
            </QueryClientProvider>
        </AuthProvider>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
