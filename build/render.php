<?php $logos = $attributes['images']; ?>
<?php $items_per_page = $attributes['items_per_page']; ?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="wrapper" style="<?= "display: grid; grid-template-columns: repeat($items_per_page , 1fr); grid-gap: 10px;" ?>" >
		<div class="center">
			<div class="tagline">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, pariatur.
			</div>
		</div>

		<?php foreach ($logos as $logo): ?>
			<div class="logo">
				<img src="<?php echo $logo['url']; ?>" alt="<?php echo $logo['alt']; ?>">
			</div>
		<?php endforeach; ?>

	</div>

</div>