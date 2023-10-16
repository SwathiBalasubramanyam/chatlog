import { useState } from "react";
import { useDispatch } from "react-redux";
import * as workspaceActions from "../../../store/workspaces";

const WorkspaceForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(workspaceActions.createWorkspace({name: name}));
    }

    return (
        <form onSubmit={handleCreate}>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="whats the name of your workspace ??"></input>
            <button>Create A workspace</button>
        </form>
    )
}

export default WorkspaceForm;