import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";
const Edit = (props) => {
  const blockProps = useBlockProps();
  return (
    <div {...blockProps}>
      <ServerSideRender
        block="interactive-user-profile-block/first-dynamic-block"
        attributes={props.attributes}
      />
    </div>
  );
};

export default Edit;
