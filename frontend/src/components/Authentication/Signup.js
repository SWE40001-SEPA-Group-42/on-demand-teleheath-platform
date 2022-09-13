import Userfront from "@userfront/react";

Userfront.init("xbrr9qdb");

const SignupForm = Userfront.build({
    toolId: "kbmknn"
  });

function Signup() {
    return (
        <>
            <h2>Hi there</h2>
            <SignupForm/>
        </>
    )
}

export default Signup;