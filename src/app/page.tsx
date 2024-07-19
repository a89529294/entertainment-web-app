import { lucia, validateRequest } from "@/lib/auth";
import { Form, type ActionResult } from "@/components/auth/form";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserElseRedirectToLogin } from "@/components/auth/get-user-else-redirect-to-login";
import { MyButton } from "@/components/common/my-button";

export default async function Page() {
  const user = await getUserElseRedirectToLogin();

  return (
    <div className="grid place-items-center absolute inset-0">
      <div className="flex flex-col items-center gap-6">
        <p className="text-medium-grey font-bold text-lg px-10 text-center">
          You don&apos;t have a board yet. Create a new board to get started.
        </p>
        <MyButton variant="primary">+Add New Board</MyButton>
      </div>
    </div>
  );
}

{
  /*  <>
 <h1>Hi, {user.username}!</h1>
<p>Your user ID is {user.id}.</p>
<Form action={logout}>
  <button>Sign out</button>
</Form>
</> */
}

async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
}
