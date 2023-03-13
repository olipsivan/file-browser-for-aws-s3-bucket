import React from "react";
import FolderContent from "./FolderContent";
import { FolderData } from "../App";
import "../App.css";

export interface CurrentDirectoryViewProps {
    currentView: FolderData;
    setCurrentView: (id: string) => void;
    handleDelete: (id: string) => void;
}

interface CurrentDirectoryViewState {}

class CurrentDirectoryView extends React.Component<CurrentDirectoryViewProps, CurrentDirectoryViewState> {

    handleDoubleClick = (id: string) => {
        this.props.setCurrentView(id);
        console.log("DOUBLE CLICK");
    }

    render() {
        const { currentView, handleDelete } = this.props;
        
        return (
            <>
                {currentView.children.map( child => {
                    return <FolderContent
                        child={child}
                        key={child.id}
                        handleDoubleClick={this.handleDoubleClick}
                        handleDelete={handleDelete}
                    />;
                })}
            </>
        );

    }
}

export default CurrentDirectoryView;