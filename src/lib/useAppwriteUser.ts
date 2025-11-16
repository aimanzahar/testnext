"use client";

import { useEffect, useState, useTransition } from "react";
import { getBrowserAppwrite } from "@/lib/appwriteClient";

export type AppwriteUser = {
  $id: string;
  name?: string;
  email?: string;
};

export function useAppwriteUser() {
  const appwrite = getBrowserAppwrite();
  const account = appwrite?.account;
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (!account) {
      setLoading(false);
      return;
    }
    account
      .get()
      .then((u) => {
        if (mounted) setUser(u);
      })
      .catch(() => {
        if (mounted) setUser(null);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [account]);

  const logout = () => {
    if (!account) return;
    startTransition(async () => {
      try {
        await account.deleteSession("current");
      } finally {
        setUser(null);
      }
    });
  };

  return { user, loading, logout, isPending };
}
