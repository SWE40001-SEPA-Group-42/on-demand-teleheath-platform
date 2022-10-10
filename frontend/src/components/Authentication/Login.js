import Userfront from "@userfront/react";
import { Box } from "@chakra-ui/react"

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);


const LoginForm = Userfront.build({
    toolId: process.env.REACT_APP_USERFRONT_LOGIN
  });

function Login() {
    return (
        <Box mt="100px">
            <LoginForm/>
        </Box>
    )
}

export default Login;