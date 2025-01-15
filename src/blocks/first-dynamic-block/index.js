import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";

registerBlockType("interactive-user-profile-block/first-dynamic-block", {
  title: "First Dynamic Block",
  description:
    "This is a dynamic block renders a block with the current date and time.",
  category: "widgets",
  icon: "megaphone",
  edit: Edit,
  save: () => null,
});
