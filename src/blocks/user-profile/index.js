import "./style.css";
import "./editor.css";

import metadata from "./block.json";

import { registerBlockType } from "@wordpress/blocks";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";
import { useState } from "@wordpress/element";

const SOCIAL_MEDIA_PLATFORMS = [
  "instagram",
  "facebook",
  "twitter",
  "linkedin",
  "github",
  "discord",
  "steam",
  "pinterest",
];

registerBlockType(metadata, {
  icon: {
    src: "admin-users",
  },
  edit: ({ attributes, setAttributes }) => {
    const { imageUrl, socialLinks } = attributes;
    const [showIcons, setShowIcons] = useState(false);

    if (!socialLinks) {
      setAttributes({
        socialLinks: SOCIAL_MEDIA_PLATFORMS.map((platform) => ({
          [platform]: "",
        })),
      });
    }

    const updateSocialLink = (platform) => (value) =>
      setAttributes({
        socialLinks: {
          ...socialLinks,
          [platform]: value,
        },
      });

    const toggleIcons = () => setShowIcons(!showIcons);

    const blockProps = useBlockProps({
      className: "interactive-profile-block",
    });
    return (
      <>
        <InspectorControls>
          <PanelBody title="Profile Picture" initialOpen={true}>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => setAttributes({ imageUrl: media.url })}
                allowedTypes={["image"]}
                render={({ open }) => (
                  <Button onClick={open} variant="primary">
                    {imageUrl
                      ? "Change Profile Picture"
                      : "Upload Profile Picture"}
                  </Button>
                )}
              />
            </MediaUploadCheck>
          </PanelBody>
          <PanelBody title="Social Media Links" initialOpen={true}>
            {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
              <TextControl
                key={platform}
                label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                value={socialLinks ? socialLinks[platform] : ""}
                onChange={updateSocialLink(platform)}
              />
            ))}
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div className="profile-container">
            <div className="profile-picture">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" onClick={toggleIcons} />
              ) : (
                <p>Click to add a profile picture</p>
              )}
            </div>
            {showIcons && (
              <div className="social-icons">
                {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
                  <a
                    key={platform}
                    href={socialLinks ? socialLinks[platform] : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`icon ${platform}`}
                  >
                    <span className="screen-reader-text">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const { imageUrl, socialLinks } = attributes;

    const blockProps = useBlockProps.save({
      className: "interactive-profile-block",
    });

    return (
      <div {...blockProps}>
        <div className="profile-container">
          <div className="profile-picture">
            {imageUrl && <img src={imageUrl} alt="Profile" />}
          </div>
          <div className="social-icons">
            {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
              <a
                key={platform}
                href={socialLinks ? socialLinks[platform] : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`icon ${platform}`}
              >
                <span className="screen-reader-text">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
