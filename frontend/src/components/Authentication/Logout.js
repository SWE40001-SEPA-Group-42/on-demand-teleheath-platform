import Userfront from "@userfront/react";

Userfront.init("xbrr9qdb");

const LogoutButton = Userfront.build({
  toolId: "nmldoa"
});

function Logout() {
    return (
        <>
            <LogoutButton />
        </>
    )
}

export default Logout