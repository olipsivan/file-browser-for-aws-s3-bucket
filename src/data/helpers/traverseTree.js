import server from "../../server/server";

const traverseTree = (secretKeyId, accessKeyId, bucketName, region) => {
    
    const insertNode = (tree, id, name, isFolder) => {
        let result = null;
        
        if (tree.id === id && tree.isFolder) {
            let newKey = tree.id === "123" ? name : tree.key + "/" + name;

            if (isFolder) {
                newKey += "/";
                console.log(newKey);
                return server(secretKeyId, accessKeyId, bucketName, region).createObject(newKey);
                
            } else {
                console.log(newKey);
                return server(secretKeyId, accessKeyId, bucketName, region).createObject(newKey);
            }

        } else {
            if(tree.children){
                tree.children.some(node => result = insertNode(node, id, name, isFolder));
            }
            return result;
        }
    }

    const deleteNode = (tree, id) => {
        let result = null;
        
        if (tree.id === id) {
            if(tree.isFolder){
                console.log(tree.key + "/");
                return server(secretKeyId, accessKeyId, bucketName, region).deleteObject(tree.key + "/");
            } else {
                console.log(tree.key);
                return server(secretKeyId, accessKeyId, bucketName, region).deleteObject(tree.key);
            }
        } else {
            if(tree.children){
                tree.children.some(node => result = deleteNode(node, id));
            }
            return result;
        }
    }

    const findFolder = (tree, id) => {
        let result = null;
        if (id === tree.id) {
            return tree;
        } else {
            if(tree.children){
                tree.children.some(node => result = findFolder(node, id));
            }
            return result;
        }
    }

    return { insertNode, deleteNode, findFolder };
}

export default traverseTree;