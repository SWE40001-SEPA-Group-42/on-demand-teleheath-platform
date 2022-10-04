import Userfront from "@userfront/react";
import { Box } from "@chakra-ui/react"
Userfront.init("xbrr9qdb");

const LogoutButton = Userfront.build({
  toolId: "nmldoa"
});

function Logout() {
    return (
        <Box mx='auto'>
            <LogoutButton />
        </Box>
    )
}

export default Logout