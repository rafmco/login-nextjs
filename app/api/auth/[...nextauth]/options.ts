import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: {
          label: "",
          type: "password",
          placeholder: "Senha",
        },
      },
      // Get Data from database
      // Retrieve credentials from user tables
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://authjs.dev/getting-started/authentication/credentials#credentials-provider
        const user = {
          id: "1",
          email: "rafael@dev",
          name: "Rafael Machado",
          password: "nextauth",
        };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          // return user object with the their profile data
          return user;
        } else {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
