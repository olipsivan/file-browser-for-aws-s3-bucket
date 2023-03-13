import React from "react";
import { FolderData } from "../App";
import "../App.css";

export interface FoldersTreeViewProps {
    browserData: FolderData;
    setCurrentView: (id: string) => void;
    handleInsertNode: (folderId: string, item: string, isFolder: boolean) => void;
}

interface FoldersTreeViewState {
    expand: boolean;
    visible: boolean; 
    isFolder: boolean; 
}

class FoldersTreeView extends React.Component<FoldersTreeViewProps, FoldersTreeViewState> {

    state: FoldersTreeViewState = {
        expand: false,
        visible: false,
        isFolder: false
    }

    handleArrows = () => {
        const arrowCollapsed = "▷";
        const arrowExpanded = "▼";
        const { browserData } = this.props;

        return browserData.children?.length && browserData.children.some(child => child.isFolder) ? 
            this.state.expand ? arrowExpanded : arrowCollapsed
        : null;
    }

    handleDoubleClick = () => {
        const { browserData, setCurrentView } = this.props;
        setCurrentView(browserData.id);
        console.log("DOUBLE CLICK");
    }

    handleNewFolderOrFile = (e: React.MouseEvent, isFolder: boolean) => {
        e.stopPropagation();

        this.setState({
            expand: true,
            visible: true,
            isFolder
        });
    }

    onAddFolderOrFile = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { browserData, handleInsertNode } = this.props;
        const { isFolder } = this.state;
        if(e.key === "Enter" && e.currentTarget.value) {
            handleInsertNode(browserData.id, e.currentTarget.value, isFolder);
            this.setState({ visible: false });
        }
    }

    render() {
        const { browserData, setCurrentView, handleInsertNode } = this.props;
        const { expand, visible, isFolder } = this.state;

        if(browserData.isFolder) {
            return (
                <>
                    <div className="folder">
                        <div onClick={() => this.setState({ expand: !expand })}>
                            {this.handleArrows()}
                        </div>
                        <span onDoubleClick={() => this.handleDoubleClick()}>📁 {browserData.name}</span>

                        <div>
                            <button onClick={(e) => this.handleNewFolderOrFile(e, true)}>Add Folder</button>
                            <button onClick={(e) => this.handleNewFolderOrFile(e, false)}>Add File</button>
                        </div>
                    </div>

                    {visible && (
                        <div className="inputContainer">
                            <span>{isFolder ? "📁" : "📄"}</span>
                            <input
                                type="text" 
                                onKeyDown={(e) => this.onAddFolderOrFile(e)}
                                onBlur={() => this.setState({ visible: false })} 
                                className="inputContainer__input"
                                autoFocus
                            />
                        </div>
                    )}

                    <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
                        {browserData.children?.map( child => {
                            return <FoldersTreeView browserData={child} key={child.id} setCurrentView={setCurrentView} handleInsertNode={handleInsertNode} />;
                        })}
                    </div>
                </>
            );
        }
    }
}

export default FoldersTreeView;