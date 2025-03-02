import { NextAuthOptions } from "next-auth";
import { dbConnect } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

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

            try {
                await dbConnect();

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("No user found with this email");
                }


                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                  );

                  if (!isValid) {
                    throw new Error("Invalid password");
                  }

                  return {
                    id: user._id.toString(),
                    email: user.email,
                  };

            } catch (error) {
                throw error
            }
        }
       })
   ],
   callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
          }
          return token;
    },
    async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string;
          }
          return session;
        
    },
  },
}