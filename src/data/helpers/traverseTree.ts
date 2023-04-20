import server from "../../server/server";
import { FolderData } from "../../App";
import { v4 as uuid } from 'uuid';

const traverseTree = (secretKeyId: string, accessKeyId: string, bucketName: string, region: string) => {

    const insertNode = (tree: FolderData, id: string, name: string, isFolder: boolean) => {
        if (tree.id === id) {
            let newKey = tree.name === "Bucket Root" ? name : tree.key + "/" + name;

            if (isFolder) {
                newKey += "/";
            }
            
            tree.children.unshift({
                id: uuid().slice(0, 8),
                name,
                isFolder,
                key: newKey,
                children: [],
            });

            server(secretKeyId, accessKeyId, bucketName, region).createObject(newKey);

            return tree;
        }
    
        let latestNode: FolderData[] = [];
        latestNode = tree.children.map(child => {
          return insertNode(child, id, name, isFolder);
        });
    
        return { ...tree, children: latestNode };
      };

    const deleteNode = (tree: FolderData, id: string, lastFolderId: string) => {
        let treeKey = tree.key || "";
        
        if (tree.id === lastFolderId) {
            if (tree.isFolder) {
                treeKey = treeKey + "/";
            }

            server(secretKeyId, accessKeyId, bucketName, region).deleteObject(treeKey);

            const newChildren = tree.children.filter(child => {
                return child.id !== id;
            });

            return { ...tree, children: newChildren };
        }
        
        let latestNode: FolderData[] = [];
        latestNode = tree.children.map(child => {
            return deleteNode(child, id, lastFolderId);
        });
    
        return { ...tree, children: latestNode };
    }

    const findFolder = (tree: FolderData, id: string) => {
        let result = null;
        if (id === tree.id) {
            return tree;
        } else {
            if (tree.children){
                tree.children.some(node => result = findFolder(node, id));
            }
            return result;
        }
    }

    return { insertNode, deleteNode, findFolder };
}

export default traverseTree;