import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
   providers: [
       CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email", },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials.email || !credentials.password) {
                throw new Error("Please provide email and password");
            }
        }
       })
   ]
}