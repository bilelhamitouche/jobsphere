import Logo from "@/components/ui/logo";
import SignUpForm from "./components/SignUpForm";

function SignUp() {
  return (
    <div className="flex flex-col gap-8 items-center py-20 h-full">
      <Logo />
      <SignUpForm />
    </div>
  );
}

export default SignUp;
