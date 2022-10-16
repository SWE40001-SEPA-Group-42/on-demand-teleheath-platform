import Userfront from "@userfront/react";
import { Box } from "@chakra-ui/react"


Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

const PasswordResetForm = Userfront.build({
  toolId: process.env.REACT_APP_RESET
});

function Reset() {
    return (
        <Box mt='100px'>
            <PasswordResetForm/> 
        </Box>
    )
}

export default Reset