import Userfront from "@userfront/react";

Userfront.init("xbrr9qdb");

const LoginForm = Userfront.build({
    toolId: "bkodro"
  });

function Login() {
    return (
        <>
            <h2>This is a login form</h2>
            <LoginForm/>
        </>
    )
}

export default Login;