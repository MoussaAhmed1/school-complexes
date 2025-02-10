import { ILogedUser } from "@/types/users";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // console.log('credentials',credentials?.username)
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API}auth/signin`, {
            method: "POST",
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const user:any = await res.json();
          if(user?.data?.role as any !== "SUPERVISOR"){
            return null;
          }
          else if (res.ok) {
            return user;
          
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }

        // If no error and we have user data, return it
        // Return null if user data could not be retrieved
      },
    }),
  ],

  callbacks: {
    async jwt({ user, token, trigger, session }: any) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token.username = user.data?.username;
        token.name = user.data?.name;
        token.email = user.data?.email;
        token.phone = user.data?.phone;
        token.gender = user.data?.gender;
        token.avatar = user.data?.avatar;
        token.image = user.data?.avatar;
        token.birth_date = user.data?.birth_date;
        token.id = user.data?.id;
        token.accessToken = user.data?.access_token;
        const lang = cookies().get("Language")?.value || cookies().get("lang")?.value||"ar";
        cookies().set("Language", lang , {path: "/"});
        cookies().set("access_token", user.data?.access_token, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

      }
      return token;
    },
    async session({ session, token, newSession }: any) {
      delete token?.accessToken; //remove session token
      session.user = { ...token };
      if (newSession) {
        session.user.name =
          newSession.data?.name;
        session.user.email = newSession.email;
        session.user.image = newSession.avatar;
        session.user.phone = newSession.phone;
        session.user.gender = newSession.gender;
        session.user.birth_date = newSession.birth_date;
      }
      return session;
    },
  },
  pages:{
    signIn:"/",
  }
};
