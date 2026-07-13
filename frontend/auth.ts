import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.FASTAPI_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          return {
            id: data.id,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  // TODO: Callbacks
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        const payload = {
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          email: user.email,
          first_name: profile?.given_name ?? user.name?.split(" ")[0] ?? "",
          last_name: profile?.family_name ?? user.name?.split(" ")[1] ?? "",
          provider_access_token: account.access_token,
        };

        // TODO: replace with real fetch to FastAPI /auth/oauth once it's built
        console.log(
          `[signIn:${account.provider}] payload for FastAPI:`,
          payload,
        );
      }

      return true;
    },
  },
});
