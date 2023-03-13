import { v4 as uuid } from 'uuid';

const readData = (data) => {
    const root = {
        id: "123",
        name: "Bucket Root",
        key: "",
        isFolder: true,
        children: []
    };

    data.forEach(item => {
        const parts = item['Key'].split('/');
        const leafName = parts.pop();
        
        let currentNode = root;

        parts.forEach(part => {
            let newCurrentNode = currentNode.children.find(child => child.name === part);
            if (newCurrentNode === undefined) {
                const key = (root === currentNode) ? part : `${currentNode.key}/${part}`;
                newCurrentNode = {
                    id: uuid().slice(0, 8),
                    name: part,
                    key: key,
                    isFolder: true,
                    children: [],
                };
                currentNode.children.push(newCurrentNode);
            }

            currentNode = newCurrentNode;
        });

        if(leafName) {
            currentNode.children.push({
                id: uuid().slice(0, 8),
                name: leafName,
                key: item['Key'],
                isFolder: false,
                children: [],
            });
        }
    });

    return { root };
}

export default readData;