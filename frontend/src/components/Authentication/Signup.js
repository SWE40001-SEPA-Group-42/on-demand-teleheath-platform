import Userfront from "@userfront/react";
import { Box } from "@chakra-ui/react"


Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

const SignupForm = Userfront.build({
    toolId: process.env.REACT_APP_USERFRONT_SIGNUP
  });

function Signup() {
    return (
        <Box mt="100px" >
            <SignupForm/>
        </Box>
    )
}

export default Signup;