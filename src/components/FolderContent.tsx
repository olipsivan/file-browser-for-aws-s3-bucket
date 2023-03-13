import { FolderData } from "../App";
import "../App.css";

export interface FolderContentProps {
    child: FolderData;
    handleDoubleClick: (id: string) => void; 
    handleDelete: (id: string) => void;
}

const FolderContent = ({ child, handleDoubleClick, handleDelete }: FolderContentProps) => {
    if(child?.isFolder) {
        return (
            <div onDoubleClick={() => handleDoubleClick(child.id)} className="folder">
                <span> 📁 {child.name}</span>
                <button className="deleteButton" onClick={() => handleDelete(child.id)}>Delete</button>
            </div>
        );
    } else {
        return (
            <div className="file">
                <span>📄 {child?.name}</span>
                <button className="deleteButton" onClick={() => handleDelete(child.id)}>Delete</button>
            </div>
        );
    }
}

export default FolderContent;