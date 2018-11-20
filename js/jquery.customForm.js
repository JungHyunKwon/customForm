/**
 * @name customForm
 * @author JungHyunKwon
 * @since 2017-12-06
 * @version 1.0.0
 */
try {
	(function($) {
		'use strict';

		//제이쿼리가 함수일 때
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
					
					//셀렉트일 때
					if(tagName === 'select') {
						var $selectedOption = $this.find('option:selected');
						
						for(var i = 0, selectedOptionLength = $selectedOption.length; i < selectedOptionLength; i++) {
							text += $selectedOption.eq(i).text() + separator;
						}

						text = text.substring(0, text.length - separator.length);

						//값이 없을 때
						if(!text) {
							text = customText;
						}

						$customText.text(text);
					
					//인풋일 때
					}else if(tagName === 'input') {
						//체크박스일 때
						if(type === 'checkbox') {
							//체크되어 있을 때
							if($this.is(':checked')) {
								$custom.addClass('active');
							}else{
								$custom.removeClass('active');
							}			
						
						//라디오일 때
						}else if(type === 'radio') {
							for(var i = 0, radioLength = $radio.length; i < radioLength; i++) {
								var $custom = $radio.eq(i).parents('[data-custom]');

								//체크되어 있을 때
								if($radio[i].checked) {
									$custom.addClass('active');
								}else{
									$custom.removeClass('active');
								}
							}
						
						//파일일 때
						}else if(type === 'file') {
							var files = this.files || this.value;

							//파일이 없을 때
							if(!files) {
								files = [];
							}

							//문자일 때
							if(typeof files === 'string') {
								files = [files];
							}
							
							for(var i = 0, filesLength = files.length; i < filesLength; i++) {
								var file = files[i];

								text += (file.name || file) + separator;
							}

							text = text.substring(0, text.length - separator.length);

							//값이 없을 때
							if(!text) {
								text = customText;
							}

							$customText.text(text);
							
							//파일이 선택되어 있을 때
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
					
					//셀렉트일 때
					if(tagName === 'select') {
						$this.parents('[data-custom]').addClass('active');
					}
				}).on('focusout.customForm', function(event) {
					var $this = $(this),
						tagName = this.tagName.toLowerCase();
					
					//셀렉트일 때
					if(tagName === 'select') {
						$this.parents('[data-custom]').removeClass('active');
					}
				}).trigger('change.customForm');
				
				for(var i = 0, customElementLength = $customElement.length; i < customElementLength; i++) {
					//비활성화일 때
					if($customElement[i].disabled) {
						$customElement.eq(i).parents('[data-custom]').addClass('disabled');
					}
				}

				//초기화
				$reset.on('click.customForm', function(event) {
					var $this = $(this),
						$form = $this.parents('form');
					
					$form[0].reset();

					$form.find('[data-custom]').find('select, input[type="checkbox"], input[type="radio"], input[type="file"]').trigger('change.customForm');

					event.preventDefault();
				});
			});
		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(jQuery);
}catch(e) {
	console.error(e);
}