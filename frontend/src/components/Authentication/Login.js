import Userfront from "@userfront/react";
import { Box } from "@chakra-ui/react"
Userfront.init("xbrr9qdb");

const LoginForm = Userfront.build({
    toolId: "bkodro"
  });

function Login() {
    return (
        <Box mt="100px">
            <LoginForm/>
        </Box>
    )
}

export default Login;