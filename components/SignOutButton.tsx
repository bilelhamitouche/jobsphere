import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

function SignOutButton() {
  return (
    <Button variant="ghost" size="sm" onClick={() => authClient.signOut()}>
      Sign Out
    </Button>
  );
}

export default SignOutButton;
