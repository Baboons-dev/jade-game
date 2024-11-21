import { signIn, signOut } from "next-auth/react";

const useUser = () => {
  const login = async (telegram_user: any, tgId: string) => {
    if (telegram_user?.id) {
      try {
        console.log("trying signin", telegram_user, tgId);
        await signIn("credentials", {
          redirect: false,
          tgId: tgId,
          telegramId: telegram_user.id.toString(),
          firstName: telegram_user.first_name
            ? telegram_user.first_name
            : telegram_user.id,
        });
      } catch (e) {
        console.log("error login", e);
      }
    }
  };

  const logout = () => {
    signOut({
      callbackUrl: "/",
    });
    console.log("logout");
  };

  return {
    login,
    logout,
  };
};

export default useUser;
