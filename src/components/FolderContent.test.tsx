import React from "react";
import { shallow } from "enzyme";
import FolderContent, { FolderContentProps } from './FolderContent';

describe('App', function () {
    const props: FolderContentProps = {
        child: {
            id: "1",
            name: "Bucket Root",
            isFolder: true,
            key: "",
            children: [],
        },
        handleDelete: jest.fn(),
        handleDoubleClick: jest.fn(),
    };

    it('should render the component', () => {
        const wrapper = shallow(<FolderContent {...props} />);
        expect(wrapper.find("div").find("span").text()).toEqual(" 📁 " + props.child.name);
    });
});