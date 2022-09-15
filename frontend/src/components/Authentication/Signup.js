import Userfront from "@userfront/react";
import { Box } from "@chakra-ui/react"


Userfront.init("xbrr9qdb");

const SignupForm = Userfront.build({
    toolId: "kbmknn"
  });

function Signup() {
    return (
        <Box mt="100px" >
            <SignupForm/>
        </Box>
    )
}



export default Signup;