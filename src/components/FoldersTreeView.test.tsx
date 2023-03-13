import React from "react";
import { shallow } from "enzyme";
import FoldersTreeView, { FoldersTreeViewProps } from './FoldersTreeView';

describe('FoldersTreeView', function () {
    const props: FoldersTreeViewProps = {
        browserData: {
            id: "1",
            name: "Bucket Root",
            isFolder: true,
            key: "",
            children: [
                {
                    id: "2",
                    name: "Folder 1",
                    isFolder: true,
                    key: "Folder 1",
                    children: [],
                }, 
                {
                    id: "3",
                    name: "File 1",
                    isFolder: false,
                    key: "File 1",
                    children: [],
                }
            ],
        },
        setCurrentView: jest.fn(),
        handleInsertNode: jest.fn(),
    };

    it('should render the component', () => {
        const wrapper = shallow(<FoldersTreeView {...props} />);
        expect(wrapper.find("div.folder")).toHaveLength(1);
        expect(wrapper.find(FoldersTreeView)).toHaveLength(2);
    });
});