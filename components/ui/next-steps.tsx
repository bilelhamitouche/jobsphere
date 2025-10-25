import Link from "next/link";
import { Button } from "./button";

function NextSteps() {
  return (
    <section className="p-12 space-y-4 text-center bg-primary text-primary-foreground">
      <h2 className="text-3xl font-bold">
        Ready to Take the Next Step in Your Career?
      </h2>
      <p className="mx-auto max-w-xl">
        Create your account now to unlock personalized job recommendations and
        get notified about new opportunities.
      </p>
      <div className="space-x-4">
        <Button
          variant="secondary"
          asChild
        >
          <Link href="/signup">Create an account</Link>
        </Button>
        <Button
          variant="secondary"
          asChild
        >
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    </section>
  );
}

export default NextSteps;
