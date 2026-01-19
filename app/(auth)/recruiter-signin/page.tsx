import Logo from "@/components/ui/logo";
import SignInForm from "./components/SignInForm";

export default function SignIn() {
  return (
    <div className="flex flex-col gap-8 items-center py-20 h-full">
      <Logo />
      <SignInForm />
    </div>
  );
}
