import React from "react";
import { shallow } from "enzyme";
import CurrentDirectoryView, { CurrentDirectoryViewProps } from "../components/CurrentDirectoryView";
import FolderContent from "./FolderContent";

describe('Current Directory View', function () {
  it('should render the component', () => {
    const props: CurrentDirectoryViewProps = {
        currentView: {
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
        handleDelete: jest.fn(),
        setCurrentView: jest.fn(),
    };
    const wrapper = shallow(<CurrentDirectoryView {...props} />);
    expect(wrapper.find(FolderContent)).toHaveLength(2);
  });
});