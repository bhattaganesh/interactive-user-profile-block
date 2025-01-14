import "./style.css"; // Frontend styles
import "./editor.css"; // Editor styles

import { registerBlockType } from "@wordpress/blocks";
import {
  RichText,
  BlockControls,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import { ToolbarButton, PanelBody, TextControl } from "@wordpress/components";

import metadata from "./block.json";

registerBlockType(metadata, {
  icon: {
    src: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24px"
        height="24px"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9v4.29l-1.39 2.78C3.2 16.55 3.52 17 4 17h16c.48 0 .8-.45.39-.93L19 13.29V9c0-3.87-3.13-7-7-7zM12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
      </svg>
    ),
  },
  edit({ attributes, setAttributes }) {
    const { message, customClass } = attributes;

    const blockProps = useBlockProps({
      className: `closeable-message-editor ${customClass || ""}`.trim(),
    });

    return (
      <>
        {/* Toolbar */}
        <BlockControls>
          <ToolbarButton
            label="Clear Message"
            onClick={() => setAttributes({ message: "" })}
            icon="dismiss"
          />
        </BlockControls>

        {/* Sidebar Controls */}
        <InspectorControls>
          <PanelBody title="Settings">
            <TextControl
              label="Custom Class"
              value={customClass}
              onChange={(value) => setAttributes({ customClass: value })}
            />
          </PanelBody>
        </InspectorControls>

        {/* Block Content */}
        <div {...blockProps}>
          <span className="icon">📢</span>
          <RichText
            tagName="p"
            value={message}
            onChange={(value) => setAttributes({ message: value })}
            placeholder="Enter your message..."
          />
        </div>
      </>
    );
  },
  save({ attributes }) {
    const { message, customClass } = attributes;

    const blockProps = useBlockProps.save({
      className: `closeable-message ${customClass || ""}`.trim(),
    });

    return (
      <div {...blockProps}>
        <span className="icon">📢</span>
        <p>{message}</p>
        <button className="close-button" type="button">
          ×
        </button>
      </div>
    );
  },
});
