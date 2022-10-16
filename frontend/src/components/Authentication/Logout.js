import Userfront from "@userfront/react";
import { Box } from "@chakra-ui/react"

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);
const LogoutButton = Userfront.build({
  toolId: process.env.REACT_APP_USERFRONT_LOGOUT
});


function Logout() {
    return (
        <Box mx='auto'>
            <LogoutButton /> 
        </Box>
    )
}

export default Logout