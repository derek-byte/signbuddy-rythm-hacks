import authMiddleware from "next-auth/middleware";

export default function proxy(request) {
    return authMiddleware(request);
}

export const config = {
    matcher: ["/profile", "/sign"]
};
