import React from "react";
import FoldersTreeView from "./components/FoldersTreeView";
import CurrentDirectoryView from "./components/CurrentDirectoryView";
import traverseTree from "./data/helpers/traverseTree";
import server from "./server/server";
import readData from "./data/helpers/readData";
import tree from "./data/tree.json";
import "./App.css";


export interface FolderData {
  id: string,
  name: string,
  isFolder: boolean,
  key: string | undefined,
  children: FolderData[],
  lastModified?: Object,
}

interface AppProps {};

interface AppState {
  fileBrowserData: FolderData;
  currentView: FolderData | null;
  lastFolderId: string;
  hideAccessForm: boolean;
  secretKeyId: string;
  accessKeyId: string;
  bucketName: string; 
  region: string;
};

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    fileBrowserData: {
      id: "",
      name: "",
      isFolder: false,
      key: "",
      children: [],
    },
    currentView: {} as FolderData,
    lastFolderId: "rootId",
    hideAccessForm: false,
    secretKeyId: "",
    accessKeyId: "",
    bucketName: "", 
    region: "",
  }

  handleInsertNode = async (id: string, name: string, isFolder: boolean) => {
    const { secretKeyId, accessKeyId, bucketName, region, lastFolderId } = this.state;
    const { insertNode, findFolder } = traverseTree(secretKeyId, accessKeyId, bucketName, region);
    
    const newTree = await insertNode(this.state.fileBrowserData, id, name, isFolder);
    const currentView = findFolder(newTree, lastFolderId);

    this.setState({ fileBrowserData: newTree, currentView });
  }

  handleDelete = async (id: string) => {
    const { secretKeyId, accessKeyId, bucketName, region, lastFolderId } = this.state;
    const { deleteNode, findFolder } = traverseTree(secretKeyId, accessKeyId, bucketName, region);

    const newTree = await deleteNode(this.state.fileBrowserData, id, lastFolderId);
    const currentView = findFolder(newTree, lastFolderId);

    this.setState({ fileBrowserData: newTree, currentView });
  }

  setCurrentView = (id: string) => {
    const { secretKeyId, accessKeyId, bucketName, region } = this.state;
    const { findFolder } = traverseTree(secretKeyId, accessKeyId, bucketName, region);
    const currentView = findFolder(this.state.fileBrowserData, id);
    this.setState({ currentView, lastFolderId: id });
  }
  
  handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { secretKeyId, accessKeyId, bucketName } = document.forms[0];
    const REGION = "eu-central-1";
    this.setState({ secretKeyId: secretKeyId.value, accessKeyId: accessKeyId.value, bucketName: bucketName.value, region: REGION });

    let contents = await server(secretKeyId.value, accessKeyId.value, bucketName.value, REGION).listObjects();
    const { root } = readData(contents);

    const treeRoot: FolderData = tree;
    this.setState({ fileBrowserData: treeRoot, currentView: treeRoot, hideAccessForm: true });
  }

  render() {
    const { fileBrowserData, currentView, hideAccessForm } = this.state;

    return (
      <>
        {!hideAccessForm && <form className="form" onSubmit={(e) => this.handleFormSubmit(e)}>
          <div className="input-container">
            <label><b>S3 Secret Key </b></label>
            <input type="text" name="secretKeyId" required placeholder="Enter Secret Access Key" />
          </div>
          <div className="input-container">
            <label><b>Access Key ID </b></label>
            <input type="text" name="accessKeyId" required placeholder="Enter Access Key Id"/>
          </div>
          <div className="input-container">
            <label><b>Bucket Name </b></label>
            <input type="text" name="bucketName" required placeholder="Enter Bucket Name"/>
          </div>

          <div className="button-container">
            <input type="submit" />
          </div>
        </form>}

        {hideAccessForm &&
          <> 
            <div style={{alignItems: "center", borderStyle: "groove", float: "left", width: "600px", height: "700px"}}>
              <p><b>Folders Tree View</b></p>
              <hr className="solid"></hr>
              <FoldersTreeView
                browserData={fileBrowserData}
                handleInsertNode={this.handleInsertNode} 
                setCurrentView={this.setCurrentView} 
              />
            </div>

            <div style={{alignItems: "center", borderStyle: "groove", float: "left", width: "600px", height: "700px"}}>
              <p><b>Current Directory View</b></p>
              <hr className="solid"></hr>
              <CurrentDirectoryView
                currentView={currentView}
                setCurrentView={this.setCurrentView} 
                handleDelete={this.handleDelete}
              />
            </div>
          </>}
      </>
    );
  }
}

export default App;
