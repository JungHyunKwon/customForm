/**
 * @name customForm
 * @author JungHyunKwon
 * @version 1.0.0
 */
try {
	'use strict';

	(function($) {
		//제이쿼리가 함수일때
		if(typeof $ === 'function') {
			$(function() {
				var $custom = $('[data-custom]'),
					$customElement = $custom.find('select, input[type="checkbox"], input[type="radio"], input[type="file"]'),
					$radio = $customElement.filter('input[type="radio"]'),
					$reset = $('[type="reset"]').filter('input, button');
				
				$customElement.on('change.customForm', function(event) {
					var $this = $(this),
						$custom = $this.parents('[data-custom]'),
						$customText = $custom.find('[data-custom-text]'),
						customText = $customText.attr('data-custom-text') || '',
						tagName = this.tagName.toLowerCase(),
						type = this.type.toLowerCase(),
						separator = ', ',
						text = '';
					
					//셀렉트일때
					if(tagName === 'select') {
						var $selectedOption = $this.find('option:selected');

						$selectedOption.each(function(index, element) {
							text += $(element).text() + separator;
						});

						text = text.substring(0, text.length - separator.length);

						//값이 없을때
						if(!text) {
							text = customText;
						}

						$customText.text(text);
					
					//인풋일때
					}else if(tagName === 'input') {
						//체크박스일때
						if(type === 'checkbox') {
							//체크되어 있을때
							if($this.is(':checked')) {
								$custom.addClass('active');
							}else{
								$custom.removeClass('active');
							}			
						
						//라디오일때
						}else if(type === 'radio') {
							var $parentsForm = $this.parents('form');

							$radio.filter('[name="' + (this.name || '') + '"]').each(function(index, element) {
								var $element = $(element),
									$custom = $element.parents('[data-custom]'),
									$form = $element.parents('form');
								
								//체크되어 있을때
								if($element.is(':checked')) {
									$custom.addClass('active');
								
								//선택된 라디오의 부모가 없으면서 부모에 폼이 없으거나 선택된 라디오의 부모가 선택된 라디오의 부모의 폼과 같을때
								}else if((!$parentsForm.length && !$form.length) || $parentsForm.is($form)) {
									$custom.removeClass('active');
								}
							});
						
						//파일일때
						}else if(type === 'file') {
							var files = this.files || this.value;
							
							//파일이 없을때
							if(!files) {
								files = [];
							}

							//문자일때
							if(typeof files === 'string') {
								files = [files];
							}

							$.each(files, function(index, file) {
								text += (file.name || file) + separator;
							});

							text = text.substring(0, text.length - separator.length);

							//값이 없을때
							if(!text) {
								text = customText;
							}

							$customText.text(text);
							
							//파일이 선택되어 있을때
							if(files.length) {
								$custom.addClass('active');	
							}else{
								$custom.removeClass('active');
							}
						}
					}
				}).on('focusin.customForm', function(event) {
					var $this = $(this),
						tagName = this.tagName.toLowerCase();
					
					//셀렉트일때
					if(tagName === 'select') {
						$this.parents('[data-custom]').addClass('active');
					}
				}).on('focusout.customForm', function(event) {
					var $this = $(this),
						tagName = this.tagName.toLowerCase();
					
					//셀렉트일때
					if(tagName === 'select') {
						$this.parents('[data-custom]').removeClass('active');
					}
				}).each(function(index, element) {
					var $element = $(element);
					
					//비활성화일때
					if($element.attr('disabled')) {
						$element.parents('[data-custom]').addClass('disabled');
					}

					$element.triggerHandler('change.customForm');
				});

				//초기화
				$reset.on('click.customForm', function(event) {
					var $this = $(this),
						$form = $this.parents('form');
					
					$form[0].reset();

					$form.find('[data-custom]').find('select, input[type="checkbox"], input[type="radio"], input[type="file"]').each(function(index, element) {
						$(element).triggerHandler('change.customForm');
					});

					event.preventDefault();
				});
			});
		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(window.jQuery);
}catch(error) {
	console.error(error);
}