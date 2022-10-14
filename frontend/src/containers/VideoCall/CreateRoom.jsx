import { v1 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
    const navigate = useNavigate()
    const create = () => {
        const id = uuid();
        navigate(`/room/${id}`);
    }

    return (
        <button onClick={create}>Create room</button>
    );
};

export default CreateRoom;