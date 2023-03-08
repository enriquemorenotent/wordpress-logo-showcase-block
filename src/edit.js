/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	MediaPlaceholder,
	BlockIcon,
	InspectorControls,
} from "@wordpress/block-editor";
import { TextControl, RangeControl, PanelBody } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ({ attributes, setAttributes }) => {
	const { images, tagline, itemsPerPage } = attributes;
	const handleUpdateGallery = (images) => {
		setAttributes({ images });
	};

	console.log(InspectorControls);
	console.log(PanelBody);

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title="Settings">
					<RangeControl
						label="Items per page"
						value={itemsPerPage}
						onChange={(itemsPerPage) => setAttributes({ itemsPerPage })}
						min={1}
						max={10}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="block-title">Logo showcase</div>

			<TextControl
				label="Tagline"
				value={tagline}
				onChange={(tagline) => setAttributes({ tagline })}
			/>

			<MediaPlaceholder
				label="Logos"
				labels={{
					title: "Logos",
					instructions: "",
				}}
				icon={<BlockIcon icon="format-image" />}
				instructions="Select an image to remove this placeholder"
				accept="image/*"
				allowedTypes={["image"]}
				onSelect={handleUpdateGallery}
				multiple={true}
				value={images}
			>
				<div className="preview">
					{/* <div className="preview-title">Selected images</div> */}
					<div className="grid">
						{images.map((image) => (
							<div key={image.id}>
								<img src={image.url} alt={image.alt} />
							</div>
						))}
					</div>
				</div>
			</MediaPlaceholder>
		</div>
	);
};

export default Edit;
