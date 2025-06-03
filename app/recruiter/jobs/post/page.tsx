import PostJobForm from "./components/PostJobForm";

export default function PostJob() {
  return (
    <div className="p-8 space-y-4 w-full h-full">
      <h2 className="text-3xl font-semibold">Post Job</h2>
      <PostJobForm />
    </div>
  );
}
