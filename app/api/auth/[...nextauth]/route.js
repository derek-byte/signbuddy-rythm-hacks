import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const email = credentials?.email?.trim().toLowerCase();
                const password = credentials?.password;
                if (!email || !password) return null;
                await startDb();

                const user = await UserModel.findOne({ email });
                if (!user) throw Error("email/password mismatch!");

                const passwordMatch = await user.comparePassword(password);
                if (!passwordMatch) throw Error("email/password mismatch!");

                return {
                    name: user.name,
                    email: user.email,
                    // id: user._id
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    }
    // debug: process.env.NODE_ENV === "development",
    // callbacks: {
    //     jwt({ token, user }) {
    //         console.log("1")
    //         if (user) {
    //             token.email = user.data.auth.email;
    //         }
    //         return token;
    //     }, 
    //     session({session, token}) {
    //         console.log("2")
    //         if (session.user) {
    //             session.user._id = token.id;
    //         }
    //         return session;
    //     }
    // }
});


export { handler as GET, handler as POST };
