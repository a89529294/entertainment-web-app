import { useEffect, useState } from "react";

export function useUserId() {
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    setUserId(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("userId="))
        ?.split("=")[1]
    );
  }, []);

  return userId;
}
