import "./style.css"; // Frontend styles
import "./editor.css"; // Editor styles

import metadata from "./block.json";

import { registerBlockType } from "@wordpress/blocks";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  Button,
  TextareaControl,
} from "@wordpress/components";

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
  edit: ({ attributes, setAttributes }) => {
    const { title, description, imageUrl, variantPrices } = attributes;

    return (
      <>
        <InspectorControls>
          <PanelBody title="Product Details" initialOpen={true}>
            <TextControl
              label="Title"
              value={title}
              onChange={(value) => setAttributes({ title: value })}
            />
            <TextareaControl
              label="Description"
              value={description}
              onChange={(value) => setAttributes({ description: value })}
            />
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => setAttributes({ imageUrl: media.url })}
                allowedTypes={["image"]}
                render={({ open }) => (
                  <Button onClick={open} variant="primary">
                    {imageUrl ? "Change Image" : "Upload Image"}
                  </Button>
                )}
              />
            </MediaUploadCheck>
            <TextControl
              label="Small Variant Price"
              value={variantPrices.small}
              type="number"
              onChange={(value) =>
                setAttributes({
                  variantPrices: { ...variantPrices, small: Number(value) },
                })
              }
            />
            <TextControl
              label="Medium Variant Price"
              value={variantPrices.medium}
              type="number"
              onChange={(value) =>
                setAttributes({
                  variantPrices: { ...variantPrices, medium: Number(value) },
                })
              }
            />
            <TextControl
              label="Large Variant Price"
              value={variantPrices.large}
              type="number"
              onChange={(value) =>
                setAttributes({
                  variantPrices: { ...variantPrices, large: Number(value) },
                })
              }
            />
          </PanelBody>
        </InspectorControls>

        <div {...useBlockProps()}>
          {imageUrl && <img src={imageUrl} alt={title} height={200} />}
          <h2>{title}</h2>
          <p>{description}</p>
          <ul>
            <li>Small: ${variantPrices.small}</li>
            <li>Medium: ${variantPrices.medium}</li>
            <li>Large: ${variantPrices.large}</li>
          </ul>
        </div>
      </>
    );
  },
  save: ({ attributes }) => {
    const { title, description, imageUrl, variantPrices } = attributes;

    const blockProps = useBlockProps.save({
      className: "price-card-block",
    });
    return (
      <div {...blockProps}>
        {imageUrl && <img src={imageUrl} alt={title} />}
        <h2>{title}</h2>
        <p>{description}</p>
        <ul>
          <li>Small: ${variantPrices.small}</li>
          <li>Medium: ${variantPrices.medium}</li>
          <li>Large: ${variantPrices.large}</li>
        </ul>
      </div>
    );
  },
});
