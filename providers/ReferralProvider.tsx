import { updateRefer } from "@/lib/refer";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const ReferralProvider = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const { data: session } = useSession();
  const user = session?.user as User;
  const router = useRouter();

  useEffect(() => {
    if (!ref || !user) {
      return;
    }
    if (user && user?.referredById) {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete("ref");
      router.replace(`/?${nextSearchParams}`);
      return;
    }
    if (ref && !!user && !user.referredById && ref !== user?.referralCode) {
      updateRefer(ref).then((res) => {
        if (res) {
          const nextSearchParams = new URLSearchParams(searchParams.toString());
          nextSearchParams.delete("ref");
          router.replace(`/?${nextSearchParams}`);
        }
      });
    }
  }, [ref, user?.id]);

  return <>{children}</>;
};

export default ReferralProvider;
