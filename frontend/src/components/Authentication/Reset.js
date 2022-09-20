import Userfront from "@userfront/react";
import { Box } from "@chakra-ui/react"
Userfront.init("xbrr9qdb");

const PasswordResetForm = Userfront.build({
  toolId: "modbal"
});

function Reset() {
    return (
        <Box mt='100px'>
            <PasswordResetForm/> 
        </Box>
    )
}

export default Reset